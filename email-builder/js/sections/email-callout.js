
// Callout / Pull Quote — Email-derived section from "You just gained an extra hour" email
// Category: Content Blocks
SectionRegistry.register('email-callout', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            bgColor: '#F5F2EB',
            borderColor: '#E7DFD2',
            topBorder: '#9B046F',
            title: 'November Campaign Update',
            titleColor: '#9B046F',
            titleFontSize: '10px',
            quote: 'An extra hour for creativity is a gentle reminder to slow down, enjoy the process, and cherish every single moment.',
            quoteColor: '#2E2A39',
            quoteFontSize: '19px',
            quoteLineHeight: '32px',
            bodyCopy: 'Explore our instant digital template library and start your next project today.',
            bodyCopyColor: '#4A4453',
            bodyCopyFontSize: '14px',
            buttonText: 'Explore New Collection',
            buttonLink: '#',
            buttonBg: '#9B046F',
            buttonColor: '#FDFBF7',
            buttonFontSize: '12px',
            footerText: 'Instant downloads available  •  Start your project today',
            fontFamily: 'Poppins, Helvetica, Arial, sans-serif'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        return `
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="center" style="padding:44px 44px 44px 44px;background-color:${c.bgColor};" bgcolor="${c.bgColor}">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;background-color:#FDFBF7;border:1px solid ${c.borderColor};border-top:3px solid ${c.topBorder};" bgcolor="#FDFBF7">
                            <tr>
                                <td align="center" class="pad" style="padding:34px 34px 36px 34px;">
                                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                        <tr>
                                            <td align="center" style="padding-bottom:16px;font-family:${c.fontFamily};font-size:${c.titleFontSize};line-height:15px;letter-spacing:3px;text-transform:uppercase;color:${c.titleColor};font-weight:600;">
                                                ${escapeHtml(c.title)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-family:${c.fontFamily};font-size:${c.quoteFontSize};line-height:${c.quoteLineHeight};font-weight:400;font-style:italic;color:${c.quoteColor};padding:0 6px 20px 6px;">
                                                ${escapeHtml(c.quote)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding-bottom:18px;">
                                                <div style="width:36px;height:1px;background-color:#D9AEC8;font-size:0;line-height:0;">&nbsp;</div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="font-family:${c.fontFamily};font-size:${c.bodyCopyFontSize};line-height:25px;font-weight:300;color:${c.bodyCopyColor};padding-bottom:26px;">
                                                ${escapeHtml(c.bodyCopy)}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center">
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                                                    <tr>
                                                        <td align="center" bgcolor="${c.buttonBg}" style="background-color:${c.buttonBg};border-radius:3px;padding:16px 36px;box-shadow:0 6px 16px rgba(155,4,111,0.22);transition:all 0.2s ease;">
                                                            <a href="${c.buttonLink}" target="_blank" style="font-family:${c.fontFamily};font-size:${c.buttonFontSize};line-height:18px;letter-spacing:2.4px;text-transform:uppercase;font-weight:600;color:${c.buttonColor};text-decoration:none;display:inline-block;">&#8594;&nbsp; ${escapeHtml(c.buttonText)}</a>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td align="center" style="padding-top:16px;font-family:${c.fontFamily};font-size:10px;line-height:16px;letter-spacing:1.6px;text-transform:uppercase;color:#8A7F73;font-weight:400;">
                                                ${escapeHtml(c.footerText)}
                                            </td>
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
        createInput('Background Color', 'bgColor', 'color', c.bgColor, null, c, container);
        createInput('Border Color', 'borderColor', 'color', c.borderColor, null, c, container);
        createInput('Top Border Color', 'topBorder', 'color', c.topBorder, null, c, container);
        createInput('Title', 'title', 'text', c.title, null, c, container);
        createInput('Title Color', 'titleColor', 'color', c.titleColor, null, c, container);
        createInput('Title Font Size', 'titleFontSize', 'text', c.titleFontSize, null, c, container);
        createInput('Pull Quote', 'quote', 'textarea', c.quote, null, c, container);
        createInput('Quote Color', 'quoteColor', 'color', c.quoteColor, null, c, container);
        createInput('Quote Font Size', 'quoteFontSize', 'text', c.quoteFontSize, null, c, container);
        createInput('Body Copy', 'bodyCopy', 'textarea', c.bodyCopy, null, c, container);
        createInput('Body Copy Color', 'bodyCopyColor', 'color', c.bodyCopyColor, null, c, container);
        createInput('Body Copy Font Size', 'bodyCopyFontSize', 'text', c.bodyCopyFontSize, null, c, container);
        createInput('Button Text', 'buttonText', 'text', c.buttonText, null, c, container);
        createInput('Button Link', 'buttonLink', 'text', c.buttonLink, null, c, container);
        createInput('Button Background', 'buttonBg', 'color', c.buttonBg, null, c, container);
        createInput('Button Color', 'buttonColor', 'color', c.buttonColor, null, c, container);
        createInput('Button Font Size', 'buttonFontSize', 'text', c.buttonFontSize, null, c, container);
        createInput('Footer Text', 'footerText', 'text', c.footerText, null, c, container);
    }
});
