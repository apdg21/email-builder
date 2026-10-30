SectionRegistry.register('announcement-bar-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            message: '🎉 Free shipping on all orders over $50 — Shop now!',
            messageFontSize: '14px',
            messageColor: '#ffffff',
            backgroundColor: '#1e40af',
            showLink: true,
            linkText: 'Shop Now →',
            linkUrl: '#',
            linkColor: '#bfdbfe',
            paddingTop: '12px',
            paddingBottom: '12px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            textAlign: 'center'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        return `
            <div style="background-color: ${c.backgroundColor}; padding: ${c.paddingTop} 20px ${c.paddingBottom}; text-align: ${c.textAlign}; font-family: ${c.fontFamily};">
                <p style="margin: 0; font-size: ${c.messageFontSize}; color: ${c.messageColor}; line-height: 1.5;">
                    ${escapeHtml(c.message)}
                    ${c.showLink ? `<a href="${c.linkUrl}" style="color: ${c.linkColor}; text-decoration: underline; margin-left: 8px; font-weight: 600; white-space: nowrap;">${escapeHtml(c.linkText)}</a>` : ''}
                </p>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        const msgDetails = document.createElement('details');
        msgDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        msgDetails.open = true;
        const msgSummary = document.createElement('summary');
        msgSummary.textContent = 'Message';
        msgSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        msgDetails.appendChild(msgSummary);
        const msgContainer = document.createElement('div');
        msgContainer.classList.add('space-y-2');
        msgDetails.appendChild(msgContainer);
        container.appendChild(msgDetails);

        createInput('Message Text', 'message', 'textarea', '🎉 Free shipping on all orders over $50 — Shop now!', null, content, msgContainer);
        createInput('Font Size', 'messageFontSize', 'text', '14px', null, content, msgContainer);
        createInput('Text Color', 'messageColor', 'color', '#ffffff', null, content, msgContainer);
        createInput('Background Color', 'backgroundColor', 'color', '#1e40af', null, content, msgContainer);
        createInput('Padding Top', 'paddingTop', 'text', '12px', null, content, msgContainer);
        createInput('Padding Bottom', 'paddingBottom', 'text', '12px', null, content, msgContainer);

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

        createCheckbox('Show Link', 'showLink', content, linkContainer);
        if (content.showLink) {
            createInput('Link Text', 'linkText', 'text', 'Shop Now →', null, content, linkContainer);
            createInput('Link URL', 'linkUrl', 'text', '#', null, content, linkContainer);
            createInput('Link Color', 'linkColor', 'color', '#bfdbfe', null, content, linkContainer);
        }
    }
});
