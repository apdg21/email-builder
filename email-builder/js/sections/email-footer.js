
// Footer — Email-derived section from "You just gained an extra hour" email
// Category: Footer
SectionRegistry.register('email-footer', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            bgColor: '#2E2A39',
            footPad: '36px 40px 34px 40px',
            logoName: 'Your Brand',
            logoSize: '18px',
            logoColor: '#FDFBF7',
            logoLetterSpacing: '5px',
            tagline: 'Modern Patterns',
            taglineColor: '#A79FB0',
            taglineFontSize: '9px',
            dividerColor: '#9B046F',
            footerLinks: [
                {label: 'Shop All', url: '#' },
                {label: 'Patterns', url: '#' },
                {label: 'New Arrivals', url: '#' },
                {label: 'Our Story', url: '#' },
                {label: 'Contact', url: '#' },
                {label: 'Instant Downloads', url: '#' }
            ],
            linkColor: '#FDFBF7',
            separatorColor: '#6B6478',
            copyright: '© 2026 Your Brand. All rights reserved.',
            copyrightColor: '#A79FB0',
            copyrightFontSize: '10px',
            unsubscribeText: 'Unsubscribe',
            unsubscribeColor: '#E9A6CF',
            preferencesText: 'Manage preferences',
            preferencesColor: '#A79FB0',
            footerFontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            footerFontSize: '10px',
            showLinks: true
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const uid = String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');
        const unsubUrl = c.unsubscribeUrl || '[*unsubscribe_link*]';
        const prefsUrl = c.preferencesUrl || '[*preferences_link*]';
        const viewUrl = c.viewInBrowserUrl || '[*view_in_browser_link*]';
        let linksHtml = '';
        if (c.showLinks !== false) {
            linksHtml = c.footerLinks.map(l => `
            <a class="footer-link" href="${l.url}" target="_blank" style="color:${c.linkColor};text-decoration:none;">${escapeHtml(l.label)}</a>
            <span style="color:${c.separatorColor};">&nbsp;&nbsp;&#8226;&nbsp;&nbsp;</span>
        `).join('');
            linksHtml = linksHtml.replace(/&nbsp;&nbsp;&#8226;&nbsp;&nbsp;$/, '');
        }

        return `
            <style>
                @media only screen and (max-width: 480px) {
                    .footer-wrap-${uid} {
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                    .footer-link {
                        display: block !important;
                    }
                    .footer-link-separator {
                        display: none !important;
                    }
                    .footer-links-row {
                        display: block !important;
                    }
                    .footer-sub-row {
                        display: block !important;
                        text-align: center !important;
                    }
                    .footer-sub-row a {
                        display: inline-block !important;
                    }
                    .small-copy {
                        font-size: 11px !important;
                    }
                    .footer-tagline-mobile {
                        font-size: 10px !important;
                    }
                    .foot-pad-mobile {
                        padding: 28px 16px 28px 16px !important;
                    }
                }
            </style>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="footer-wrap-${uid}" style="width:100%;max-width:100%;background-color:${c.bgColor};" bgcolor="${c.bgColor}">
                <tr>
                    <td align="center" class="foot-pad foot-pad-mobile" style="padding:${c.footPad};">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="center" style="padding-bottom:6px;">
                                    <a href="${c.logoUrl || '#'}" target="_blank" style="text-decoration:none;">
                                        <span style="font-family:${c.footerFontFamily};font-size:${c.logoSize};line-height:24px;letter-spacing:${c.logoLetterSpacing}px;font-weight:600;color:${c.logoColor};text-transform:uppercase;">${escapeHtml(c.logoName)}</span>
                                    </a>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-bottom:20px;font-family:${c.footerFontFamily};font-size:${c.taglineFontSize};line-height:14px;letter-spacing:3px;text-transform:uppercase;color:${c.taglineColor};font-weight:400;">
                                    ${escapeHtml(c.tagline)}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-bottom:22px;">
                                    <div style="width:40px;height:1px;background-color:${c.dividerColor};font-size:0;line-height:0;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="small-copy footer-links-row" style="padding-bottom:22px;font-family:${c.footerFontFamily};font-size:11px;line-height:18px;letter-spacing:1.8px;text-transform:uppercase;font-weight:400;">
                                    ${linksHtml}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="padding-bottom:14px;">
                                    <div style="width:100%;height:1px;background-color:#453F53;font-size:0;line-height:0;">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td align="center" style="font-family:${c.footerFontFamily};font-size:${c.copyrightFontSize};line-height:20px;font-weight:300;color:${c.copyrightColor};padding-bottom:10px;">
                                    ${escapeHtml(c.copyright)}
                                </td>
                            </tr>
                            <tr>
                                <td align="center" class="footer-sub-row" style="font-family:${c.footerFontFamily};font-size:${c.footerFontSize};line-height:20px;font-weight:300;color:${c.copyrightColor};">
                                    You&#8217;re receiving this email because you subscribed to our newsletter.<br>
                                    <a class="footer-link" href="${unsubUrl}" target="_blank" style="color:${c.unsubscribeColor};text-decoration:underline;">${escapeHtml(c.unsubscribeText)}</a>
                                    <span class="footer-link-separator" style="color:${c.separatorColor};">&nbsp;&#8226;&nbsp;</span>
                                    <a class="footer-link" href="${prefsUrl}" target="_blank" style="color:${c.preferencesColor};text-decoration:underline;">${escapeHtml(c.preferencesText)}</a>
                                    <span class="footer-link-separator" style="color:${c.separatorColor};">&nbsp;&#8226;&nbsp;</span>
                                    <a class="footer-link" href="${viewUrl}" target="_blank" style="color:${c.preferencesColor};text-decoration:underline;">View in browser</a>
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
        createInput('Padding', 'footPad', 'text', c.footPad, null, c, container);
        createInput('Logo Name', 'logoName', 'text', c.logoName, null, c, container);
        createInput('Logo URL', 'logoUrl', 'text', c.logoUrl, null, c, container);
        createInput('Logo Size', 'logoSize', 'text', c.logoSize, null, c, container);
        createInput('Logo Color', 'logoColor', 'color', c.logoColor, null, c, container);
        createInput('Logo Letter Spacing', 'logoLetterSpacing', 'text', c.logoLetterSpacing, null, c, container);
        createInput('Tagline', 'tagline', 'text', c.tagline, null, c, container);
        createInput('Tagline Color', 'taglineColor', 'color', c.taglineColor, null, c, container);
        createInput('Tagline Font Size', 'taglineFontSize', 'text', c.taglineFontSize, null, c, container);
        createInput('Divider Color', 'dividerColor', 'color', c.dividerColor, null, c, container);

        createCheckbox('Show Footer Links', 'showLinks', c, container);
        if (c.showLinks) {
            const linksGroup = document.createElement('div');
            linksGroup.className = 'mb-3';
            const linksTitle = document.createElement('div');
            linksTitle.textContent = 'Footer Links';
            linksTitle.style.fontWeight = '600';
            linksTitle.style.marginBottom = '8px';
            linksGroup.appendChild(linksTitle);

            c.footerLinks.forEach((link, i) => {
                const idx = i + 1;
                createInput(`Link ${idx} - Label`, 'label', 'text', link.label, null, link, linksGroup);
                createInput(`Link ${idx} - URL`, 'url', 'text', link.url, null, link, linksGroup);
            });

            container.appendChild(linksGroup);
        }

        createInput('Unsubscribe Text', 'unsubscribeText', 'text', c.unsubscribeText, null, c, container);
        createInput('Unsubscribe URL', 'unsubscribeUrl', 'text', c.unsubscribeUrl || '[*unsubscribe_link*]', null, c, container);
        createInput('Preferences Text', 'preferencesText', 'text', c.preferencesText, null, c, container);
        createInput('Preferences URL', 'preferencesUrl', 'text', c.preferencesUrl || '[*preferences_link*]', null, c, container);
        createInput('View in Browser URL', 'viewInBrowserUrl', 'text', c.viewInBrowserUrl || '[*view_in_browser_link*]', null, c, container);
        createInput('Copyright', 'copyright', 'text', c.copyright, null, c, container);
        createInput('Footer Font Family', 'footerFontFamily', 'select', c.footerFontFamily, [
            {value: 'Poppins, Helvetica, Arial, sans-serif', label: 'Poppins'},
            {value: 'Arial, Helvetica, sans-serif', label: 'Arial'},
            {value: "Times New Roman, Times, serif", label: 'Times New Roman'}
        ], c, container);
    }
});
