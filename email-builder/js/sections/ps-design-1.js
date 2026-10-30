SectionRegistry.register('ps-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            psLabel: 'P.S.',
            psLabelColor: '#1e293b',
            psText: 'Don\'t forget — this offer expires at midnight. Once it\'s gone, it\'s gone for good.',
            psFontSize: '14px',
            psTextColor: '#475569',
            backgroundColor: '#ffffff',
            fontFamily: 'Arial, Helvetica, sans-serif',
            showLink: false,
            linkText: 'Click here',
            linkUrl: '#',
            linkColor: '#3b82f6',
            paddingTop: '20px',
            paddingBottom: '20px',
            textAlign: 'left'
        };
    },

    generateContent: function(section) {
        const c = section.content;

        const textWithLink = c.showLink
            ? `${escapeHtml(c.psText)} <a href="${c.linkUrl}" style="color: ${c.linkColor}; text-decoration: underline;">${escapeHtml(c.linkText)}</a>`
            : escapeHtml(c.psText);

        return `
            <div style="background-color: ${c.backgroundColor}; padding: ${c.paddingTop} 24px ${c.paddingBottom}; font-family: ${c.fontFamily}; text-align: ${c.textAlign};">
                <p style="margin: 0; font-size: ${c.psFontSize}; color: ${c.psTextColor}; line-height: 1.7;">
                    <strong style="color: ${c.psLabelColor}; font-style: italic;">${escapeHtml(c.psLabel)}</strong>
                    &nbsp;${textWithLink}
                </p>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        const contentDetails = document.createElement('details');
        contentDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        contentDetails.open = true;
        const contentSummary = document.createElement('summary');
        contentSummary.textContent = 'P.S. Content';
        contentSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        contentDetails.appendChild(contentSummary);
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('space-y-2');
        contentDetails.appendChild(contentContainer);
        container.appendChild(contentDetails);

        createInput('P.S. Label', 'psLabel', 'text', 'P.S.', null, content, contentContainer);
        createInput('Label Color', 'psLabelColor', 'color', '#1e293b', null, content, contentContainer);
        createInput('Message', 'psText', 'textarea', 'Don\'t forget — this offer expires at midnight.', null, content, contentContainer);
        createInput('Font Size', 'psFontSize', 'text', '14px', null, content, contentContainer);
        createInput('Text Color', 'psTextColor', 'color', '#475569', null, content, contentContainer);
        createInput('Background Color', 'backgroundColor', 'color', '#ffffff', null, content, contentContainer);
        createInput('Padding Top', 'paddingTop', 'text', '20px', null, content, contentContainer);
        createInput('Padding Bottom', 'paddingBottom', 'text', '20px', null, content, contentContainer);
        createInput('Text Align', 'textAlign', 'select', 'left', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, contentContainer);

        const linkDetails = document.createElement('details');
        linkDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        linkDetails.open = false;
        const linkSummary = document.createElement('summary');
        linkSummary.textContent = 'Optional Link';
        linkSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        linkDetails.appendChild(linkSummary);
        const linkContainer = document.createElement('div');
        linkContainer.classList.add('space-y-2');
        linkDetails.appendChild(linkContainer);
        container.appendChild(linkDetails);

        createCheckbox('Add Link', 'showLink', content, linkContainer);
        if (content.showLink) {
            createInput('Link Text', 'linkText', 'text', 'Click here', null, content, linkContainer);
            createInput('Link URL', 'linkUrl', 'text', '#', null, content, linkContainer);
            createInput('Link Color', 'linkColor', 'color', '#3b82f6', null, content, linkContainer);
        }
    }
});
