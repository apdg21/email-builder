/* ==========================================================================
   Code Tidy — turn the generated email HTML into "proper form"
   --------------------------------------------------------------------------
   What it does
     1. Collects every <style> block in the document (head AND body) and merges
        them into a single <style> inside <head>.
     2. Moves every @media query to the TOP of that stylesheet, grouped
        together, and merges queries that share the same breakpoint into one
        @media block.
     3. Leaves all non-media rules (body, table, .class rules, @font-face,
        @keyframes, ...) below the responsive block, in their original order.

   Cascade safety
     Reordering CSS can change which declaration wins, so the engine checks
     before it moves anything:
       - two @media blocks whose breakpoints can both apply are only merged
         when no rule inside them fights over the same property;
       - a base rule that currently loses to an equal-specificity media rule is
         kept ahead of the media block, so the media rule still wins.
     Everything else keeps its original relative order.
   ========================================================================== */
(function (global) {
    'use strict';

    /* ---------------------------------------------------------------- utils */
    function isWs(c) { return c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\f'; }

    // index just after the closing quote of the string starting at css[i]
    function skipString(css, i) {
        const quote = css[i];
        i++;
        while (i < css.length) {
            if (css[i] === '\\') { i += 2; continue; }
            if (css[i] === quote) return i + 1;
            i++;
        }
        return i;
    }

    // index of the '}' matching the '{' at css[i]
    function matchBrace(css, i) {
        let depth = 0;
        while (i < css.length) {
            const c = css[i];
            if (c === '/' && css[i + 1] === '*') {
                const e = css.indexOf('*/', i + 2);
                i = e === -1 ? css.length : e + 2;
                continue;
            }
            if (c === '"' || c === "'") { i = skipString(css, i); continue; }
            if (c === '{') depth++;
            else if (c === '}') {
                depth--;
                if (depth === 0) return i;
            }
            i++;
        }
        return css.length;
    }

    /* --------------------------------------------------------- CSS parsing */

    // Splits a stylesheet into top-level blocks.
    // Each block: { type, prelude, block, comments }
    // type: 'rule' (selector { ... }) | 'at' (@media/@font-face/...) | 'raw'
    function parseBlocks(css) {
        const blocks = [];
        let i = 0;
        let start = 0;
        let pending = [];
        const n = css.length;

        while (i < n) {
            const c = css[i];

            // comment — keep it, but keep it OUT of the next prelude
            if (c === '/' && css[i + 1] === '*') {
                const e = css.indexOf('*/', i + 2);
                const end = e === -1 ? n : e + 2;
                pending.push(css.slice(i, end).trim());
                i = end;
                start = i;
                continue;
            }
            if (c === '"' || c === "'") { i = skipString(css, i); continue; }

            if (c === '{') {
                const end = matchBrace(css, i);
                const prelude = css.slice(start, i);
                const body = css.slice(i + 1, end);
                blocks.push({
                    type: /^\s*@/.test(prelude) ? 'at' : 'rule',
                    prelude: prelude.trim(),
                    block: body,
                    comments: pending
                });
                pending = [];
                i = end + 1;
                start = i;
                continue;
            }

            // statement at-rule (@import, @charset) ends with ';'
            if (c === ';' && /^\s*@/.test(css.slice(start, i))) {
                blocks.push({ type: 'raw', prelude: css.slice(start, i + 1).trim(), block: '', comments: pending });
                pending = [];
                i++;
                start = i;
                continue;
            }

            i++;
        }

        const tail = css.slice(start).trim();
        if (tail || pending.length) {
            blocks.push({ type: 'raw', prelude: tail, block: '', comments: pending });
        }
        return blocks;
    }

    // splits on a top-level separator, ignoring strings, comments and parens
    function splitTopLevel(text, sep) {
        const out = [];
        let depth = 0, start = 0, i = 0;
        const n = text.length;
        while (i < n) {
            const c = text[i];
            if (c === '/' && text[i + 1] === '*') {
                const e = text.indexOf('*/', i + 2);
                i = e === -1 ? n : e + 2;
                continue;
            }
            if (c === '"' || c === "'") { i = skipString(text, i); continue; }
            if (c === '(') { depth++; i++; continue; }
            if (c === ')') { depth--; i++; continue; }
            if (c === sep && depth === 0) { out.push(text.slice(start, i)); start = i + 1; i++; continue; }
            i++;
        }
        out.push(text.slice(start));
        return out;
    }

    // "a, b(c,d)" -> ['a', 'b(c,d)']
    function splitSelectorList(sel) {
        return splitTopLevel(sel, ',').map(s => s.trim()).filter(Boolean);
    }

    // "padding: 0; color: red !important" -> [{prop,value,important}]
    function parseDeclarations(text) {
        const out = [];
        splitTopLevel(text, ';').forEach(part => {
            const raw = part.trim();
            if (!raw) return;
            const idx = raw.indexOf(':');
            if (idx === -1) return;
            const prop = raw.slice(0, idx).trim().toLowerCase();
            let value = raw.slice(idx + 1).trim();
            let important = false;
            const bang = /!\s*important\s*$/i.exec(value);
            if (bang) {
                important = true;
                value = value.slice(0, bang.index).trim();
            }
            if (!prop) return;
            out.push({ prop: prop, value: value, important: important });
        });
        return out;
    }

    function normSelector(sel) {
        return sel.replace(/\s*([>+~])\s*/g, '$1').replace(/\s+/g, ' ').trim();
    }

    // "only screen and (max-width: 480px), only screen and (max-width: 480px)"
    //  -> "only screen and (max-width: 480px)"
    function normCondition(cond) {
        const parts = splitTopLevel(cond, ',')
            .map(s => s.replace(/\s+/g, ' ').trim().toLowerCase())
            .filter(Boolean);
        const seen = [];
        parts.forEach(p => { if (seen.indexOf(p) === -1) seen.push(p); });
        return seen.join(', ');
    }

    /* ------------------------------------------------------- rule modelling */
    function ruleFromBlock(b) {
        return {
            selectors: splitSelectorList(b.prelude),
            decls: parseDeclarations(b.block),
            comments: b.comments || []
        };
    }

    // Do two rules fight over the same property? Source order only decides the
    // winner when the specificity is equal, so compare selector lists. Two
    // declarations that set the same value never fight, whatever the order.
    function rulesConflict(a, b) {
        const aSel = a.selectors.map(normSelector);
        const bSel = b.selectors.map(normSelector);
        let shared = false;
        aSel.forEach(sa => { if (bSel.indexOf(sa) !== -1) shared = true; });
        if (!shared) return false;

        const aMap = {};
        a.decls.forEach(d => { aMap[d.prop] = d; });
        const bMap = {};
        b.decls.forEach(d => { bMap[d.prop] = d; });

        for (const prop in aMap) {
            if (!bMap[prop]) continue;
            // same importance level -> the later rule wins -> order matters
            if (aMap[prop].important !== bMap[prop].important) continue;
            if (aMap[prop].value === bMap[prop].value) continue;   // same result either way
            return true;
        }
        return false;
    }

    /* --------------------------------------------------------- rendering */
    const BANNER_RESPONSIVE = '/* \u2550\u2550 RESPONSIVE \u2550\u2550 all media queries, grouped by breakpoint */';
    const BANNER_BASE = '/* \u2550\u2550 BASE STYLES \u2550\u2550 */';
    const BANNER_PINNED = '/* \u2550\u2550 BASE \u2550\u2550 kept above the responsive block so the cascade stays identical */';
    const BANNERS = [BANNER_RESPONSIVE, BANNER_BASE, BANNER_PINNED];

    // comments this module writes itself are re-emitted on every pass, so they
    // are dropped while parsing and added back when rendering
    function stripBanners(comments) {
        return (comments || []).filter(c => BANNERS.indexOf(c.trim()) === -1);
    }

    function renderRule(rule, pad) {
        const lines = [];
        (rule.comments || []).forEach(c => lines.push(pad + c));
        lines.push(pad + rule.selectors.join(', ') + ' {');
        rule.decls.forEach(d => {
            lines.push(pad + '    ' + d.prop + ': ' + d.value + (d.important ? ' !important' : '') + ';');
        });
        lines.push(pad + '}');
        return lines.join('\n');
    }

    function renderMedia(cond, rules, pad) {
        const inner = pad + '    ';
        const lines = [];
        lines.push(pad + '@media ' + cond + ' {');
        rules.forEach(r => lines.push(renderRule(r, inner)));
        lines.push(pad + '}');
        return lines.join('\n');
    }

    /* --------------------------------------------------------- CSS tidying */
    function tidyCss(css, indent) {
        const pad = indent || '        ';
        const blocks = parseBlocks(css);

        const mediaEntries = [];  // { cond, rules:[], order, comments:[] }
        const baseBlocks = [];     // { kind, order, ... }
        let order = 0;

        blocks.forEach(b => {
            if (b.type === 'at' && /^@media\b/i.test(b.prelude)) {
                const cond = normCondition(b.prelude.replace(/^@media\s*/i, ''));
                const inner = parseBlocks(b.block);
                const rules = inner.filter(x => x.type === 'rule').map(ruleFromBlock);
                const raws = inner.filter(x => x.type !== 'rule');
                // the comment that introduced this block belongs to its first rule
                const lead = stripBanners(b.comments);
                if (lead.length && rules.length) {
                    rules[0].comments = lead.concat(stripBanners(rules[0].comments));
                }
                mediaEntries.push({
                    cond: cond,
                    rules: rules,
                    raws: raws.map(r => r.prelude + (r.block ? ' { ' + r.block.trim() + ' }' : '')),
                    order: order++,
                    comments: []
                });
                return;
            }
            if (b.type === 'rule') {
                const rule = ruleFromBlock(b);
                rule.comments = stripBanners(rule.comments);
                baseBlocks.push({ kind: 'rule', order: order++, rule: rule });
                return;
            }
            baseBlocks.push({
                kind: 'raw',
                order: order++,
                text: stripBanners(b.comments).concat([b.prelude + (b.block ? ' { ' + b.block.trim() + ' }' : '')]).join('\n')
            });
        });

        /* ---- which conditions may be merged into one @media block? ---------- */
        const conds = [];
        mediaEntries.forEach(e => { if (conds.indexOf(e.cond) !== -1) return; conds.push(e.cond); });

        // Merging puts every @media of one breakpoint into a single block, and
        // the blocks are stacked in the order the breakpoints first appear.
        // A rule that currently wins (the later one) must not end up behind the
        // rule it beats — that is the only thing this reordering can break.
        const groupIndex = {};
        conds.forEach((c, i) => { groupIndex[c] = i; });

        let mergeAll = true;
        for (let i = 0; i < mediaEntries.length && mergeAll; i++) {
            for (let j = i + 1; j < mediaEntries.length; j++) {
                const early = mediaEntries[i];
                const late = mediaEntries[j];
                const clash = late.rules.some(lr => early.rules.some(er => rulesConflict(er, lr)));
                if (!clash) continue;
                // "late" wins today; it must still win after the merge
                if (groupIndex[late.cond] < groupIndex[early.cond]) { mergeAll = false; break; }
            }
        }

        /* ---- base rules that must stay ahead of the media block ------------- */
        // A base rule that currently LOSES to a media rule (media comes later in
        // the source) has to move ahead of the media block, otherwise it would
        // start winning once the media block is hoisted.
        const pinnedIndex = {};
        baseBlocks.forEach((b, idx) => {
            if (b.kind !== 'rule') return;
            for (const m of mediaEntries) {
                if (m.order < b.order) continue;              // media already wins
                if (m.rules.some(mr => rulesConflict(mr, b.rule))) { pinnedIndex[idx] = true; break; }
            }
        });

        // Only a PREFIX of the base rules can move up, so their order stays intact.
        let lastPinned = -1;
        Object.keys(pinnedIndex).forEach(k => { lastPinned = Math.max(lastPinned, +k); });
        const prefix = baseBlocks.slice(0, lastPinned + 1);
        const rest = baseBlocks.slice(lastPinned + 1);

        // A pinned rule that also fights with an EARLIER media rule cannot win
        // both ways — that media block simply stays where it is.
        const sticky = {};
        prefix.forEach(b => {
            if (b.kind !== 'rule') return;
            mediaEntries.forEach(m => {
                if (m.order >= b.order) return;
                if (m.rules.some(mr => rulesConflict(mr, b.rule))) sticky[m.order] = true;
            });
        });
        Object.keys(sticky).forEach(k => {
            const i = mediaEntries.findIndex(e => e.order === +k);
            if (i !== -1) mediaEntries.splice(i, 1);
        });

        /* ---- build the media blocks ---------------------------------------- */
        const mediaBlocks = [];
        const liveConds = [];
        mediaEntries.forEach(e => { if (liveConds.indexOf(e.cond) === -1) liveConds.push(e.cond); });

        function blockFrom(entries) {
            const rules = [];
            const raws = [];
            entries.forEach(e => {
                e.rules.forEach(r => rules.push(r));
                e.raws.forEach(r => raws.push(r));
            });
            return { cond: entries[0].cond, rules: rules, raws: raws, order: entries[0].order };
        }

        if (mergeAll) {
            // one @media block per breakpoint — the tidiest form
            liveConds.forEach(cond => {
                mediaBlocks.push(blockFrom(mediaEntries.filter(e => e.cond === cond)));
            });
        } else {
            // merging one breakpoint into a single block would change what wins,
            // so only merge blocks that already sit next to each other
            let run = [];
            const flush = () => { if (run.length) { mediaBlocks.push(blockFrom(run)); run = []; } };
            mediaEntries.forEach(e => {
                if (run.length && run[run.length - 1].cond === e.cond) { run.push(e); return; }
                flush();
                run = [e];
            });
            flush();
        }
        mediaBlocks.sort((a, b) => a.order - b.order);

        /* ---- render -------------------------------------------------------- */
        const out = [];
        if (prefix.length) {
            out.push(pad + BANNER_PINNED);
            prefix.forEach(b => {
                if (b.kind === 'rule') out.push(renderRule(b.rule, pad));
                else out.push(pad + b.text);
            });
        }
        if (mediaBlocks.length) {
            out.push(pad + BANNER_RESPONSIVE);
            mediaBlocks.forEach(mb => {
                out.push(renderMedia(mb.cond, mb.rules, pad));
                if (mb.raws && mb.raws.length) {
                    mb.raws.forEach(r => out.push(pad + '    ' + r));
                }
            });
        }
        if (rest.length) {
            out.push(pad + BANNER_BASE);
            rest.forEach(b => {
                if (b.kind === 'rule') out.push(renderRule(b.rule, pad));
                else out.push(pad + b.text);
            });
        }

        return {
            css: out.join('\n'),
            mediaBlocks: mediaBlocks.length,
            mergedFrom: mediaEntries.length
        };
    }

    /* ------------------------------------------------------- HTML tidying */
    const STYLE_RE = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;

    function tidyEmailHtml(html) {
        const stats = { styleBlocksBefore: 0, mediaBefore: 0, mediaAfter: 0, merged: 0 };

        if (typeof html !== 'string' || !html) return { html: html, stats: stats };

        // 1. pull every <style> out of the document, remembering where they were
        const headOpen = html.indexOf('<head');
        const headClose = html.indexOf('</head>');
        const headStart = headOpen === -1 ? -1 : headOpen;
        const headEnd = headClose === -1 ? -1 : headClose;

        const matches = [];
        STYLE_RE.lastIndex = 0;
        let m;
        while ((m = STYLE_RE.exec(html)) !== null) {
            matches.push({ index: m.index, length: m[0].length, css: m[1] });
            if (m[0].length === 0) STYLE_RE.lastIndex++;
        }
        stats.styleBlocksBefore = matches.length;

        const cssParts = [];
        matches.forEach(mt => { if (mt.css && mt.css.trim()) cssParts.push(mt.css); });

        // remove them all; remember where the first one sat
        let htmlOut = '';
        let last = 0;
        let insertAt = -1;
        matches.forEach((mt, i) => {
            htmlOut += html.slice(last, mt.index);
            if (i === 0 && headStart !== -1 && mt.index >= headStart && mt.index < headEnd) {
                insertAt = htmlOut.length;      // keep the original spot
            }
            last = mt.index + mt.length;
        });
        htmlOut += html.slice(last);

        const combinedCss = cssParts.join('\n');
        stats.mediaBefore = (combinedCss.match(/@media/gi) || []).length;

        // 2. tidy the stylesheet
        const tidied = tidyCss(combinedCss, '        ');
        stats.mediaAfter = (tidied.css.match(/@media/gi) || []).length;
        stats.merged = tidied.mergedFrom - tidied.mediaBlocks;

        const styleTag = '<style type="text/css">\n' + tidied.css + '\n    </style>';

        // 3. put the single stylesheet back — in <head>, where it belongs
        const newHeadClose = htmlOut.indexOf('</head>');
        if (insertAt === -1 && newHeadClose !== -1) {
            insertAt = htmlOut.lastIndexOf('\n', newHeadClose);
            if (insertAt === -1) insertAt = newHeadClose;
            htmlOut = htmlOut.slice(0, insertAt) + '\n    ' + styleTag + '\n' + htmlOut.slice(insertAt);
        } else if (insertAt === -1) {
            htmlOut = styleTag + '\n' + htmlOut;
        } else {
            htmlOut = htmlOut.slice(0, insertAt) + styleTag + htmlOut.slice(insertAt);
        }

        return { html: htmlOut, stats: stats };
    }

    const api = {
        tidy: tidyEmailHtml,
        tidyCss: tidyCss,
        parseBlocks: parseBlocks,
        rulesConflict: rulesConflict
    };

    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    global.CodeTidy = api;
})(typeof window !== 'undefined' ? window : globalThis);
