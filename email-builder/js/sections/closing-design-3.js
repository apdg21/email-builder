SectionRegistry.register('closing-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Ready to Get Started?',
            subheadline: 'Join thousands of businesses that trust us with their success.',
            showButton: true,
            buttonText: 'Schedule a Demo',
            buttonLink: '#',
            buttonBackground: '#3b82f6',
            buttonColor: '#ffffff',
            buttonFontSize: '16px',
            buttonPadding: '12px 32px',
            buttonBorderRadius: '8px',
            showTrustBadge: true,
            trustBadgeText: '✓ Trusted by 500+ companies',
            trustBadgeColor: '#10b981',
            backgroundColor: '#f8fafc',
            textAlign: 'center'
        };
    },

    generateContent: function(section) {
        const content = section.content;

        return `
            <div style="text-align: center; padding: 50px 20px; background-color: ${content.backgroundColor};">
                <h2 style="font-size: 28px; color: #0f172a; margin: 0 0 15px 0; font-weight: 700;">
                    ${escapeHtml(content.title)}
                </h2>
                <p style="font-size: 16px; color: #64748b; margin: 0 0 25px 0; max-width: 500px; margin-left: auto; margin-right: auto;">
                    ${escapeHtml(content.subheadline)}
                </p>
                ${content.showButton ? `
                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 15px;">
                        <tr>
                            <td style="background-color: ${content.buttonBackground}; border-radius: ${content.buttonBorderRadius};">
                                <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: ${content.buttonBorderRadius}; font-weight: 600;">
                                    ${escapeHtml(content.buttonText)}
                                </a>
                            </td>
                        </tr>
                    </table>
                ` : ''}
                ${content.showTrustBadge ? `
                    <p style="font-size: 14px; color: ${content.trustBadgeColor}; margin: 0;">
                        ${escapeHtml(content.trustBadgeText)}
                    </p>
                ` : ''}
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        // Content Settings
        const contentDetails = document.createElement('details');
        contentDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        contentDetails.open = true;
        const contentSummary = document.createElement('summary');
        contentSummary.textContent = 'Content Settings';
        contentSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        contentDetails.appendChild(contentSummary);
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('space-y-2');
        contentDetails.appendChild(contentContainer);
        container.appendChild(contentDetails);

        createInput('Title', 'title', 'text', 'Ready to Get Started?', null, content, contentContainer);
        createInput('Subheadline', 'subheadline', 'textarea', 'Join thousands of businesses that trust us with their success.', null, content, contentContainer);
        createInput('Background Color', 'backgroundColor', 'color', '#f8fafc', null, content, contentContainer);

        // Button Settings
        const buttonDetails = document.createElement('details');
        buttonDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        buttonDetails.open = true;
        const buttonSummary = document.createElement('summary');
        buttonSummary.textContent = 'Button Settings';
        buttonSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        buttonDetails.appendChild(buttonSummary);
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('space-y-2');
        buttonDetails.appendChild(buttonContainer);
        container.appendChild(buttonDetails);

        createCheckbox('Show Button', 'showButton', content, buttonContainer);
        if (content.showButton) {
            createInput('Button Text', 'buttonText', 'text', 'Schedule a Demo', null, content, buttonContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
            createInput('Button Background', 'buttonBackground', 'color', '#3b82f6', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '16px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '12px 32px', null, content, buttonContainer);
            createInput('Button Border Radius', 'buttonBorderRadius', 'text', '8px', null, content, buttonContainer);
        }

        // Trust Badge Settings
        const badgeDetails = document.createElement('details');
        badgeDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        badgeDetails.open = true;
        const badgeSummary = document.createElement('summary');
        badgeSummary.textContent = 'Trust Badge Settings';
        badgeSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        badgeDetails.appendChild(badgeSummary);
        const badgeContainer = document.createElement('div');
        badgeContainer.classList.add('space-y-2');
        badgeDetails.appendChild(badgeContainer);
        container.appendChild(badgeDetails);

        createCheckbox('Show Trust Badge', 'showTrustBadge', content, badgeContainer);
        if (content.showTrustBadge) {
            createInput('Badge Text', 'trustBadgeText', 'text', '✓ Trusted by 500+ companies', null, content, badgeContainer);
            createInput('Badge Color', 'trustBadgeColor', 'color', '#10b981', null, content, badgeContainer);
        }
    }
});