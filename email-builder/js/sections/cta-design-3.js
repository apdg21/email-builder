SectionRegistry.register('cta-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Not Ready Yet?',
            subheadline: 'That\'s okay! We\'ll be here when you are.',
            buttonText: 'Watch Demo',
            buttonLink: '#',
            buttonBackground: 'rgba(96, 165, 250, 0.2)',
            buttonColor: '#60a5fa',
            buttonFontSize: '15px',
            buttonPadding: '10px 22px',
            showButton: true,
            backgroundColor: '#f8fafc',
            borderColor: '#cbd5e1',
            borderRadius: '12px'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        return `
            <div style="background: ${content.backgroundColor}; border: 1px solid ${content.borderColor}; border-radius: ${content.borderRadius}; padding: 50px 30px; text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 24px; color: #475569; margin: 0 0 15px 0; font-weight: 500;">
                    ${escapeHtml(content.title)}
                </h2>
                <p style="font-size: 16px; color: #64748b; margin: 0 0 25px 0; max-width: 500px; margin-left: auto; margin-right: auto;">
                    ${escapeHtml(content.subheadline)}
                </p>
                ${content.showButton ? `
                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                            <td style="background-color: ${content.buttonBackground}; border-radius: 50px;">
                                <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: 50px; font-weight: 500;">
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
        
        createInput('Title', 'title', 'text', "Not Ready Yet?", null, content, contentContainer);
        createInput('Subheadline', 'subheadline', 'textarea', "That's okay! We'll be here when you are.", null, content, contentContainer);
        
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
            createInput('Button Text', 'buttonText', 'text', 'Watch Demo', null, content, buttonContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
            createInput('Button Background', 'buttonBackground', 'color', 'rgba(96, 165, 250, 0.2)', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#60a5fa', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '15px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '10px 22px', null, content, buttonContainer);
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
        
        createInput('Background Color', 'backgroundColor', 'color', '#f8fafc', null, content, styleContainer);
        createInput('Border Color', 'borderColor', 'color', '#cbd5e1', null, content, styleContainer);
        createInput('Border Radius', 'borderRadius', 'text', '12px', null, content, styleContainer);
    }
});