SectionRegistry.register('opening-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            backgroundType: 'gradient',
            backgroundGradient: 'linear-gradient(135deg, #0f1117 0%, #1a1d27 100%)',
            headline: 'Discover More',
            headlineFontSize: '36px',
            headlineColor: '#ffffff',
            headlineFontFamily: 'Georgia, serif',
            subheadline: 'Explore our comprehensive solutions designed for modern businesses.',
            subheadlineFontSize: '18px',
            subheadlineColor: '#cbd5e1',
            textAlign: 'center',
            icon: 'fas fa-search',
            iconColor: '#3b82f6',
            iconSize: '48px',
            padding: '80px 20px'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        return `
            <div style="background: ${content.backgroundGradient}; padding: ${content.padding}; text-align: ${content.textAlign};">
                <div style="margin-bottom: 30px;">
                    <i class="${content.icon}" style="font-size: ${content.iconSize}; color: ${content.iconColor};"></i>
                </div>
                <h1 style="font-size: ${content.headlineFontSize}; color: ${content.headlineColor}; font-family: ${content.headlineFontFamily}; margin: 0 0 20px 0; line-height: 1.2;">
                    ${escapeHtml(content.headline)}
                </h1>
                <p style="font-size: ${content.subheadlineFontSize}; color: ${content.subheadlineColor}; margin: 0; line-height: 1.6; max-width: 600px; margin-left: auto; margin-right: auto;">
                    ${escapeHtml(content.subheadline)}
                </p>
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
        
        createInput('Background Gradient', 'backgroundGradient', 'text', 'linear-gradient(135deg, #0f1117 0%, #1a1d27 100%)', null, content, bgContainer);
        
        // Icon Settings
        const iconDetails = document.createElement('details');
        iconDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        iconDetails.open = false;
        const iconSummary = document.createElement('summary');
        iconSummary.textContent = 'Icon Settings';
        iconSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        iconDetails.appendChild(iconSummary);
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('space-y-2');
        iconDetails.appendChild(iconContainer);
        container.appendChild(iconDetails);
        
        createInput('Icon Class (fa-*)', 'icon', 'text', 'fas fa-search', null, content, iconContainer);
        createInput('Icon Size', 'iconSize', 'text', '48px', null, content, iconContainer);
        createInput('Icon Color', 'iconColor', 'color', '#3b82f6', null, content, iconContainer);
        
        // Headline Settings
        const headDetails = document.createElement('details');
        headDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        headDetails.open = true;
        const headSummary = document.createElement('summary');
        headSummary.textContent = 'Headline Settings';
        headSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        headDetails.appendChild(headSummary);
        const headContainer = document.createElement('div');
        headContainer.classList.add('space-y-2');
        headDetails.appendChild(headContainer);
        container.appendChild(headDetails);
        
        createInput('Headline', 'headline', 'text', 'Discover More', null, content, headContainer);
        createInput('Headline Font Size', 'headlineFontSize', 'text', '36px', null, content, headContainer);
        createInput('Headline Font Family', 'headlineFontFamily', 'select', 'Georgia, serif', fontOptions, content, headContainer);
        createInput('Headline Color', 'headlineColor', 'color', '#ffffff', null, content, headContainer);
        createInput('Text Align', 'textAlign', 'select', 'center', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, headContainer);
        
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
        
        createInput('Subheadline', 'subheadline', 'textarea', 'Explore our comprehensive solutions designed for modern businesses.', null, content, subContainer);
        createInput('Subheadline Font Size', 'subheadlineFontSize', 'text', '18px', null, content, subContainer);
        createInput('Subheadline Color', 'subheadlineColor', 'color', '#cbd5e1', null, content, subContainer);
        
        // Padding Settings
        const padDetails = document.createElement('details');
        padDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        padDetails.open = true;
        const padSummary = document.createElement('summary');
        padSummary.textContent = 'Padding Settings';
        padSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        padDetails.appendChild(padSummary);
        const padContainer = document.createElement('div');
        padContainer.classList.add('space-y-2');
        padDetails.appendChild(padContainer);
        container.appendChild(padDetails);
        
        createInput('Padding', 'padding', 'text', '80px 20px', null, content, padContainer);
    }
});