SectionRegistry.register('announcement-bar-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            badgeText: '🔥 LIMITED TIME',
            badgeBackground: '#fbbf24',
            badgeColor: '#1c1917',
            message: 'Use code SAVE20 at checkout for 20% off your entire order.',
            messageFontSize: '14px',
            messageColor: '#fef3c7',
            backgroundColor: '#1c1917',
            showButton: true,
            buttonText: 'Claim Offer',
            buttonUrl: '#',
            buttonBackground: '#f59e0b',
            buttonColor: '#1c1917',
            fontFamily: 'Arial, Helvetica, sans-serif'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const badgeHtml = `<span style="display: inline-block; background: ${c.badgeBackground}; color: ${c.badgeColor}; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; margin-right: 12px; vertical-align: middle; white-space: nowrap;">${escapeHtml(c.badgeText)}</span>`;

        const buttonHtml = c.showButton
            ? `<table cellpadding="0" cellspacing="0" border="0" align="center" style="display: inline-table; margin-left: 16px; vertical-align: middle;">
                <tr>
                    <td style="background-color: ${c.buttonBackground}; border-radius: 4px;">
                        <a href="${c.buttonUrl}" style="display: inline-block; padding: 6px 16px; font-size: 12px; font-weight: 700; color: ${c.buttonColor}; text-decoration: none; border-radius: 4px; white-space: nowrap;">${escapeHtml(c.buttonText)}</a>
                    </td>
                </tr>
            </table>`
            : '';

        return `
            <div style="background-color: ${c.backgroundColor}; padding: 10px 20px; text-align: center; font-family: ${c.fontFamily};">
                <p style="margin: 0; font-size: ${c.messageFontSize}; color: ${c.messageColor}; line-height: 2;">
                    ${badgeHtml}
                    ${escapeHtml(c.message)}
                    ${buttonHtml}
                </p>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        const badgeDetails = document.createElement('details');
        badgeDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        badgeDetails.open = true;
        const badgeSummary = document.createElement('summary');
        badgeSummary.textContent = 'Badge';
        badgeSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        badgeDetails.appendChild(badgeSummary);
        const badgeContainer = document.createElement('div');
        badgeContainer.classList.add('space-y-2');
        badgeDetails.appendChild(badgeContainer);
        container.appendChild(badgeDetails);

        createInput('Badge Text', 'badgeText', 'text', '🔥 LIMITED TIME', null, content, badgeContainer);
        createInput('Badge Background', 'badgeBackground', 'color', '#fbbf24', null, content, badgeContainer);
        createInput('Badge Text Color', 'badgeColor', 'color', '#1c1917', null, content, badgeContainer);

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

        createInput('Message Text', 'message', 'textarea', 'Use code SAVE20 at checkout for 20% off your entire order.', null, content, msgContainer);
        createInput('Font Size', 'messageFontSize', 'text', '14px', null, content, msgContainer);
        createInput('Message Color', 'messageColor', 'color', '#fef3c7', null, content, msgContainer);
        createInput('Background Color', 'backgroundColor', 'color', '#1c1917', null, content, msgContainer);

        const btnDetails = document.createElement('details');
        btnDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        btnDetails.open = true;
        const btnSummary = document.createElement('summary');
        btnSummary.textContent = 'Button';
        btnSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        btnDetails.appendChild(btnSummary);
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('space-y-2');
        btnDetails.appendChild(btnContainer);
        container.appendChild(btnDetails);

        createCheckbox('Show Button', 'showButton', content, btnContainer);
        if (content.showButton) {
            createInput('Button Text', 'buttonText', 'text', 'Claim Offer', null, content, btnContainer);
            createInput('Button URL', 'buttonUrl', 'text', '#', null, content, btnContainer);
            createInput('Button Background', 'buttonBackground', 'color', '#f59e0b', null, content, btnContainer);
            createInput('Button Text Color', 'buttonColor', 'color', '#1c1917', null, content, btnContainer);
        }
    }
});
