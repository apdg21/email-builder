SectionRegistry.register('hero-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            backgroundGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            title: 'Transform Your Workflow',
            titleFontSize: '48px',
            titleColor: '#ffffff',
            titleFontFamily: 'Arial, Helvetica, sans-serif',
            textAlign: 'center',
            subheadline: 'All-in-one platform to grow your business with ease.',
            subheadlineFontSize: '20px',
            subheadlineColor: '#eaeaea',
            showButton: true,
            buttonText: 'Explore Now',
            buttonLink: '#',
            buttonBackground: 'rgba(255,255,255,0.15)',
            buttonColor: '#ffffff',
            buttonFontSize: '18px',
            buttonPadding: '14px 30px',
            buttonBorderRadius: '25px'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        return `
            <div style="background: ${content.backgroundGradient}; padding: 80px 20px; text-align: ${content.textAlign};">
                <h1 style="font-size: ${content.titleFontSize}; color: ${content.titleColor}; font-family: ${content.titleFontFamily}; margin: 0 0 25px 0; line-height: 1.1; font-weight: 700;">
                    ${escapeHtml(content.title)}
                </h1>
                <p style="font-size: ${content.subheadlineFontSize}; color: ${content.subheadlineColor}; margin: 0 0 40px 0; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto;">
                    ${escapeHtml(content.subheadline)}
                </p>
                ${content.showButton ? `
                    <table cellpadding="0" cellspacing="0" border="0" align="center" style="background: ${content.buttonBackground}; border-radius: ${content.buttonBorderRadius};">
                        <tr>
                            <td style="padding: ${content.buttonPadding};">
                                <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; text-decoration: none; display: inline-block; font-weight: 500;">
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
        
        // Background Settings
        const bgDetails = document.createElement('details');
        bgDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        bgDetails.open = true;
        const bgSummary = document.createElement('summary');
        bgSummary.textContent = 'Background Settings';
        bgSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        bgDetails.appendChild(bgSummary);
        const bgContainer = document.createElement('div');
        bgContainer.classList.add('space-y-2');
        bgDetails.appendChild(bgContainer);
        container.appendChild(bgDetails);
        
        createInput('Background Gradient', 'backgroundGradient', 'text', 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', null, content, bgContainer);
        
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
        
        createInput('Title', 'title', 'text', 'Transform Your Workflow', null, content, titleContainer);
        createInput('Title Font Size', 'titleFontSize', 'text', '48px', null, content, titleContainer);
        createInput('Title Font Family', 'titleFontFamily', 'select', 'Arial, Helvetica, sans-serif', fontOptions, content, titleContainer);
        createInput('Title Color', 'titleColor', 'color', '#ffffff', null, content, titleContainer);
        createInput('Text Align', 'textAlign', 'select', 'center', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, titleContainer);
        
        // Subheadline Settings
        const subtitleDetails = document.createElement('details');
        subtitleDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        subtitleDetails.open = true;
        const subtitleSummary = document.createElement('summary');
        subtitleSummary.textContent = 'Subheadline Settings';
        subtitleSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        subtitleDetails.appendChild(subtitleSummary);
        const subtitleContainer = document.createElement('div');
        subtitleContainer.classList.add('space-y-2');
        subtitleDetails.appendChild(subtitleContainer);
        container.appendChild(subtitleDetails);
        
        createInput('Subheadline', 'subheadline', 'textarea', 'All-in-one platform to grow your business with ease.', null, content, subtitleContainer);
        createInput('Subheadline Font Size', 'subheadlineFontSize', 'text', '20px', null, content, subtitleContainer);
        createInput('Subheadline Color', 'subheadlineColor', 'color', '#eaeaea', null, content, subtitleContainer);
        
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
            createInput('Button Text', 'buttonText', 'text', 'Explore Now', null, content, buttonContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
            createInput('Button Background', 'buttonBackground', 'color', 'rgba(255,255,255,0.15)', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '18px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '14px 30px', null, content, buttonContainer);
            createInput('Button Border Radius', 'buttonBorderRadius', 'text', '25px', null, content, buttonContainer);
        }
    }
});