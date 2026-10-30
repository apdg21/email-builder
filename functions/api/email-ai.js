// Cloudflare Pages Function  →  POST /api/email-ai
//
// Keeps the AI API key on the server. The browser sends the user's copy (or a
// refine instruction) plus a catalog of the builder's sections; this function asks
// the model to assemble the email as JSON and returns it. The browser validates
// everything again before touching the canvas.
//
// Provider (env EMAIL_AI_PROVIDER): "gemini" (default, free tier OK)  |  "anthropic"
//
// All settings are prefixed EMAIL_AI_ so they never clash with other pages on the same project.
//
// Gemini    secret : EMAIL_AI_GEMINI_KEY      (falls back to GEMINI_API_KEY if not set)
//           optional: EMAIL_AI_MODELS          comma-separated, in priority order. Default:
//                       gemini-3.8-flash, gemini-3.7-flash, gemini-3.6-flash, gemini-3.5-flash, gemini-3.5-flash-lite
//                     EMAIL_AI_THINKING_LEVEL  (default low: minimal | low | medium | high)
// Anthropic secret : EMAIL_AI_ANTHROPIC_KEY   (falls back to ANTHROPIC_API_KEY if not set)
//           optional: EMAIL_AI_ANTHROPIC_MODEL (default claude-sonnet-5-5)
// Both      optional: EMAIL_AI_ALLOWED_ORIGINS (comma-separated extra origins; same host is always allowed)
//                     EMAIL_AI_RATE_LIMIT      (requests per IP per hour, default 20, needs the KV binding below)
//           binding : EMAIL_AI_KV              (a KV namespace; enables the per-IP rate limit and
//                                               shares model cooldowns between server instances)
//
// Model cycling (Gemini): models are tried in order. A model that is rate limited, down or
// unavailable is put on a cooldown and skipped for a while, then retried automatically.

const GEMINI_MODELS_DEFAULT = [
  'gemini-3.8-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.5-flash-lite'
];
const ANTHROPIC_MODEL_DEFAULT = 'claude-sonnet-5-5';

// Cooldowns (seconds) before a failing model is tried again
const COOLDOWN_RATE_LIMIT = 60;       // per-minute limit
const COOLDOWN_DAILY_LIMIT = 1800;    // per-day quota used up: re-check every 30 min
const COOLDOWN_SERVER_ERROR = 30;
const COOLDOWN_UNAVAILABLE = 3600;    // 404: model id not available to this key
const COOLDOWN_BAD_REQUEST = 600;     // model rejects our request

const geminiKey = (env) => env.EMAIL_AI_GEMINI_KEY || env.GEMINI_API_KEY;
const anthropicKey = (env) => env.EMAIL_AI_ANTHROPIC_KEY || env.ANTHROPIC_API_KEY;

const MAX_BODY_CHARS = 250000;
const MAX_COPY_CHARS = 20000;
const MAX_INSTRUCTION_CHARS = 3000;
const MAX_CATALOG_CHARS = 90000;
const MAX_CURRENT_CHARS = 90000;

const SYSTEM_BASE = `You are the layout engine of an email builder. You assemble marketing emails from a fixed catalog of pre-built sections and fill in their fields. You never write HTML or CSS.

How the catalog works
- The catalog (below) lists every section you may use: its "type", a human "label", its "group", and its editable "fields" shown with example default values. Strings in the catalog may be cut off with "…".
- Use only types that appear in the catalog. In "content", set only fields that exist for that type, with the same kind of value as the default (string, boolean, number, or an array of the same shape). Anything you leave out keeps its default.
- Sections named "Design 1/2/3" are alternative looks for the same job. Pick the one that suits the email and keep the look consistent across the email.

Using the customer's copy
- Use the customer's wording. You may trim it, split it into headline / body / button label, or fix obvious typos, but never invent offers, prices, discount codes, dates, statistics, testimonials or product claims. Keep the copy's language; do not translate.
- If the copy does not supply something a section needs, leave that field at its default or choose a simpler section. Do not pad the email with sections the copy cannot fill.
- All text fields are plain text: no HTML tags, no markdown.
- Image fields: use an image URL only if the copy gives one for that spot. Never invent URLs. Otherwise leave the placeholder in place and add a note. For hero sections, set BOTH "backgroundType" to "image" and "backgroundImage" to the URL so the image renders as a CSS background behind the overlay text (do not leave backgroundType at "color" or the image will not appear).
- Link fields: use URLs from the copy; otherwise leave "#" and add a note. Keep merge tags such as {{ ... }} and {% ... %} exactly as written.
- Colors and styling: you may adjust colors, fonts, font sizes, background colors, padding, margins, and other styling fields if the user asks or the copy demands it, and apply them consistently across sections. Otherwise leave styling fields at their defaults. Use masterSettings for overall background/text colors and body font family.

Typical order (adapt to the copy): announcement bar, header, hero or opening, content sections, call to action, closing, P.S., footer. Always end with a footer section. Use at most one hero.

"notes" is a short list of things the user still has to do or check (for example "Replace the hero image", "Add the real shop link to the CTA button"). Maximum 8 notes, each under 100 characters.`;

const SYSTEM_REFINE = `

Refine mode
- You receive the current email as sections with refs (s1, s2, ...). Return the complete section list in its final order.
- Keep an existing section by returning {"ref": "s3"}. Add "content" containing ONLY the fields that must change. Omit a section to delete it. Add a new section with {"type": ..., "content": ...}. Sections marked "locked": true can be kept, moved or deleted, but not edited.
- Change only what the instruction asks for. Do not rewrite copy, restyle, or reorder anything else. To adjust styles you must be asked to (e.g. \"change the color\", \"increase padding\", \"make text bigger\").
- Spacing fields (padding, paddingTop, margin..., etc.) are shown for existing sections. Leave them unchanged unless the instruction is about spacing, gaps or padding.
- Use "notes" to report anything you could not do or that needs the user's attention.`;

const TYPOGRAPHY = `

Typography
- Fonts are a big part of how modern an email looks. The FONTS list (after the catalog) gives every font you may use, each with a "value" and a "note". Choose ONE pairing: a heading font for headlines, subheadlines and titles, and a body font for paragraphs. Use at most two font families; one family is fine if the look calls for it.
- Every section accepts a "fontFamily" field. Set it on EVERY section, copying a "value" from FONTS exactly: the heading font on sections that are mainly headlines (hero, opening, titles, call to action, closing, callouts, spotlight), the body font on the rest. Keep the pairing consistent across the whole email.
- Match the tone of the copy. A geometric sans (Poppins, Montserrat, DM Sans, Inter) suits tech, retail, SaaS and promotions. A serif heading (Playfair Display, Lora) with a clean sans body (Inter, Open Sans) suits editorial, luxury, food, wellness and storytelling. Avoid the plain web-safe fonts (Arial, Times New Roman, Verdana, Courier New) unless the user asks for them.
- If the user names a font or a style, follow that. Also set masterSettings.bodyFontFamily to the body font.`;

const OUTPUT_JSON = `

Output
Reply with ONE JSON object and nothing else: no markdown, no code fences, no commentary. Shape:
{"name": string, "masterSettings": object, "sections": array, "notes": array of strings}
- "name": short template name, max 60 characters.
- "masterSettings": optional; only when brand colors or a body font are set. Keys: backgroundColor, bodyBackgroundColor, bodyTextColor (each "#rrggbb") and bodyFontFamily (a value from FONTS). Omit otherwise.
- "sections": the final ordered list. Each item is {"type": "<catalog type>", "content": {"<field>": <value>}} for a new section, or in refine mode {"ref": "s2", "content": {"<changed field>": <value>}} to keep an existing one.
Example: {"name":"Spring Sale","sections":[{"type":"hero-design-1","content":{"title":"Spring Sale","subheadline":"Up to 30% off"}},{"type":"footer-design-1","content":{}}],"notes":["Replace the hero image"]}`;

const OUTPUT_TOOL = `

Output
Respond only by calling the build_email tool.`;

const ANTHROPIC_TOOL = {
  name: 'build_email',
  description: 'Return the finished email as an ordered list of sections from the catalog.',
  input_schema: {
    type: 'object',
    properties: {
      name: { type: 'string', description: 'Short template name, max 60 characters.' },
      masterSettings: {
        type: 'object',
        description: 'Optional overall email colors. Colors as #rrggbb.',
        properties: {
          backgroundColor: { type: 'string' },
          bodyBackgroundColor: { type: 'string' },
          bodyTextColor: { type: 'string' }
        }
      },
      sections: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            ref: { type: 'string', description: 'Refine mode only: ref of an existing section to keep.' },
            type: { type: 'string', description: 'Catalog section type, for new sections.' },
            content: { type: 'object', description: 'Field values to set.' }
          }
        }
      },
      notes: { type: 'array', items: { type: 'string' } }
    },
    required: ['sections']
  }
};

class ApiError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

function originAllowed(request, env) {
  const origin = request.headers.get('Origin');
  if (!origin) return false;
  let host;
  try { host = new URL(origin).host; } catch (e) { return false; }
  if (host === new URL(request.url).host) return true;
  return (env.EMAIL_AI_ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean).includes(origin);
}

async function rateLimited(request, env) {
  if (!env.EMAIL_AI_KV) return false;
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const key = 'rl:' + ip + ':' + Math.floor(Date.now() / 3600000);
  const max = parseInt(env.EMAIL_AI_RATE_LIMIT || '20', 10);
  const used = parseInt((await env.EMAIL_AI_KV.get(key)) || '0', 10);
  if (used >= max) return true;
  await env.EMAIL_AI_KV.put(key, String(used + 1), { expirationTtl: 7200 });
  return false;
}

function parseModelJson(text) {
  const cleaned = String(text || '').trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  let obj;
  try { obj = JSON.parse(cleaned); } catch (e) { obj = null; }
  if (!obj || typeof obj !== 'object' || !Array.isArray(obj.sections)) {
    throw new ApiError(502, 'The AI did not return a usable email. Please try again.');
  }
  return obj;
}

// ---------------- model cooldowns ----------------
// Kept in memory per server instance, and in KV (if bound) so all instances share them.
const memCooldown = new Map();   // model -> epoch ms when it may be tried again

async function isCooling(env, model) {
  const now = Date.now();
  const mem = memCooldown.get(model);
  if (mem && mem > now) return true;
  if (env.EMAIL_AI_KV) {
    try {
      const until = parseInt((await env.EMAIL_AI_KV.get('cd:' + model)) || '0', 10);
      if (until > now) { memCooldown.set(model, until); return true; }
    } catch (e) { /* KV hiccup: treat as not cooling */ }
  }
  return false;
}

async function markCooling(env, model, seconds) {
  const until = Date.now() + seconds * 1000;
  memCooldown.set(model, until);
  if (env.EMAIL_AI_KV) {
    try {
      // KV needs a TTL of at least 60s; the stored timestamp keeps shorter cooldowns exact
      await env.EMAIL_AI_KV.put('cd:' + model, String(until), { expirationTtl: Math.max(60, Math.ceil(seconds)) });
    } catch (e) { /* ignore */ }
  }
}

function geminiChain(env) {
  const list = (env.EMAIL_AI_MODELS || '').split(',').map(s => s.trim()).filter(Boolean);
  return list.length ? list : GEMINI_MODELS_DEFAULT;
}

// ---------------- Gemini (Interactions API) ----------------
async function callGemini(prompt, env) {
  const chain = geminiChain(env);
  let candidates = [];
  for (const m of chain) { if (!(await isCooling(env, m))) candidates.push(m); }
  if (!candidates.length) candidates = chain;      // everything cooling: try them all anyway

  const post = (model, withThinking) => {
    const generationConfig = { max_output_tokens: 10000 };
    if (withThinking) generationConfig.thinking_level = env.EMAIL_AI_THINKING_LEVEL || 'low';
    return fetch('https://generativelanguage.googleapis.com/v1beta/interactions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': geminiKey(env) },
      body: JSON.stringify({
        model: model,
        input: prompt.user,
        system_instruction: prompt.system + OUTPUT_JSON,
        response_format: { type: 'text', mime_type: 'application/json' },
        generation_config: generationConfig,
        store: false
      })
    });
  };

  let sawBusy = false;
  for (const model of candidates) {
    let res;
    try {
      res = await post(model, true);
      if (res.status === 400) {
        console.error('Gemini 400 (retrying without thinking_level)', model, await res.text());
        res = await post(model, false);               // some models may not accept thinking_level
      }
    } catch (e) {
      console.error('Gemini network error', model, String(e));
      await markCooling(env, model, COOLDOWN_SERVER_ERROR);
      sawBusy = true;
      continue;
    }

    if (res.status === 401 || res.status === 403) {
      console.error('Gemini auth error', model, res.status, await res.text());
      throw new ApiError(500, 'AI is not configured correctly on the server.');   // the key is wrong: other models will fail too
    }
    if (res.status === 429) {
      const body = await res.text();
      const daily = /perday|per day|daily/i.test(body);
      console.error('Gemini rate limited', model, daily ? '(daily)' : '(per-minute)', body.slice(0, 300));
      await markCooling(env, model, daily ? COOLDOWN_DAILY_LIMIT : COOLDOWN_RATE_LIMIT);
      sawBusy = true;
      continue;
    }
    if (res.status >= 500) {
      console.error('Gemini server error', model, res.status, (await res.text()).slice(0, 300));
      await markCooling(env, model, COOLDOWN_SERVER_ERROR);
      sawBusy = true;
      continue;
    }
    if (res.status === 404) {
      console.error('Gemini model not available', model, (await res.text()).slice(0, 300));
      await markCooling(env, model, COOLDOWN_UNAVAILABLE);
      continue;
    }
    if (!res.ok) {
      console.error('Gemini request rejected', model, res.status, (await res.text()).slice(0, 300));
      await markCooling(env, model, COOLDOWN_BAD_REQUEST);
      continue;
    }

    const data = await res.json();
    if (data.status === 'incomplete') throw new ApiError(502, 'The email was too long to build in one go. Try shorter copy.');
    if (data.status === 'failed') {
      console.error('Gemini interaction failed', model, JSON.stringify(data.errors || []));
      await markCooling(env, model, COOLDOWN_SERVER_ERROR);
      continue;
    }

    let text = '';
    (data.steps || []).forEach(step => {
      if (step.type === 'model_output' && Array.isArray(step.content)) {
        step.content.forEach(c => { if (c.type === 'text' && typeof c.text === 'string') text += c.text; });
      }
    });

    try {
      const result = parseModelJson(text);
      console.log('Email built with', model);
      return { result: result, model: model };
    } catch (e) {
      if (e instanceof ApiError) {
        console.error('Unusable output, trying next model', model, text.slice(0, 200));
        continue;                                      // bad JSON from this model: try the next one (no cooldown)
      }
      throw e;
    }
  }

  throw new ApiError(sawBusy ? 503 : 502, sawBusy
    ? 'The free AI quota is busy right now. Please wait a minute and try again.'
    : 'The AI could not build this email. Please try again.');
}

// ---------------- Anthropic (Claude) ----------------
async function callAnthropic(prompt, env) {
  const model = env.EMAIL_AI_ANTHROPIC_MODEL || ANTHROPIC_MODEL_DEFAULT;
  let upstream;
  try {
    upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicKey(env),
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        max_tokens: 8000,
        system: [
          { type: 'text', text: prompt.systemBase + OUTPUT_TOOL },
          { type: 'text', text: prompt.catalogBlock, cache_control: { type: 'ephemeral' } }
        ],
        tools: [ANTHROPIC_TOOL],
        tool_choice: { type: 'tool', name: 'build_email' },
        messages: [{ role: 'user', content: prompt.user }]
      })
    });
  } catch (e) {
    throw new ApiError(502, 'Could not reach the AI service. Please try again.');
  }

  if (!upstream.ok) {
    console.error('Anthropic error', upstream.status, await upstream.text());
    if (upstream.status === 429 || upstream.status === 529) throw new ApiError(503, 'The AI service is busy. Please try again in a moment.');
    throw new ApiError(502, 'The AI service returned an error. Please try again.');
  }

  const data = await upstream.json();
  if (data.stop_reason === 'max_tokens') throw new ApiError(502, 'The email was too long to build in one go. Try shorter copy.');
  const block = (data.content || []).find(b => b.type === 'tool_use');
  if (!block || !block.input || !Array.isArray(block.input.sections)) {
    throw new ApiError(502, 'The AI did not return a usable email. Please try again.');
  }
  return { result: block.input, model: model };
}

// ---------------- request handler ----------------
export async function onRequestPost({ request, env }) {
  try {
    const provider = (env.EMAIL_AI_PROVIDER || 'gemini').toLowerCase();
    if (provider !== 'gemini' && provider !== 'anthropic') throw new ApiError(500, 'AI is not configured on the server.');
    if (provider === 'gemini' && !geminiKey(env)) throw new ApiError(500, 'AI is not configured on the server.');
    if (provider === 'anthropic' && !anthropicKey(env)) throw new ApiError(500, 'AI is not configured on the server.');
    if (!originAllowed(request, env)) throw new ApiError(403, 'Forbidden.');

    const raw = await request.text();
    if (raw.length > MAX_BODY_CHARS) throw new ApiError(413, 'Request too large.');
    let body;
    try { body = JSON.parse(raw); } catch (e) { throw new ApiError(400, 'Invalid request.'); }

    const mode = body.mode;
    if (mode !== 'generate' && mode !== 'refine') throw new ApiError(400, 'Invalid mode.');

    const catalogJson = JSON.stringify(body.catalog || []);
    if (!Array.isArray(body.catalog) || !body.catalog.length || catalogJson.length > MAX_CATALOG_CHARS) {
      throw new ApiError(400, 'Invalid section catalog.');
    }

    let userText;
    if (mode === 'generate') {
      const copy = typeof body.copy === 'string' ? body.copy.trim() : '';
      const extra = typeof body.extra === 'string' ? body.extra.trim() : '';
      if (copy.length < 20) throw new ApiError(400, 'Please paste the email copy first.');
      if (copy.length > MAX_COPY_CHARS || extra.length > MAX_INSTRUCTION_CHARS) throw new ApiError(413, 'Copy is too long.');
      userText = 'Build an email from this copy.\n' +
        (extra ? '\nExtra instructions from the user:\n' + extra + '\n' : '') +
        '\nCOPY:\n"""\n' + copy + '\n"""';
    } else {
      const instruction = typeof body.instruction === 'string' ? body.instruction.trim() : '';
      const currentJson = JSON.stringify(body.current || []);
      if (!instruction) throw new ApiError(400, 'Please describe the change you want.');
      if (instruction.length > MAX_INSTRUCTION_CHARS) throw new ApiError(413, 'Instruction is too long.');
      if (!Array.isArray(body.current) || !body.current.length) throw new ApiError(400, 'Nothing to refine yet.');
      if (currentJson.length > MAX_CURRENT_CHARS) throw new ApiError(413, 'This email is too large to refine with AI.');
      userText = 'CURRENT EMAIL (JSON):\n' + currentJson + '\n\nINSTRUCTION:\n' + instruction;
    }

    if (await rateLimited(request, env)) throw new ApiError(429, 'Hourly AI limit reached. Please try again later.');

    // Optional font list (sent when the user wants modern fonts)
    let fontsJson = '';
    if (Array.isArray(body.fonts) && body.fonts.length) {
      const fonts = body.fonts.slice(0, 30).map(f => ({
        label: String((f && f.label) || '').slice(0, 60),
        value: String((f && f.value) || '').slice(0, 120),
        note: String((f && f.note) || '').slice(0, 100)
      })).filter(f => f.value);
      if (fonts.length) fontsJson = JSON.stringify(fonts);
    }

    const systemBase = SYSTEM_BASE + (mode === 'refine' ? SYSTEM_REFINE : '') + (fontsJson ? TYPOGRAPHY : '');
    const catalogBlock = 'SECTION CATALOG (JSON):\n' + catalogJson + (fontsJson ? '\n\nFONTS (JSON):\n' + fontsJson : '');
    const prompt = {
      systemBase: systemBase,
      catalogBlock: catalogBlock,
      system: systemBase + '\n\n' + catalogBlock,
      user: userText
    };

    const out = provider === 'anthropic' ? await callAnthropic(prompt, env) : await callGemini(prompt, env);
    return json({ result: out.result, model: out.model });
  } catch (e) {
    if (e instanceof ApiError) return json({ error: e.message }, e.status);
    console.error('Unexpected error', e && e.stack ? e.stack : String(e));
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
}

// Anything other than POST
export async function onRequest() {
  return json({ error: 'Method not allowed.' }, 405);
}
