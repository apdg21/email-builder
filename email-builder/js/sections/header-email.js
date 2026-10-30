// Header — Email-derived section
// Source: "You just gained an extra hour" email, top header block with brand logo
// Category: Header
SectionRegistry.register('header-email', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            brandName: 'Your Brand',
            brandTagline: 'Modern Patterns',
            logoUrl: '#',
            fontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            logoSize: '26px',
            taglineSize: '9px',
            letterSpacing: '7px',
            color: '#9B046F',
            taglineColor: '#8A7F73',
            align: 'center',
            mobileLogoSize: '20px',
            mobileLetterSpacing: '3px',
            mobileTaglineSize: '8px',
            mobilePadding: '18px 16px 16px 16px'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const uid = 'hdremail_' + String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');
        const letterSpacingVal = String(c.letterSpacing || '7').replace('px', '');
        return `
            <style>
                @media only screen and (max-width: 480px) {
                    .hdr-pad-${uid} {
                        padding: ${c.mobilePadding || '18px 16px 16px 16px'} !important;
                    }
                    .hdr-logo-${uid} {
                        font-size: ${c.mobileLogoSize || '20px'} !important;
                        line-height: 26px !important;
                        letter-spacing: ${c.mobileLetterSpacing || '3px'} !important;
                    }
                    .hdr-tag-${uid} {
                        font-size: ${c.mobileTaglineSize || '8px'} !important;
                        letter-spacing: 2px !important;
                        line-height: 12px !important;
                    }
                }
            </style>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="${c.align}" class="pad hdr-pad-${uid}" style="padding:26px 30px 22px 30px;border-bottom:1px solid #E7DFD2;">
                        <a href="${c.logoUrl}" target="_blank" style="text-decoration:none;">
                            <span class="hdr-logo-${uid}" style="font-family:${c.fontFamily};font-size:${c.logoSize};line-height:32px;letter-spacing:${letterSpacingVal}px;font-weight:600;color:${c.color};text-transform:uppercase;display:inline-block;">${escapeHtml(c.brandName)}</span>
                        </a>
                        <div class="hdr-tag-${uid}" style="font-family:${c.fontFamily};font-size:${c.taglineSize};line-height:14px;letter-spacing:3.4px;text-transform:uppercase;color:${c.taglineColor};font-weight:400;padding-top:8px;">${escapeHtml(c.brandTagline)}</div>
                    </td>
                </tr>
            </table>
        `;
    },

    showProperties: function(section, container) {
        const c = section.content;
        createInput('Brand Name', 'brandName', 'text', c.brandName, null, c, container);
        createInput('Brand Tagline', 'brandTagline', 'text', c.brandTagline, null, c, container);
        createInput('Logo URL', 'logoUrl', 'text', c.logoUrl, null, c, container);
        createInput('Logo Size', 'logoSize', 'text', c.logoSize, null, c, container);
        createInput('Tagline Size', 'taglineSize', 'text', c.taglineSize, null, c, container);
        createInput('Letter Spacing', 'letterSpacing', 'text', c.letterSpacing, null, c, container);
        createInput('Font Family', 'fontFamily', 'select', c.fontFamily, [
            {value: 'Poppins, Helvetica, Arial, sans-serif', label: 'Poppins'},
            {value: 'Arial, Helvetica, sans-serif', label: 'Arial'},
            {value: "Times New Roman, Times, serif", label: 'Times New Roman'},
            {value: 'Georgia, serif', label: 'Georgia'},
            {value: 'Verdana, Geneva, sans-serif', label: 'Verdana'}
        ], c, container);
        createInput('Color', 'color', 'color', c.color, null, c, container);
        createInput('Tagline Color', 'taglineColor', 'color', c.taglineColor, null, c, container);
        createInput('Text Align', 'align', 'select', c.align, [
            {value: 'center', label: 'Center'},
            {value: 'left', label: 'Left'},
            {value: 'right', label: 'Right'}
        ], c, container);

        const mobDetails = document.createElement('details');
        mobDetails.classList.add('mt-3', 'border', 'rounded', 'p-2');
        const mobSummary = document.createElement('summary');
        mobSummary.textContent = 'Mobile Settings';
        mobSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        mobDetails.appendChild(mobSummary);
        const mobContainer = document.createElement('div');
        mobContainer.classList.add('space-y-2');
        mobDetails.appendChild(mobContainer);
        container.appendChild(mobDetails);

        createInput('Mobile Logo Size', 'mobileLogoSize', 'text', c.mobileLogoSize || '20px', null, c, mobContainer);
        createInput('Mobile Letter Spacing', 'mobileLetterSpacing', 'text', c.mobileLetterSpacing || '3px', null, c, mobContainer);
        createInput('Mobile Tagline Size', 'mobileTaglineSize', 'text', c.mobileTaglineSize || '8px', null, c, mobContainer);
        createInput('Mobile Padding', 'mobilePadding', 'text', c.mobilePadding || '18px 16px 16px 16px', null, c, mobContainer);
    }
});
