/* ============================================================
   AI Email Builder  (client side)
   - "Generate": user pastes copy  -> AI assembles sections -> saved as a template
   - "Refine":   user types a change -> AI edits the current email
   The AI only ever returns section types + field values. Everything is
   validated here before it touches the canvas, so the normal editor,
   undo, drag-and-drop and templates keep working exactly as before.
   Depends on globals from core.js: structure, masterSettings, fontOptions,
   STORAGE_KEY, getDefaultContent, getTemplates, updateTemplatesList,
   saveHistory, updateStructureList, showMasterSettings, updatePreview, showMessage
   ============================================================ */
(function () {
    'use strict';

    const ENDPOINT = '/api/email-ai';
    const REQUEST_TIMEOUT_MS = 120000;

    // Complex nested-block sections: the AI can keep/move/delete them on refine, but not build or edit them.
    const AI_EXCLUDED = new Set([
        'custom-html', 'dynamic-blocks',
        'single-column-blocks', 'two-column-blocks', 'three-column-blocks'
    ]);

    // Generic style fields that every section has; hidden from the AI to keep the prompt small.
    const HIDDEN_KEYS = /^(backgroundType|backgroundImage|backgroundGradient|border(Width|Color|Style|Radius)|sectionClass|sectionId|customStyles|textAlign)$/;
    // Spacing fields: hidden when generating (the app sets spacing itself), shown when refining.
    const SPACING_KEYS = /^(padding|margin)(Top|Bottom|Left|Right)?$/;

    // ---- value guards (AI output ends up inside inline styles and href="" attributes) ----
    const URL_KEY   = /(url|link|href|src|logo|photo|avatar|image)$/i;
    const FONT_KEY  = /fontfamily$/i;
    const STYLE_KEY = /(color|background|border|padding|margin|radius|size|height|width|weight|spacing|shadow|align|opacity)/i;
    const HEX6      = /^#[0-9a-f]{6}$/i;

    const clone = (o) => JSON.parse(JSON.stringify(o));

    function isSafeCss(s) {
        return s.length <= 200 && !/[;{}<>"`\\]/.test(s) && !/url\s*\(|expression|@import|javascript:/i.test(s);
    }

    function isSafeUrl(u) {
        u = u.trim();
        if (u === '') return true;
        if (u.length > 2000) return false;
        if (/["<>`\r\n\\]/.test(u)) return false;
        // allow merge tags like {{ organization.url }} / {% unsubscribe_url %} anywhere
        const bare = u.replace(/\{\{[^}]*\}\}|\{%[^%]*%\}/g, '');
        if (/['\s]/.test(bare)) return false;
        return /^(#|https?:\/\/|mailto:|tel:|\{\{|\{%)/i.test(u);
    }

    function cleanString(key, s) {
        if (FONT_KEY.test(key)) {
            return fontOptions.some(f => f.value === s) ? s : undefined;
        }
        if (URL_KEY.test(key)) return isSafeUrl(s) ? s.trim() : undefined;
        if (STYLE_KEY.test(key)) return isSafeCss(s) ? s : undefined;
        // plain text everywhere else: strip any tags, cap the length
        return s.replace(/<[^>]*>/g, '').slice(0, 4000);
    }

    // Returns a sanitised value shaped like `def`, or undefined to ignore it.
    function cleanValue(key, value, def) {
        if (Array.isArray(def)) {
            if (!Array.isArray(value)) return undefined;
            const tpl = def[0];
            return value.slice(0, 20).map(v => cleanValue(key, v, tpl)).filter(v => v !== undefined);
        }
        if (def && typeof def === 'object') {
            if (!value || typeof value !== 'object' || Array.isArray(value)) return undefined;
            const out = clone(def);
            Object.keys(def).forEach(k => {
                if (k in value) {
                    const v = cleanValue(k, value[k], def[k]);
                    if (v !== undefined) out[k] = v;
                }
            });
            return out;
        }
        if (typeof def === 'boolean') return typeof value === 'boolean' ? value : undefined;
        if (typeof def === 'number')  return (typeof value === 'number' && isFinite(value)) ? value : undefined;
        if (typeof value === 'number' && isFinite(value)) value = String(value);
        if (typeof value !== 'string') return undefined;
        return cleanString(key, value);
    }

    function mergeContent(type, base, incoming, allowSpacing) {
        if (!incoming || typeof incoming !== 'object') return base;
        const defaults = getDefaultContent(type);
        Object.keys(incoming).forEach(key => {
            if (!(key in defaults)) return;
            if (!allowSpacing && SPACING_KEYS.test(key)) return;
            const v = cleanValue(key, incoming[key], defaults[key]);
            if (v !== undefined) base[key] = v;
        });
        return base;
    }

    function cleanMaster(m) {
        const out = {};
        if (!m || typeof m !== 'object') return out;
        ['backgroundColor', 'bodyBackgroundColor', 'bodyTextColor'].forEach(k => {
            if (typeof m[k] === 'string' && HEX6.test(m[k])) out[k] = m[k];
        });
        if (typeof m.bodyFontFamily === 'string' && fontOptions.some(f => f.value === m.bodyFontFamily)) {
            out.bodyFontFamily = m.bodyFontFamily;
        }
        return out;
    }

    // ---- catalog sent to the AI (built live from the dropdown + registry) ----
    function slim(v) {
        if (typeof v === 'string') return v.length > 90 ? v.slice(0, 90) + '…' : v;
        if (Array.isArray(v)) return v.slice(0, 3).map(slim);
        if (v && typeof v === 'object') {
            const o = {};
            Object.keys(v).forEach(k => { o[k] = slim(v[k]); });
            return o;
        }
        return v;
    }

    function visibleFields(content, truncate, showSpacing) {
        const o = {};
        Object.keys(content).forEach(k => {
            if (HIDDEN_KEYS.test(k)) return;
            if (k === 'fontFamily' && !showSpacing) return;   // fonts are offered to the AI through the FONTS list instead
            if (!showSpacing && SPACING_KEYS.test(k)) return;
            let v = content[k];
            if (typeof v === 'string' && v.indexOf('data:') === 0 && v.length > 200) v = '[embedded data omitted]';
            o[k] = truncate ? slim(v) : v;
        });
        return o;
    }

    // "Design 1/2/3" are style variants, except product-design-* which are different blocks.
    const isStyleVariant = (type) => /-design-\d$/.test(type) && type.indexOf('product-design') !== 0;

    function allowedTypes() {
        const set = new Set();
        document.querySelectorAll('#section-type-select option').forEach(o => {
            if (o.value && !AI_EXCLUDED.has(o.value)) set.add(o.value);
        });
        return set;
    }

    function buildCatalog(variant) {
        const out = [];
        document.querySelectorAll('#section-type-select optgroup').forEach(g => {
            const group = g.label.replace(/[─]/g, '').trim();
            g.querySelectorAll('option').forEach(o => {
                const type = o.value;
                if (!type || AI_EXCLUDED.has(type)) return;
                if (variant !== 'auto' && isStyleVariant(type) && !type.endsWith('-design-' + variant)) return;
                out.push({
                    type: type,
                    label: o.textContent.trim(),
                    group: group,
                    fields: visibleFields(getDefaultContent(type), true)
                });
            });
        });
        return out;
    }

    function buildCurrent() {
        return structure.map((s, i) => {
            const ref = 's' + (i + 1);
            if (AI_EXCLUDED.has(s.type)) return { ref: ref, type: s.type, locked: true };
            return { ref: ref, type: s.type, fields: visibleFields(s.content || {}, false, true) };
        });
    }

    // ---- applying the AI result ----
    function safeName(name) {
        const n = String(name || 'AI email').replace(/[^\p{L}\p{N}\s\-.,()&!?]/gu, '').trim().slice(0, 60);
        return n || 'AI email';
    }

    function autoSaveTemplate(name) {
        const templates = getTemplates();
        const base = safeName(name) + ' (AI)';
        let finalName = base, n = 2;
        while (templates[finalName]) finalName = base + ' ' + (n++);
        templates[finalName] = {
            structure: clone(structure),
            masterSettings: clone(masterSettings),
            canvasWidth: canvasWidth,
            date: new Date().toLocaleString()
        };
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
        } catch (e) {
            return null;
        }
        updateTemplatesList();
        return finalName;
    }

    // ---- spacing ----
    // Every section sits in a wrapper cell (default 20px on all sides), and many sections also pad
    // themselves inside it (e.g. hero 60px 20px). Stacked, that doubles up into very large gaps.
    function spacingMode() {
        const el = document.getElementById('ai-spacing');
        return el ? el.value : 'compact';
    }

    // Does the section's own HTML start with a sizeable inner padding?
    function hasOwnPadding(section) {
        try {
            const html = String(generateSectionContent(section) || '').slice(0, 700);
            const m = html.match(/padding:\s*(\d+(?:\.\d+)?)px/i);
            return !!m && parseFloat(m[1]) >= 24;
        } catch (e) {
            return false;
        }
    }

    // "60px 20px" -> "32px 20px" (caps the vertical values only)
    function capInnerPadding(v) {
        const cap = (p) => {
            const m = /^(\d+(?:\.\d+)?)px$/.exec(p);
            return m ? Math.min(parseFloat(m[1]), 32) + 'px' : p;
        };
        const parts = String(v).trim().split(/\s+/);
        if (parts.length === 1) return cap(parts[0]);
        parts[0] = cap(parts[0]);
        if (parts.length >= 3) parts[2] = cap(parts[2]);
        return parts.join(' ');
    }

    function tightenSpacing(section) {
        const c = section.content;
        if (!c) return;
        if (typeof c.padding === 'string') c.padding = capInnerPadding(c.padding);
        if (hasOwnPadding(section)) {
            // the section pads itself: remove the wrapper padding so it runs full width without doubling up
            c.paddingTop = c.paddingBottom = c.paddingLeft = c.paddingRight = '0px';
        } else {
            c.paddingTop = c.paddingBottom = '10px';
        }
    }

    function tightenCurrent() {
        if (!structure.length) { setStatus('err', 'There is nothing to tighten yet.'); return; }
        if (historyIndex < 0) saveHistory();
        let count = 0;
        (function walk(items) {
            items.forEach(it => {
                if (it.type === 'container') { walk(it.items || []); return; }
                if (AI_EXCLUDED.has(it.type) || !it.content) return;
                tightenSpacing(it);
                count++;
            });
        })(structure);
        finishApply();
        setStatus('', '');
        showResult('Tightened spacing on ' + count + ' sections. Use Undo to revert.', []);
    }

    function newSection(type, content) {
        const section = {
            id: Date.now() + Math.random(),
            type: type,
            content: mergeContent(type, getDefaultContent(type), content, false)
        };
        if (spacingMode() === 'compact') tightenSpacing(section);
        return section;
    }

    function cleanNotes(notes, extra) {
        const list = (Array.isArray(notes) ? notes : []).filter(n => typeof n === 'string').map(n => n.slice(0, 160)).slice(0, 8);
        return list.concat(extra || []);
    }

    function finishApply() {
        activePath = null;
        activeType = null;
        saveHistory();
        updateStructureList();
        showMasterSettings();
        updatePreview();
    }

    // ---- fonts ----
    const PLAIN_FONT = 'Arial, Helvetica, sans-serif';
    const DEFAULT_BODY_FONT = "'Inter', Arial, Helvetica, sans-serif";
    const DEFAULT_HEADING_FONT = "'Poppins', Arial, Helvetica, sans-serif";
    // sections that are mainly headlines get the heading font
    const HEADING_TYPE = /^(hero|opening|title|header-text|cta|closing|callout|three-card|customer-spotlight|promo-code)/;

    function fontsOn() {
        const el = document.getElementById('ai-fonts');
        return !el || el.value === 'modern';
    }

    function buildFonts() {
        return fontOptions.map(f => ({ label: f.label, value: f.value, note: f.note || '' }));
    }

    // Safety net: if the AI did not pick any font, apply a modern heading + body pairing.
    function ensureModernFonts(sections) {
        const has = (v) => fontOptions.some(f => f.value === v);
        if (!has(DEFAULT_BODY_FONT) || !has(DEFAULT_HEADING_FONT)) return;
        const picked = sections.some(s => s.content && s.content.fontFamily && s.content.fontFamily !== PLAIN_FONT);
        if (picked) return;
        sections.forEach(s => {
            if (s.content) s.content.fontFamily = HEADING_TYPE.test(s.type) ? DEFAULT_HEADING_FONT : DEFAULT_BODY_FONT;
        });
        if (masterSettings.bodyFontFamily === PLAIN_FONT) masterSettings.bodyFontFamily = DEFAULT_BODY_FONT;
    }

    function applyGenerate(result) {
        const allowed = allowedTypes();
        const skipped = [];
        const next = [];
        (result.sections || []).forEach(item => {
            if (!item || typeof item.type !== 'string' || !allowed.has(item.type)) {
                if (item && item.type) skipped.push('Skipped unknown section "' + String(item.type).slice(0, 40) + '"');
                return;
            }
            next.push(newSection(item.type, item.content));
        });
        if (!next.length) throw new Error('The AI did not produce any usable sections. Please try again.');
        if (fontsOn()) ensureModernFonts(next);

        if (historyIndex < 0) saveHistory();      // baseline so Undo can return to the previous state
        structure = next;
        Object.assign(masterSettings, cleanMaster(result.masterSettings));
        finishApply();

        const savedAs = autoSaveTemplate(result.name);
        return {
            summary: 'Built ' + next.length + ' sections.' + (savedAs ? ' Saved as "' + savedAs + '".' : ' (Could not save to this browser.)'),
            notes: cleanNotes(result.notes, skipped)
        };
    }

    function applyRefine(result) {
        const allowed = allowedTypes();
        const byRef = new Map(structure.map((s, i) => ['s' + (i + 1), s]));
        const used = new Set();
        const next = [];
        const skipped = [];
        let updated = 0, added = 0;

        (result.sections || []).forEach(item => {
            if (!item) return;
            if (item.ref) {
                const existing = byRef.get(item.ref);
                if (!existing || used.has(item.ref)) return;
                used.add(item.ref);
                const copy = clone(existing);
                if (item.content && typeof item.content === 'object' && !AI_EXCLUDED.has(existing.type)) {
                    const before = JSON.stringify(copy.content);
                    copy.content = mergeContent(existing.type, copy.content, item.content, true);
                    if (JSON.stringify(copy.content) !== before) updated++;
                }
                next.push(copy);
            } else if (typeof item.type === 'string' && allowed.has(item.type)) {
                next.push(newSection(item.type, item.content));
                added++;
            } else if (item.type) {
                skipped.push('Skipped unknown section "' + String(item.type).slice(0, 40) + '"');
            }
        });

        if (!next.length) throw new Error('The AI returned an empty email, so nothing was changed.');
        const removed = structure.length - used.size;

        if (historyIndex < 0) saveHistory();
        structure = next;
        Object.assign(masterSettings, cleanMaster(result.masterSettings));
        finishApply();

        return {
            summary: 'Applied: ' + updated + ' updated, ' + added + ' added, ' + removed + ' removed. Use Undo to revert. Save the template to keep it.',
            notes: cleanNotes(result.notes, skipped)
        };
    }

    // ---- network ----
    async function callAi(body) {
        const ctrl = new AbortController();
        const timer = setTimeout(() => ctrl.abort(), REQUEST_TIMEOUT_MS);
        try {
            const res = await fetch(ENDPOINT, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
                signal: ctrl.signal
            });
            let data = null;
            try { data = await res.json(); } catch (e) { /* non-JSON error page */ }
            if (!res.ok || !data || !data.result) {
                throw new Error((data && data.error) || 'AI request failed (' + res.status + ').');
            }
            lastModel = (data && typeof data.model === 'string') ? data.model.slice(0, 60) : '';
            return data.result;
        } catch (e) {
            if (e.name === 'AbortError') throw new Error('The AI took too long to respond. Please try again.');
            throw e;
        } finally {
            clearTimeout(timer);
        }
    }

    // ---- UI ----
    const CSS = `
    .tb-btn.ai { background: rgba(139,92,246,0.16); border-color: rgba(139,92,246,0.4); color: #c4b5fd; }
    .tb-btn.ai:hover { background: rgba(139,92,246,0.28); color: #fff; }
    #ai-overlay { position: fixed; inset: 0; background: rgba(8,10,16,0.7); z-index: 10000; display: none; align-items: center; justify-content: center; padding: 16px; }
    #ai-overlay.open { display: flex; }
    #ai-dialog { width: 100%; max-width: 640px; max-height: 92vh; display: flex; flex-direction: column; background: var(--surface); border: 1px solid var(--border2); border-radius: 12px; box-shadow: var(--shadow); color: var(--text); }
    .ai-hd { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid var(--border); }
    .ai-hd h2 { font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; gap: 8px; }
    .ai-x { background: none; border: none; color: var(--text3); cursor: pointer; font-size: 1rem; }
    .ai-x:hover { color: var(--text); }
    .ai-tabs { display: flex; padding: 0 14px; border-bottom: 1px solid var(--border); background: var(--surface2); }
    .ai-tab { padding: 9px 14px; font-size: 0.78rem; font-weight: 500; color: var(--text3); background: none; border: none; border-bottom: 2px solid transparent; cursor: pointer; margin-bottom: -1px; }
    .ai-tab.active { color: var(--accent); border-bottom-color: var(--accent); }
    .ai-body { padding: 16px 18px; overflow-y: auto; }
    .ai-pane { display: none; } .ai-pane.active { display: block; }
    .ai-lbl { display: block; font-size: 0.68rem; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.07em; margin: 12px 0 6px; }
    .ai-lbl:first-child { margin-top: 0; }
    .ai-in { width: 100%; padding: 9px 11px; background: var(--surface2); border: 1px solid var(--border); border-radius: 6px; color: var(--text); font-size: 0.8rem; outline: none; font-family: inherit; line-height: 1.5; }
    .ai-in:focus { border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow); }
    textarea.ai-in { resize: vertical; min-height: 120px; }
    .ai-hint { font-size: 0.72rem; color: var(--text3); margin-top: 6px; }
    .ai-go { display: flex; align-items: center; justify-content: center; gap: 7px; width: 100%; margin-top: 14px; padding: 10px; background: var(--purple); border: 1px solid var(--purple); border-radius: 6px; color: #fff; font-size: 0.82rem; font-weight: 600; cursor: pointer; }
    .ai-go:hover { filter: brightness(1.1); }
    .ai-go:disabled { opacity: 0.55; cursor: wait; }
    #ai-status { margin-top: 12px; font-size: 0.78rem; display: none; }
    #ai-status.err { display: block; color: #fca5a5; }
    #ai-status.busy { display: block; color: var(--text2); }
    #ai-result { display: none; padding: 16px 18px; border-top: 1px solid var(--border); }
    #ai-result .ai-sum { font-size: 0.82rem; color: #6ee7b7; font-weight: 500; }
    #ai-result ul { margin: 8px 0 0 18px; padding: 0; font-size: 0.78rem; color: var(--text2); list-style: disc; }
    #ai-result li { margin: 3px 0; }
    #ai-result .ai-sub { font-size: 0.68rem; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.07em; margin-top: 10px; }
    .ai-view { margin-top: 12px; padding: 7px 14px; background: var(--surface3); border: 1px solid var(--border2); border-radius: 6px; color: var(--text); font-size: 0.78rem; cursor: pointer; }
    `;

    const HTML = `
    <div id="ai-dialog" role="dialog" aria-modal="true" aria-labelledby="ai-title">
        <div class="ai-hd">
            <h2 id="ai-title"><i class="fas fa-wand-magic-sparkles" style="color:#a78bfa"></i> AI Email Builder</h2>
            <button class="ai-x" id="ai-close" aria-label="Close"><i class="fas fa-times"></i></button>
        </div>
        <div class="ai-tabs">
            <button class="ai-tab active" data-pane="ai-gen">Generate from copy</button>
            <button class="ai-tab" data-pane="ai-ref">Refine current email</button>
        </div>
        <div class="ai-body">
            <div class="ai-pane active" id="ai-gen">
                <label class="ai-lbl" for="ai-copy">Email copy</label>
                <textarea class="ai-in" id="ai-copy" rows="10" placeholder="Paste your email copy here. Include image URLs, button links and promo codes if you have them. Anything missing stays as a placeholder you can fill in later."></textarea>
                <label class="ai-lbl" for="ai-extra">Extra instructions (optional)</label>
                <input class="ai-in" id="ai-extra" type="text" maxlength="500" placeholder="e.g. brand color #0a7d5a, short and punchy, include a promo code section">
                <label class="ai-lbl" for="ai-variant">Design style</label>
                <select class="ai-in" id="ai-variant">
                    <option value="auto">Let AI choose</option>
                    <option value="1">Design 1 where available</option>
                    <option value="2">Design 2 where available</option>
                    <option value="3">Design 3 where available</option>
                </select>
                <label class="ai-lbl" for="ai-spacing">Spacing</label>
                <select class="ai-in" id="ai-spacing">
                    <option value="compact">Compact (recommended)</option>
                    <option value="design">As designed (larger gaps)</option>
                </select>
                <label class="ai-lbl" for="ai-fonts">Fonts</label>
                <select class="ai-in" id="ai-fonts">
                    <option value="modern">Modern fonts (recommended)</option>
                    <option value="safe">Arial only (safest)</option>
                </select>
                <button class="ai-go" id="ai-go-gen"><i class="fas fa-wand-magic-sparkles"></i> Generate email</button>
                <p class="ai-hint">The result is saved to Saved Templates (in this browser) and opens in the editor so you can adjust anything.</p>
                <p class="ai-hint" id="ai-free-note">Testing mode: text is sent to Google's free Gemini API, which may use it to improve Google products. Don't paste confidential content.</p>
            </div>
            <div class="ai-pane" id="ai-ref">
                <label class="ai-lbl" for="ai-instr">What should change?</label>
                <textarea class="ai-in" id="ai-instr" rows="5" placeholder="e.g. Make the hero headline shorter, move the promo code above the products, remove the P.S., change the button text to Shop Now"></textarea>
                <button class="ai-go" id="ai-go-ref"><i class="fas fa-pen-to-square"></i> Apply changes</button>
                <p class="ai-hint">Only what you ask for is changed. Your manual edits are kept, and Undo reverts the whole AI change.</p>
                <button class="ai-view" id="ai-tighten" type="button"><i class="fas fa-compress"></i> Tighten spacing on current email (no AI)</button>
            </div>
            <div id="ai-status" role="status"></div>
        </div>
        <div id="ai-result"></div>
    </div>`;

    let overlay, busy = false, lastModel = '';

    function setStatus(kind, text) {
        const el = document.getElementById('ai-status');
        el.className = kind || '';
        el.textContent = text || '';
    }

    function setBusy(on) {
        busy = on;
        document.getElementById('ai-go-gen').disabled = on;
        document.getElementById('ai-go-ref').disabled = on;
    }

    function showResult(summary, notes) {
        const box = document.getElementById('ai-result');
        box.innerHTML = '';
        const s = document.createElement('div');
        s.className = 'ai-sum';
        s.textContent = '✓ ' + summary;
        box.appendChild(s);
        if (notes && notes.length) {
            const sub = document.createElement('div');
            sub.className = 'ai-sub';
            sub.textContent = 'Still to do';
            box.appendChild(sub);
            const ul = document.createElement('ul');
            notes.forEach(n => { const li = document.createElement('li'); li.textContent = n; ul.appendChild(li); });
            box.appendChild(ul);
        }
        const b = document.createElement('button');
        b.className = 'ai-view';
        b.textContent = 'View email';
        b.onclick = close;
        box.appendChild(b);
        box.style.display = 'block';
    }

    async function run(mode) {
        if (busy) return;
        document.getElementById('ai-result').style.display = 'none';
        setStatus('', '');

        let body;
        if (mode === 'generate') {
            const copy = document.getElementById('ai-copy').value.trim();
            if (copy.length < 20) { setStatus('err', 'Please paste your email copy first.'); return; }
            if (structure.length && !confirm('This will replace the current email. You can undo afterwards. Continue?')) return;
            body = {
                mode: mode,
                copy: copy,
                extra: document.getElementById('ai-extra').value.trim(),
                catalog: buildCatalog(document.getElementById('ai-variant').value)
            };
        } else {
            const instruction = document.getElementById('ai-instr').value.trim();
            if (!structure.length) { setStatus('err', 'There is nothing to refine yet. Generate or add sections first.'); return; }
            if (structure.some(i => i.type === 'container')) { setStatus('err', 'AI refine does not support emails that use containers yet.'); return; }
            if (!instruction) { setStatus('err', 'Please describe the change you want.'); return; }
            body = { mode: mode, instruction: instruction, current: buildCurrent(), catalog: buildCatalog('auto') };
        }

        if (fontsOn()) body.fonts = buildFonts();
        setBusy(true);
        setStatus('busy', mode === 'generate' ? 'Building your email… this can take up to a minute.' : 'Applying your changes…');
        try {
            const result = await callAi(body);
            const out = mode === 'generate' ? applyGenerate(result) : applyRefine(result);
            setStatus('', '');
            showResult(out.summary + (lastModel ? ' (model: ' + lastModel + ')' : ''), out.notes);
            showMessage(mode === 'generate' ? 'AI email built' : 'AI changes applied', 'success');
            if (mode === 'refine') document.getElementById('ai-instr').value = '';
        } catch (e) {
            console.error('AI builder error:', e);
            setStatus('err', e.message || 'Something went wrong. Please try again.');
        } finally {
            setBusy(false);
        }
    }

    function selectTab(paneId) {
        overlay.querySelectorAll('.ai-tab').forEach(t => t.classList.toggle('active', t.dataset.pane === paneId));
        overlay.querySelectorAll('.ai-pane').forEach(p => p.classList.toggle('active', p.id === paneId));
        setStatus('', '');
        document.getElementById('ai-result').style.display = 'none';
    }

    function open(tab) {
        overlay.classList.add('open');
        selectTab(tab === 'refine' || (!tab && structure.length) ? 'ai-ref' : 'ai-gen');
        const focusEl = document.querySelector('.ai-pane.active textarea');
        if (focusEl) focusEl.focus();
    }

    function close() {
        if (busy) return;
        overlay.classList.remove('open');
    }

    function init() {
        const style = document.createElement('style');
        style.textContent = CSS;
        document.head.appendChild(style);

        overlay = document.createElement('div');
        overlay.id = 'ai-overlay';
        overlay.innerHTML = HTML;
        document.body.appendChild(overlay);

        overlay.addEventListener('mousedown', e => { if (e.target === overlay) close(); });
        document.getElementById('ai-close').onclick = close;
        document.getElementById('ai-go-gen').onclick = () => run('generate');
        document.getElementById('ai-go-ref').onclick = () => run('refine');
        document.getElementById('ai-tighten').onclick = tightenCurrent;
        overlay.querySelectorAll('.ai-tab').forEach(t => t.addEventListener('click', () => selectTab(t.dataset.pane)));
        document.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); });
    }

    window.AiBuilder = { open: open, close: close };

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
