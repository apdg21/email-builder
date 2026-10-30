SectionRegistry.register('hero-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            imageUrl: 'https://placehold.co/600x500/10b981/ffffff?text=Hero+Image',
            title: 'Premium Solutions',
            titleFontSize: '42px',
            titleColor: '#1e293b',
            textAlign: 'left',
            subheadline: 'Delivering exceptional results for businesses worldwide.',
            subheadlineFontSize: '16px',
            subheadlineColor: '#64748b',
            showButton: true,
            buttonText: 'Learn More',
            buttonLink: '#',
            buttonBackground: '#10b981',
            buttonColor: '#ffffff',
            buttonFontSize: '15px',
            buttonPadding: '11px 25px',
            buttonBorderRadius: '6px',
            layout: 'image-right' // 'image-right' or 'image-left'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        const col1 = content.layout === 'image-right' ? 'text' : 'image';
        const col2 = content.layout === 'image-right' ? 'image' : 'text';
        
        return `
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td width="55%" style="vertical-align: top; padding-right: 30px;">
                        <h1 style="font-size: ${content.titleFontSize}; color: ${content.titleColor}; margin: 0 0 20px 0; line-height: 1.2;">
                            ${escapeHtml(content.title)}
                        </h1>
                        <p style="font-size: ${content.subheadlineFontSize}; color: ${content.subheadlineColor}; margin: 0 0 25px 0; line-height: 1.6;">
                            ${escapeHtml(content.subheadline)}
                        </p>
                        ${content.showButton ? `
                            <table cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="background-color: ${content.buttonBackground}; border-radius: ${content.buttonBorderRadius};">
                                        <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: ${content.buttonBorderRadius};">
                                            ${escapeHtml(content.buttonText)}
                                        </a>
                                    </td>
                                </tr>
                            </table>
                        ` : ''}
                    </td>
                    <td width="45%" style="vertical-align: top; text-align: ${col2 === 'image' ? 'right' : 'left'};">
                        <img src="${content.imageUrl}" alt="Hero Image" style="max-width: 100%; height: auto; border: 0;" />
                    </td>
                </tr>
            </table>
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
        
        createInput('Title', 'title', 'text', 'Premium Solutions', null, content, contentContainer);
        createInput('Title Font Size', 'titleFontSize', 'text', '42px', null, content, contentContainer);
        createInput('Title Color', 'titleColor', 'color', '#1e293b', null, content, contentContainer);
        createInput('Text Align', 'textAlign', 'select', 'left', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, contentContainer);
        
        createInput('Subheadline', 'subheadline', 'textarea', 'Delivering exceptional results for businesses worldwide.', null, content, contentContainer);
        createInput('Subheadline Font Size', 'subheadlineFontSize', 'text', '16px', null, content, contentContainer);
        createInput('Subheadline Color', 'subheadlineColor', 'color', '#64748b', null, content, contentContainer);
        
        createInput('Layout', 'layout', 'select', 'image-right', [
            {value: 'image-right', label: 'Image Right'},
            {value: 'image-left', label: 'Image Left'}
        ], content, contentContainer);
        
        // Image Settings
        const imageDetails = document.createElement('details');
        imageDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        imageDetails.open = true;
        const imageSummary = document.createElement('summary');
        imageSummary.textContent = 'Image Settings';
        imageSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        imageDetails.appendChild(imageSummary);
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('space-y-2');
        imageDetails.appendChild(imageContainer);
        container.appendChild(imageDetails);
        
        createInput('Image URL', 'imageUrl', 'text', 'https://placehold.co/600x500/10b981/ffffff?text=Hero+Image', null, content, imageContainer);
        
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
            createInput('Button Text', 'buttonText', 'text', 'Learn More', null, content, buttonContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
            createInput('Button Background', 'buttonBackground', 'color', '#10b981', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '15px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '11px 25px', null, content, buttonContainer);
            createInput('Button Border Radius', 'buttonBorderRadius', 'text', '6px', null, content, buttonContainer);
        }
    }
});