
// P.S. Section — Email-derived section from "You just gained an extra hour" email
// Category: P.S. Section
SectionRegistry.register('email-ps', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            bgColor: '#F5F2EB',
            padTop: '20px',
            padBottom: '20px',
            padLeft: '24px',
            padRight: '24px',
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
            showLink: false,
            linkText: 'Click here',
            linkUrl: '#',
            linkColor: '#3b82f6',
            textAlign: 'left'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const textWithLink = c.showLink
            ? `${escapeHtml(c.psText)} <a href="${c.linkUrl}" style="color: ${c.linkColor}; text-decoration: underline;">${escapeHtml(c.linkText)}</a>`
            : escapeHtml(c.psText);
        return `
            <div style="background-color:${c.bgColor};padding:${c.padTop} ${c.padLeft}px ${c.padBottom}px ${c.padRight}px;font-family:${c.fontFamily};text-align:${c.textAlign};">
                <p style="margin:0;font-size:${c.psFontSize};color:${c.psFontColor};line-height:${c.psLineHeight};">
                    <strong style="color:${c.psLabelColor};font-style:italic;">${escapeHtml(c.psLabel)}</strong> ${textWithLink}
                </p>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const c = section.content;
        createInput('Background Color', 'bgColor', 'color', c.bgColor, null, c, container);
        createInput('Padding Top/Bottom', 'padTop', 'text', c.padTop, null, c, container);
        createInput('Padding Bottom', 'padBottom', 'text', c.padBottom, null, c, container);
        createInput('Padding Left/Right', 'padLeft', 'text', c.padLeft, null, c, container);
        createInput('Text Align', 'textAlign', 'select', c.textAlign, [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], c, container);
        createInput('P.S. Label', 'psLabel', 'text', c.psLabel, null, c, container);
        createInput('P.S. Text', 'psText', 'textarea', c.psText, null, c, container);
        createInput('P.S. Font Color', 'psFontColor', 'color', c.psFontColor, null, c, container);
        createInput('P.S. Font Size', 'psFontSize', 'text', c.psFontSize, null, c, container);
        createInput('P.S. Line Height', 'psLineHeight', 'text', c.psLineHeight, null, c, container);
        createCheckbox('Add Link', 'showLink', c, container);
        if (c.showLink) {
            createInput('Link Text', 'linkText', 'text', c.linkText, null, c, container);
            createInput('Link URL', 'linkUrl', 'text', c.linkUrl, null, c, container);
            createInput('Link Color', 'linkColor', 'color', c.linkColor, null, c, container);
        }
    }
});
