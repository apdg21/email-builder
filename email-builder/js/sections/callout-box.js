SectionRegistry.register('callout-box', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'How to Claim Your 20% Savings',
            titleFontSize: '17px',
            titleColor: '#3A2E27',
            titleFontFamily: 'Georgia, serif',
            text: 'Simply add your favorite lap or throw PDF patterns to your cart and enter code <strong style="color: #C97C5D;">SCHOOL20</strong> at checkout.<br><br>Your pattern will be delivered instantly to your inbox as a digital download so you can print, cut, and start stitching right away!',
            fontSize: '15px',
            textColor: '#4A3E35',
            lineHeight: '1.6',
            backgroundColor: '#DFDACC',
            borderColor: '#BDC4A3',
            borderWidth: '3px',
            borderRadius: '6px',
            paddingTop: '22px',
            paddingBottom: '22px',
            paddingLeft: '26px',
            paddingRight: '26px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            textAlign: 'left'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        return `
            <div style="padding: 10px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${c.backgroundColor}; border-left: ${c.borderWidth} solid ${c.borderColor}; border-radius: ${c.borderRadius}; overflow: hidden;">
                    <tr>
                        <td style="padding: ${c.paddingTop} ${c.paddingRight} ${c.paddingBottom} ${c.paddingLeft}; font-family: ${c.fontFamily}; text-align: ${c.textAlign};">
                            ${c.title ? `<h4 style="margin: 0 0 10px 0; font-family: ${c.titleFontFamily || 'Georgia, serif'}; font-size: ${c.titleFontSize}; font-weight: 700; color: ${c.titleColor}; line-height: 1.3;">${escapeHtml(c.title)}</h4>` : ''}
                            <div style="margin: 0; font-size: ${c.fontSize}; color: ${c.textColor}; line-height: ${c.lineHeight};">
                                ${c.text}
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        // Content
        const contentDetails = document.createElement('details');
        contentDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        contentDetails.open = true;
        const contentSummary = document.createElement('summary');
        contentSummary.textContent = 'Callout Content';
        contentSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        contentDetails.appendChild(contentSummary);
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('space-y-2');
        contentDetails.appendChild(contentContainer);
        container.appendChild(contentDetails);

        createInput('Box Title', 'title', 'text', 'How to Claim Your 20% Savings', null, content, contentContainer);
        createInput('Title Font Size', 'titleFontSize', 'text', '17px', null, content, contentContainer);
        createInput('Title Color', 'titleColor', 'color', '#3A2E27', null, content, contentContainer);
        createInput('Message / Body HTML', 'text', 'textarea', '', null, content, contentContainer);
        createInput('Font Size', 'fontSize', 'text', '15px', null, content, contentContainer);
        createInput('Text Color', 'textColor', 'color', '#4A3E35', null, content, contentContainer);

        // Styling
        const styleDetails = document.createElement('details');
        styleDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        styleDetails.open = true;
        const styleSummary = document.createElement('summary');
        styleSummary.textContent = 'Card & Border Style';
        styleSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        styleDetails.appendChild(styleSummary);
        const styleContainer = document.createElement('div');
        styleContainer.classList.add('space-y-2');
        styleDetails.appendChild(styleContainer);
        container.appendChild(styleDetails);

        createInput('Background Color', 'backgroundColor', 'color', '#DFDACC', null, content, styleContainer);
        createInput('Accent Border Color', 'borderColor', 'color', '#BDC4A3', null, content, styleContainer);
        createInput('Accent Border Width', 'borderWidth', 'text', '3px', null, content, styleContainer);
        createInput('Border Radius', 'borderRadius', 'text', '6px', null, content, styleContainer);
        createInput('Padding Top/Bottom', 'paddingTop', 'text', '22px', null, content, styleContainer);
        createInput('Padding Left/Right', 'paddingLeft', 'text', '26px', null, content, styleContainer);
    }
});
