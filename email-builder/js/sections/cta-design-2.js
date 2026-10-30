SectionRegistry.register('cta-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Let\'s Build Something Great',
            subheadline: 'Get in touch and we\'ll create a solution tailored for your business.',
            showButton: true,
            buttonText: 'Contact Us',
            buttonLink: '#',
            buttonBackground: 'rgba(59, 130, 246, 0.15)',
            buttonColor: '#3b82f6',
            buttonFontSize: '16px',
            buttonPadding: '12px 28px',
            showPhone: true,
            phone: '+1 (555) 123-4567',
            showEmail: true,
            email: 'hello@example.com',
            backgroundGradient: 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        return `
            <div style="background: ${content.backgroundGradient}; padding: 70px 20px; text-align: center; border-radius: 16px; margin-bottom: 30px;">
                <h2 style="font-size: 34px; color: #ffffff; margin: 0 0 15px 0; font-weight: 700;">
                    ${escapeHtml(content.title)}
                </h2>
                <p style="font-size: 18px; color: #e2e8f0; margin: 0 0 25px 0; max-width: 600px; margin-left: auto; margin-right: auto;">
                    ${escapeHtml(content.subheadline)}
                </p>
                ${content.showButton ? `
                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="margin-bottom: 30px;">
                        <tr>
                            <td style="background-color: ${content.buttonBackground}; border-radius: 50px;">
                                <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: 50px; font-weight: 500;">
                                    ${escapeHtml(content.buttonText)}
                                </a>
                            </td>
                        </tr>
                    </table>
                ` : ''}
                <div style="display: flex; justify-content: center; gap: 30px; font-size: 14px; color: #fecaca;">
                    ${content.showEmail ? `<div>✉️ ${escapeHtml(content.email)}</div>` : ''}
                    ${content.showPhone ? `<div>📞 ${escapeHtml(content.phone)}</div>` : ''}
                </div>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;
        
        // Title Settings
        const titleDetails = document.createElement('details');
        titleDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        titleDetails.open = true;
        const titleSummary = document.createElement('summary');
        titleSummary.textContent = 'Title Settings';
        titleSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        titleDetails.appendChild(titleSummary);
        const titleContainer = document.createElement('div');
        titleContainer.classList.add('space-y-2');
        titleDetails.appendChild(titleContainer);
        container.appendChild(titleDetails);
        
        createInput('Title', 'title', 'text', "Let's Build Something Great", null, content, titleContainer);
        createInput('Subheadline', 'subheadline', 'textarea', 'Get in touch and we\'ll create a solution tailored for your business.', null, content, titleContainer);
        
        // Contact Info
        const contactDetails = document.createElement('details');
        contactDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        contactDetails.open = false;
        const contactSummary = document.createElement('summary');
        contactSummary.textContent = 'Contact Info';
        contactSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        contactDetails.appendChild(contactSummary);
        const contactContainer = document.createElement('div');
        contactContainer.classList.add('space-y-2');
        contactDetails.appendChild(contactContainer);
        container.appendChild(contactDetails);
        
        createCheckbox('Show Phone', 'showPhone', content, contactContainer);
        if (content.showPhone) {
            createInput('Phone Number', 'phone', 'text', '+1 (555) 123-4567', null, content, contactContainer);
        }
        createCheckbox('Show Email', 'showEmail', content, contactContainer);
        if (content.showEmail) {
            createInput('Email', 'email', 'text', 'hello@example.com', null, content, contactContainer);
        }
        
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
            createInput('Button Text', 'buttonText', 'text', 'Contact Us', null, content, buttonContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
            createInput('Button Background', 'buttonBackground', 'color', 'rgba(59, 130, 246, 0.15)', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#3b82f6', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '16px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '12px 28px', null, content, buttonContainer);
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
        
        createInput('Background Gradient', 'backgroundGradient', 'text', 'linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)', null, content, styleContainer);
    }
});