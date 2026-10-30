SectionRegistry.register('hero-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            imageUrl: 'https://placehold.co/600x400/3a86ff/ffffff?text=Hero+Background',
            overlayColor: 'rgba(0,0,0,0.4)',
            title: 'Hero Headline',
            titleFontSize: '36px',
            titleColor: '#ffffff',
            textAlign: 'center',
            subheadline: 'This is a compelling subheadline that draws users in.',
            subheadlineFontSize: '18px',
            subheadlineColor: '#f0f0f0',
            showButton: true,
            buttonText: 'Get Started',
            buttonLink: '#',
            buttonBackground: '#ffffff',
            buttonColor: '#3a86ff',
            buttonFontSize: '16px',
            buttonPadding: '12px 24px',
            buttonBorderRadius: '4px'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        const overlayStyle = `
            background-image: linear-gradient(${content.overlayColor}, ${content.overlayColor}), url(${content.imageUrl});
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        `;
        
        return `
            <div style="${overlayStyle}; padding: 60px 20px; text-align: ${content.textAlign};">
                <h1 style="font-size: ${content.titleFontSize}; color: ${content.titleColor}; margin: 0 0 20px 0; line-height: 1.2;">
                    ${escapeHtml(content.title)}
                </h1>
                <p style="font-size: ${content.subheadlineFontSize}; color: ${content.subheadlineColor}; margin: 0 0 30px 0; line-height: 1.5;">
                    ${escapeHtml(content.subheadline)}
                </p>
                ${content.showButton ? `
                    <table cellpadding="0" cellspacing="0" border="0" align="center">
                        <tr>
                            <td style="background-color: ${content.buttonBackground}; border-radius: ${content.buttonBorderRadius};">
                                <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: ${content.buttonBorderRadius};">
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
        const imageDetails = document.createElement('details');
        imageDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        imageDetails.open = true;
        const imageSummary = document.createElement('summary');
        imageSummary.textContent = 'Hero Image';
        imageSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        imageDetails.appendChild(imageSummary);
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('space-y-2');
        imageDetails.appendChild(imageContainer);
        container.appendChild(imageDetails);
        
        createInput('Image URL', 'imageUrl', 'text', 'https://placehold.co/600x400/3a86ff/ffffff?text=Hero+Background', null, content, imageContainer);
        createInput('Overlay Color', 'overlayColor', 'text', 'rgba(0,0,0,0.4)', null, content, imageContainer);
        
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
        
        createInput('Title', 'title', 'text', 'Hero Headline', null, content, titleContainer);
        createInput('Title Font Size', 'titleFontSize', 'text', '36px', null, content, titleContainer);
        createInput('Title Color', 'titleColor', 'color', '#ffffff', null, content, titleContainer);
        createInput('Text Align', 'textAlign', 'select', 'center', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, titleContainer);
        createInput('Font Family', 'fontFamily', 'select', 'Arial, Helvetica, sans-serif', fontOptions, content, titleContainer);
        
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
        
        createInput('Subheadline', 'subheadline', 'textarea', 'This is a compelling subheadline that draws users in.', null, content, subtitleContainer);
        createInput('Subheadline Font Size', 'subheadlineFontSize', 'text', '18px', null, content, subtitleContainer);
        createInput('Subheadline Color', 'subheadlineColor', 'color', '#f0f0f0', null, content, subtitleContainer);
        
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
            createInput('Button Background', 'buttonBackground', 'color', '#ffffff', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#3a86ff', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '16px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '12px 24px', null, content, buttonContainer);
            createInput('Button Border Radius', 'buttonBorderRadius', 'text', '4px', null, content, buttonContainer);
        }
    }
});