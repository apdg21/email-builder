SectionRegistry.register('announcement-bar-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            preText: 'NEW',
            preTextColor: '#ffffff',
            preBackground: '#7c3aed',
            message: 'Introducing our new collection — discover what\'s fresh this season.',
            messageFontSize: '14px',
            messageColor: '#ffffff',
            gradientStart: '#6d28d9',
            gradientEnd: '#4f46e5',
            showDismiss: false,
            showLink: true,
            linkText: 'Explore →',
            linkUrl: '#',
            linkColor: '#c4b5fd',
            fontFamily: 'Arial, Helvetica, sans-serif'
        };
    },

    generateContent: function(section) {
        const c = section.content;

        const preHtml = `<span style="display: inline-block; background: ${c.preBackground}; color: ${c.preTextColor}; font-size: 10px; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 9px; border-radius: 3px; margin-right: 14px; vertical-align: middle;">${escapeHtml(c.preText)}</span>`;

        const linkHtml = c.showLink
            ? `<a href="${c.linkUrl}" style="color: ${c.linkColor}; text-decoration: none; font-weight: 700; margin-left: 10px; vertical-align: middle; white-space: nowrap;">${escapeHtml(c.linkText)}</a>`
            : '';

        return `
            <div style="background: linear-gradient(135deg, ${c.gradientStart} 0%, ${c.gradientEnd} 100%); padding: 13px 24px; text-align: center; font-family: ${c.fontFamily};">
                <p style="margin: 0; font-size: ${c.messageFontSize}; color: ${c.messageColor}; line-height: 1.6;">
                    ${preHtml}
                    ${escapeHtml(c.message)}
                    ${linkHtml}
                </p>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        const preDetails = document.createElement('details');
        preDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        preDetails.open = true;
        const preSummary = document.createElement('summary');
        preSummary.textContent = 'Label Badge';
        preSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        preDetails.appendChild(preSummary);
        const preContainer = document.createElement('div');
        preContainer.classList.add('space-y-2');
        preDetails.appendChild(preContainer);
        container.appendChild(preDetails);

        createInput('Label Text', 'preText', 'text', 'NEW', null, content, preContainer);
        createInput('Label Background', 'preBackground', 'color', '#7c3aed', null, content, preContainer);
        createInput('Label Text Color', 'preTextColor', 'color', '#ffffff', null, content, preContainer);

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

        createInput('Message Text', 'message', 'textarea', 'Introducing our new collection — discover what\'s fresh this season.', null, content, msgContainer);
        createInput('Font Size', 'messageFontSize', 'text', '14px', null, content, msgContainer);
        createInput('Message Color', 'messageColor', 'color', '#ffffff', null, content, msgContainer);
        createInput('Gradient Start', 'gradientStart', 'color', '#6d28d9', null, content, msgContainer);
        createInput('Gradient End', 'gradientEnd', 'color', '#4f46e5', null, content, msgContainer);

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
            createInput('Link Text', 'linkText', 'text', 'Explore →', null, content, linkContainer);
            createInput('Link URL', 'linkUrl', 'text', '#', null, content, linkContainer);
            createInput('Link Color', 'linkColor', 'color', '#c4b5fd', null, content, linkContainer);
        }
    }
});
