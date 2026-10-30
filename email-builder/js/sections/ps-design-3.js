SectionRegistry.register('ps-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            psLabel: 'P.S.',
            psLabelColor: '#0f172a',
            psText: 'If you have any questions or need help getting started, just reply to this email — we read every message personally.',
            psFontSize: '14px',
            psTextColor: '#374151',
            backgroundColor: '#f8fafc',
            borderColor: '#e2e8f0',
            fontFamily: 'Georgia, Times New Roman, serif',
            showSignature: true,
            signatureName: 'Sarah',
            signatureTitle: 'Customer Success',
            signatureColor: '#64748b',
            showLink: false,
            linkText: 'Reply here',
            linkUrl: 'mailto:hello@example.com',
            linkColor: '#0ea5e9',
            paddingTop: '24px',
            paddingBottom: '24px',
            textAlign: 'left'
        };
    },

    generateContent: function(section) {
        const c = section.content;

        const textWithLink = c.showLink
            ? `${escapeHtml(c.psText)} <a href="${c.linkUrl}" style="color: ${c.linkColor}; text-decoration: underline;">${escapeHtml(c.linkText)}</a>`
            : escapeHtml(c.psText);

        const signatureHtml = c.showSignature ? `
            <p style="margin: 14px 0 0 0; font-size: 13px; color: ${c.signatureColor}; font-style: italic; font-family: ${c.fontFamily};">
                — ${escapeHtml(c.signatureName)}${c.signatureTitle ? `, <span style="font-weight: normal;">${escapeHtml(c.signatureTitle)}</span>` : ''}
            </p>
        ` : '';

        return `
            <div style="background-color: ${c.backgroundColor}; border: 1px solid ${c.borderColor}; border-radius: 8px; padding: ${c.paddingTop} 28px ${c.paddingBottom}; font-family: ${c.fontFamily}; text-align: ${c.textAlign};">
                <p style="margin: 0; font-size: ${c.psFontSize}; color: ${c.psTextColor}; line-height: 1.8;">
                    <em style="color: ${c.psLabelColor}; font-weight: 700; font-size: 15px; font-style: italic;">${escapeHtml(c.psLabel)}</em>
                    &nbsp;${textWithLink}
                </p>
                ${signatureHtml}
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
        createInput('Label Color', 'psLabelColor', 'color', '#0f172a', null, content, contentContainer);
        createInput('Message', 'psText', 'textarea', 'If you have any questions, just reply to this email.', null, content, contentContainer);
        createInput('Font Size', 'psFontSize', 'text', '14px', null, content, contentContainer);
        createInput('Text Color', 'psTextColor', 'color', '#374151', null, content, contentContainer);
        createInput('Font Family', 'fontFamily', 'select', 'Georgia, Times New Roman, serif', [
            {value: 'Georgia, Times New Roman, serif', label: 'Georgia (Serif)'},
            {value: 'Arial, Helvetica, sans-serif', label: 'Arial (Sans-serif)'},
            {value: 'Verdana, Geneva, sans-serif', label: 'Verdana'},
        ], content, contentContainer);

        const styleDetails = document.createElement('details');
        styleDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        styleDetails.open = false;
        const styleSummary = document.createElement('summary');
        styleSummary.textContent = 'Style';
        styleSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        styleDetails.appendChild(styleSummary);
        const styleContainer = document.createElement('div');
        styleContainer.classList.add('space-y-2');
        styleDetails.appendChild(styleContainer);
        container.appendChild(styleDetails);

        createInput('Background Color', 'backgroundColor', 'color', '#f8fafc', null, content, styleContainer);
        createInput('Border Color', 'borderColor', 'color', '#e2e8f0', null, content, styleContainer);
        createInput('Padding Top', 'paddingTop', 'text', '24px', null, content, styleContainer);
        createInput('Padding Bottom', 'paddingBottom', 'text', '24px', null, content, styleContainer);
        createInput('Text Align', 'textAlign', 'select', 'left', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, styleContainer);

        const sigDetails = document.createElement('details');
        sigDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        sigDetails.open = true;
        const sigSummary = document.createElement('summary');
        sigSummary.textContent = 'Signature';
        sigSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        sigDetails.appendChild(sigSummary);
        const sigContainer = document.createElement('div');
        sigContainer.classList.add('space-y-2');
        sigDetails.appendChild(sigContainer);
        container.appendChild(sigDetails);

        createCheckbox('Show Signature', 'showSignature', content, sigContainer);
        if (content.showSignature) {
            createInput('Name', 'signatureName', 'text', 'Sarah', null, content, sigContainer);
            createInput('Title', 'signatureTitle', 'text', 'Customer Success', null, content, sigContainer);
            createInput('Signature Color', 'signatureColor', 'color', '#64748b', null, content, sigContainer);
        }

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
            createInput('Link Text', 'linkText', 'text', 'Reply here', null, content, linkContainer);
            createInput('Link URL', 'linkUrl', 'text', 'mailto:hello@example.com', null, content, linkContainer);
            createInput('Link Color', 'linkColor', 'color', '#0ea5e9', null, content, linkContainer);
        }
    }
});
