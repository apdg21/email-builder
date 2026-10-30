SectionRegistry.register('ps-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            psLabel: 'P.S.',
            psLabelColor: '#7c3aed',
            psText: 'This is your last chance to lock in our founding member rate. After this week, the price goes up — permanently.',
            psFontSize: '14px',
            psTextColor: '#374151',
            backgroundColor: '#faf5ff',
            borderColor: '#7c3aed',
            borderWidth: '3px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            showLink: true,
            linkText: 'Join now',
            linkUrl: '#',
            linkColor: '#7c3aed',
            paddingTop: '20px',
            paddingBottom: '20px',
            textAlign: 'left'
        };
    },

    generateContent: function(section) {
        const c = section.content;

        const textWithLink = c.showLink
            ? `${escapeHtml(c.psText)} <a href="${c.linkUrl}" style="color: ${c.linkColor}; text-decoration: underline; font-weight: 600;">${escapeHtml(c.linkText)}</a>`
            : escapeHtml(c.psText);

        return `
            <div style="background-color: ${c.backgroundColor}; border-left: ${c.borderWidth} solid ${c.borderColor}; padding: ${c.paddingTop} 20px ${c.paddingBottom} 24px; font-family: ${c.fontFamily}; text-align: ${c.textAlign};">
                <p style="margin: 0; font-size: ${c.psFontSize}; color: ${c.psTextColor}; line-height: 1.7;">
                    <strong style="color: ${c.psLabelColor}; font-style: italic; font-size: 15px;">${escapeHtml(c.psLabel)}</strong>
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
        createInput('Label Color', 'psLabelColor', 'color', '#7c3aed', null, content, contentContainer);
        createInput('Message', 'psText', 'textarea', 'This is your last chance to lock in our founding member rate.', null, content, contentContainer);
        createInput('Font Size', 'psFontSize', 'text', '14px', null, content, contentContainer);
        createInput('Text Color', 'psTextColor', 'color', '#374151', null, content, contentContainer);

        const styleDetails = document.createElement('details');
        styleDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        styleDetails.open = true;
        const styleSummary = document.createElement('summary');
        styleSummary.textContent = 'Style';
        styleSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        styleDetails.appendChild(styleSummary);
        const styleContainer = document.createElement('div');
        styleContainer.classList.add('space-y-2');
        styleDetails.appendChild(styleContainer);
        container.appendChild(styleDetails);

        createInput('Background Color', 'backgroundColor', 'color', '#faf5ff', null, content, styleContainer);
        createInput('Border Color', 'borderColor', 'color', '#7c3aed', null, content, styleContainer);
        createInput('Border Width', 'borderWidth', 'text', '3px', null, content, styleContainer);
        createInput('Padding Top', 'paddingTop', 'text', '20px', null, content, styleContainer);
        createInput('Padding Bottom', 'paddingBottom', 'text', '20px', null, content, styleContainer);
        createInput('Text Align', 'textAlign', 'select', 'left', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, styleContainer);

        const linkDetails = document.createElement('details');
        linkDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        linkDetails.open = true;
        const linkSummary = document.createElement('summary');
        linkSummary.textContent = 'CTA Link';
        linkSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        linkDetails.appendChild(linkSummary);
        const linkContainer = document.createElement('div');
        linkContainer.classList.add('space-y-2');
        linkDetails.appendChild(linkContainer);
        container.appendChild(linkDetails);

        createCheckbox('Add Link', 'showLink', content, linkContainer);
        if (content.showLink) {
            createInput('Link Text', 'linkText', 'text', 'Join now', null, content, linkContainer);
            createInput('Link URL', 'linkUrl', 'text', '#', null, content, linkContainer);
            createInput('Link Color', 'linkColor', 'color', '#7c3aed', null, content, linkContainer);
        }
    }
});
