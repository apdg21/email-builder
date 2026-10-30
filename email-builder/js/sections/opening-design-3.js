SectionRegistry.register('opening-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            backgroundImage: 'https://placehold.co/600x400/3a86ff/ffffff?text=Background',
            title: 'Start Your Journey',
            titleFontSize: '44px',
            titleColor: '#ffffff',
            subheadline: 'Begin achieving your goals with our proven system.',
            subheadlineFontSize: '18px',
            subheadlineColor: '#e2e8f0',
            textAlign: 'center',
            showButton: true,
            buttonText: 'Get Started',
            buttonLink: '#',
            buttonBackground: 'rgba(255,255,255,0.2)',
            buttonColor: '#ffffff',
            buttonFontSize: '16px',
            buttonPadding: '12px 24px',
            buttonBorderRadius: '25px',
            overlayColor: 'rgba(0,0,0,0.5)'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        const overlayStyle = content.overlayColor 
            ? `background: ${content.overlayColor};` 
            : '';
        
        return `
            <div style="background-image: url(${content.backgroundImage}); background-size: cover; background-position: center; padding: 80px 20px; text-align: ${content.textAlign}; ${overlayStyle};">
                <h1 style="font-size: ${content.titleFontSize}; color: ${content.titleColor}; margin: 0 0 20px 0; line-height: 1.1; font-weight: 700;">
                    ${escapeHtml(content.title)}
                </h1>
                <p style="font-size: ${content.subheadlineFontSize}; color: ${content.subheadlineColor}; margin: 0 0 30px 0; line-height: 1.5; max-width: 500px; margin-left: auto; margin-right: auto;">
                    ${escapeHtml(content.subheadline)}
                </p>
                ${content.showButton ? `
                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                            <td style="background-color: ${content.buttonBackground}; border-radius: ${content.buttonBorderRadius};">
                                <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: ${content.buttonBorderRadius}; font-weight: 500;">
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
        
        // Image Settings
        const imgDetails = document.createElement('details');
        imgDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        imgDetails.open = true;
        const imgSummary = document.createElement('summary');
        imgSummary.textContent = 'Background Image';
        imgSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        imgDetails.appendChild(imgSummary);
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('space-y-2');
        imgDetails.appendChild(imgContainer);
        container.appendChild(imgDetails);
        
        createInput('Background Image URL', 'backgroundImage', 'text', 'https://placehold.co/600x400/3a86ff/ffffff?text=Background', null, content, imgContainer);
        createInput('Overlay Color', 'overlayColor', 'text', 'rgba(0,0,0,0.5)', null, content, imgContainer);
        
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
        
        createInput('Title', 'title', 'text', 'Start Your Journey', null, content, titleContainer);
        createInput('Title Font Size', 'titleFontSize', 'text', '44px', null, content, titleContainer);
        createInput('Title Color', 'titleColor', 'color', '#ffffff', null, content, titleContainer);
        createInput('Text Align', 'textAlign', 'select', 'center', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, titleContainer);
        
        // Subheadline Settings
        const subDetails = document.createElement('details');
        subDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        subDetails.open = true;
        const subSummary = document.createElement('summary');
        subSummary.textContent = 'Subheadline Settings';
        subSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        subDetails.appendChild(subSummary);
        const subContainer = document.createElement('div');
        subContainer.classList.add('space-y-2');
        subDetails.appendChild(subContainer);
        container.appendChild(subDetails);
        
        createInput('Subheadline', 'subheadline', 'textarea', 'Begin achieving your goals with our proven system.', null, content, subContainer);
        createInput('Subheadline Font Size', 'subheadlineFontSize', 'text', '18px', null, content, subContainer);
        createInput('Subheadline Color', 'subheadlineColor', 'color', '#e2e8f0', null, content, subContainer);
        
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
            createInput('Button Text', 'buttonText', 'text', 'Get Started', null, content, buttonContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
            createInput('Button Background', 'buttonBackground', 'color', 'rgba(255,255,255,0.2)', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '16px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '12px 24px', null, content, buttonContainer);
            createInput('Button Border Radius', 'buttonBorderRadius', 'text', '25px', null, content, buttonContainer);
        }
    }
});