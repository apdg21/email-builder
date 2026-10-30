
// Bonus Hour Plan — Email-derived section from "You just gained an extra hour" email
// Category: Content Blocks
SectionRegistry.register('email-plan-grid', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            gridBackground: '#2E2A39',
            gridPadding: '40px 30px 42px 30px',
            title: 'The bonus hour plan',
            titleColor: '#E9A6CF',
            titleFontSize: '9px',
            subtitle: 'How to Spend Your Bonus 60 Minutes',
            subtitleColor: '#FDFBF7',
            subtitleFontSize: '23px',
            subtitleFontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            dividerColor: '#9B046F',
            stepGap: '26px',
            fontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            stepCellBg: '#9B046F',
            stepBgColor: '#FDFBF7',
            smallCopyColor: '#E4E1EA',
            stepIconSize: '54px',
            stepIconTextColor: '#FDFBF7',

            step1Time: '0–20 Mins',
            step1Emoji: '☕',
            step1Text: 'Pour a hot drink, select your PDF pattern blueprint, and press your fabric fat quarters.',
            step2Time: '20–40 Mins',
            step2Emoji: '✂️',
            step2Text: 'Batch-cut your strip sets and lay out your blocks on the design board.',
            step3Time: '40–60 Mins',
            step3Emoji: '🧵',
            step3Text: 'Chain-piece your first row and enjoy the relaxing rhythm of your machine!'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const uid = String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');
        const steps = [
            {
                time: c.step1Time,
                emoji: c.step1Emoji,
                text: c.step1Text
            },
            {
                time: c.step2Time,
                emoji: c.step2Emoji,
                text: c.step2Text
            },
            {
                time: c.step3Time,
                emoji: c.step3Emoji,
                text: c.step3Text
            }
        ];

        const stepHtml = (uid, idx, s) => `
            <td class="step-cell-${uid}" width="180" valign="top" align="center" style="width:180px;padding:0 10px;direction:ltr;">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                        <td align="center" style="padding-bottom:12px;">
                            <div style="width:54px;height:54px;line-height:54px;border-radius:27px;background-color:${c.stepCellBg};font-family:${c.fontFamily};font-size:24px;text-align:center;color:${c.stepIconTextColor};">${s.emoji}</div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="font-family:${c.fontFamily};font-size:11px;line-height:16px;letter-spacing:2.4px;text-transform:uppercase;color:${c.titleColor};font-weight:600;padding-bottom:8px;">${s.time}</td>
                    </tr>
                    <tr>
                        <td align="center" class="small-copy" style="font-family:${c.fontFamily};font-size:13px;line-height:22px;font-weight:300;color:${c.smallCopyColor};">${escapeHtml(s.text)}</td>
                    </tr>
                </table>
            </td>
        `;

        return `
            <style>
                @media only screen and (max-width: 480px) {
                    .step-row-${uid} {
                        display: block !important;
                        width: 100% !important;
                    }
                    .step-cell-${uid} {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 0 0 16px 0 !important;
                        margin-bottom: 16px !important;
                        box-sizing: border-box !important;
                    }
                    .step-cell-${uid}:last-child {
                        margin-bottom: 0 !important;
                    }
                    .small-copy {
                        font-size: 14px !important;
                    }
                    .step-divider-mobile {
                        display: none !important;
                    }
                }
                @media only screen and (max-width: 360px) {
                    .step-cell-${uid} {
                        padding: 0 !important;
                    }
                }
            </style>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="background-color:${c.gridBackground};padding:${c.gridPadding};" bgcolor="${c.gridBackground}">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" style="padding-bottom:10px;font-family:${c.fontFamily};font-size:${c.titleFontSize};line-height:13px;letter-spacing:3.2px;text-transform:uppercase;color:${c.titleColor};font-weight:600;">
                                    ${escapeHtml(c.title)}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="font-family:${c.fontFamily};font-size:${c.subtitleFontSize};line-height:32px;font-weight:500;color:${c.subtitleColor};padding-bottom:8px;">
                                    ${escapeHtml(c.subtitle)}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-bottom:26px;">
                                    <div style="width:44px;height:2px;background-color:${c.dividerColor};font-size:0;line-height:0;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center">
                                    <table class="step-row-${uid}" role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                                        <tr>
                                            ${steps.map((s, i) => stepHtml(uid, i, s)).join('')}
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    },

    showProperties: function(section, container) {
        const c = section.content;
        createInput('Title', 'title', 'text', c.title, null, c, container);
        createInput('Title Color', 'titleColor', 'color', c.titleColor, null, c, container);
        createInput('Subtitle', 'subtitle', 'text', c.subtitle, null, c, container);
        createInput('Subtitle Color', 'subtitleColor', 'color', c.subtitleColor, null, c, container);
        createInput('Subtitle Font Size', 'subtitleFontSize', 'text', c.subtitleFontSize, null, c, container);
        createInput('Grid Background', 'gridBackground', 'color', c.gridBackground, null, c, container);
        createInput('Grid Padding', 'gridPadding', 'text', c.gridPadding, null, c, container);
        createInput('Step 1 Time', 'step1Time', 'text', c.step1Time, null, c, container);
        createInput('Step 1 Emoji', 'step1Emoji', 'text', c.step1Emoji, null, c, container);
        createInput('Step 1 Text', 'step1Text', 'textarea', c.step1Text, null, c, container);
        createInput('Step 2 Time', 'step2Time', 'text', c.step2Time, null, c, container);
        createInput('Step 2 Emoji', 'step2Emoji', 'text', c.step2Emoji, null, c, container);
        createInput('Step 2 Text', 'step2Text', 'textarea', c.step2Text, null, c, container);
        createInput('Step 3 Time', 'step3Time', 'text', c.step3Time, null, c, container);
        createInput('Step 3 Emoji', 'step3Emoji', 'text', c.step3Emoji, null, c, container);
        createInput('Step 3 Text', 'step3Text', 'textarea', c.step3Text, null, c, container);
    }
});
