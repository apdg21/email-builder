SectionRegistry.register('cta-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Ready to Get Started?',
            subheadline: 'Join thousands of businesses transforming their workflow.',
            buttonText: 'Start Free Trial',
            buttonLink: '#',
            buttonBackground: '#10b981',
            buttonColor: '#ffffff',
            buttonFontSize: '18px',
            buttonPadding: '14px 32px',
            showButton: true,
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            borderRadius: '12px'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        return `
            <div style="background: ${content.backgroundColor}; border: 1px solid ${content.borderColor}; border-radius: ${content.borderRadius}; padding: 60px 30px; text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 28px; color: #0f172a; margin: 0 0 20px 0;">
                    ${escapeHtml(content.title)}
                </h2>
                <p style="font-size: 16px; color: #64748b; margin: 0 0 30px 0; max-width: 500px; margin-left: auto; margin-right: auto;">
                    ${escapeHtml(content.subheadline)}
                </p>
                ${content.showButton ? `
                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                            <td style="background-color: ${content.buttonBackground}; border-radius: 8px;">
                                <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: 8px; font-weight: 600;">
                                    ${escapeHtml(content.buttonText)}
                                </a>
                            </td>
                        </tr>
                    </table>
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
        createInput('Subheadline', 'subheadline', 'textarea', 'Join thousands of businesses transforming their workflow.', null, content, contentContainer);
        
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
            createInput('Button Text', 'buttonText', 'text', 'Start Free Trial', null, content, buttonContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
            createInput('Button Background', 'buttonBackground', 'color', '#10b981', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '18px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '14px 32px', null, content, buttonContainer);
        }
        
        // Style Settings
        const styleDetails = document.createElement('details');
        styleDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        styleDetails.open = true;
        const styleSummary = document.createElement('summary');
        styleSummary.textContent = 'Style Settings';
        styleSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        styleDetails.appendChild(styleSummary);
        const styleContainer = document.createElement('div');
        styleContainer.classList.add('space-y-2');
        styleDetails.appendChild(styleContainer);
        container.appendChild(styleDetails);
        
        createInput('Background Color', 'backgroundColor', 'color', '#ffffff', null, content, styleContainer);
        createInput('Border Color', 'borderColor', 'color', '#e2e8f0', null, content, styleContainer);
        createInput('Border Radius', 'borderRadius', 'text', '12px', null, content, styleContainer);
    }
});