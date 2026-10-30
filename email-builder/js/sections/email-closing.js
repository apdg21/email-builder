
// Closing — Email-derived section from "You just gained an extra hour" email
// Category: Closing
SectionRegistry.register('email-closing', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            bgColor: '#F5F2EB',
            padTop: '8px',
            padBottom: '44px',
            padLeft: '52px',
            padRight: '52px',
            dividerColor: '#E7DFD2',
            closingLine: 'How are you spending your bonus hour today? Hit reply and let us know what\'s on your cutting mat!',
            closingLineColor: '#3A3548',
            closingLineFontSize: '15px',
            greeting: 'Happy stitching,',
            greetingColor: '#3A3548',
            sender: 'The Brand Team',
            senderColor: '#9B046F',
            senderFontSize: '14px',
            psLabel: 'P.S.',
            psLabelColor: '#2E2A39',
            psText: 'All our pattern blueprints are instant PDF downloads—so you can print your instructions and start stitching within minutes!',
            psFontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            psBg: '#F5F2EB',
            psBorder: '#9B046F',
            psPadding: '16px 20px',
            psFontColor: '#4A4453',
            psFontSize: '13px',
            psLineHeight: '23px',
            separator: '❖ ◆ ❖',
            separatorColor: '#D9AEC8'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        return `
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="padding:${c.padTop} ${c.padLeft}px ${c.padBottom}px ${c.padRight}px;">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" style="padding-bottom:22px;">
                                    <div style="width:100%;height:1px;background-color:${c.dividerColor};font-size:0;line-height:0;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="font-family:${c.fontFamily};font-size:${c.closingLineFontSize};line-height:28px;font-weight:300;color:${c.closingLineColor};padding-bottom:18px;">
                                    ${escapeHtml(c.closingLine)}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="font-family:${c.fontFamily};font-size:${c.greetingFontSize};line-height:28px;font-weight:300;color:${c.greetingColor};padding-bottom:4px;">
                                    ${escapeHtml(c.greeting)}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="font-family:${c.fontFamily};font-size:${c.senderFontSize};line-height:22px;letter-spacing:2px;text-transform:uppercase;font-weight:600;color:${c.senderColor};padding-bottom:26px;">
                                    ${escapeHtml(c.sender)}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-bottom:20px;">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                                        <tr>
                                            <td align="left" style="background-color:${c.psBg};border-left:2px solid ${c.psBorder};padding:${c.psPadding};font-family:${c.fontFamily};font-size:${c.psFontSize};line-height:${c.psLineHeight};font-weight:300;color:${c.psFontColor};">
                                                <strong style="font-weight:600;color:${c.psLabelColor};">${escapeHtml(c.psLabel)}</strong> ${escapeHtml(c.psText)}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="font-family:${c.fontFamily};font-size:16px;line-height:22px;letter-spacing:6px;color:${c.separatorColor};">
                                    ${escapeHtml(c.separator)}
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
        createInput('Background Color', 'bgColor', 'color', c.bgColor, null, c, container);
        createInput('Padding Top/Bottom', 'padTop', 'text', c.padTop, null, c, container);
        createInput('Padding Bottom', 'padBottom', 'text', c.padBottom, null, c, container);
        createInput('Padding Left/Right', 'padLeft', 'text', c.padLeft, null, c, container);
        createInput('Divider Color', 'dividerColor', 'color', c.dividerColor, null, c, container);
        createInput('Closing Line', 'closingLine', 'textarea', c.closingLine, null, c, container);
        createInput('Closing Line Color', 'closingLineColor', 'color', c.closingLineColor, null, c, container);
        createInput('Closing Line Font Size', 'closingLineFontSize', 'text', c.closingLineFontSize, null, c, container);
        createInput('Greeting', 'greeting', 'text', c.greeting, null, c, container);
        createInput('Greeting Color', 'greetingColor', 'color', c.greetingColor, null, c, container);
        createInput('Sender Name', 'sender', 'text', c.sender, null, c, container);
        createInput('Sender Color', 'senderColor', 'color', c.senderColor, null, c, container);
        createInput('Sender Font Size', 'senderFontSize', 'text', c.senderFontSize, null, c, container);
        createInput('P.S. Label', 'psLabel', 'text', c.psLabel, null, c, container);
        createInput('P.S. Text', 'psText', 'textarea', c.psText, null, c, container);
        createInput('P.S. Background', 'psBg', 'color', c.psBg, null, c, container);
        createInput('P.S. Border', 'psBorder', 'color', c.psBorder, null, c, container);
        createInput('P.S. Padding', 'psPadding', 'text', c.psPadding, null, c, container);
        createInput('P.S. Font Color', 'psFontColor', 'color', c.psFontColor, null, c, container);
        createInput('P.S. Font Size', 'psFontSize', 'text', c.psFontSize, null, c, container);
        createInput('Separator', 'separator', 'text', c.separator, null, c, container);
    }
});
