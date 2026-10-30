SectionRegistry.register('opening-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            logo: 'https://placehold.co/40x40/3a86ff/ffffff?text=LL',
            headline: 'Welcome to Our Story',
            headlineFontSize: '28px',
            headlineColor: '#1e293b',
            subheadline: 'Where innovation meets excellence.',
            subheadlineFontSize: '16px',
            subheadlineColor: '#64748b',
            textAlign: 'center',
            showBreadcrumb: true,
            breadcrumbHome: 'Home',
            breadcrumbHomeLink: '#',
            breadcrumbCurrent: 'Welcome',
            padding: '60px 20px'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        let breadcrumbHtml = '';
        if (content.showBreadcrumb) {
            breadcrumbHtml = `
                <div style="margin-bottom: 20px; text-align: ${content.textAlign}; font-size: 14px; color: #94a3b8;">
                    <a href="${content.breadcrumbHomeLink}" style="color: #94a3b8; text-decoration: none;">${content.breadcrumbHome}</a>
                    <span style="margin: 0 8px; color: #94a3b8;">›</span>
                    <span style="color: #64748b;">${content.breadcrumbCurrent}</span>
                </div>
            `;
        }
        
        return `
            <div style="padding: ${content.padding};">
                ${breadcrumbHtml}
                <h1 style="font-size: ${content.headlineFontSize}; color: ${content.headlineColor}; margin: 0 0 15px 0; text-align: ${content.textAlign}; line-height: 1.3;">
                    ${escapeHtml(content.headline)}
                </h1>
                <p style="font-size: ${content.subheadlineFontSize}; color: ${content.subheadlineColor}; margin: 0; text-align: ${content.textAlign}; line-height: 1.5;">
                    ${escapeHtml(content.subheadline)}
                </p>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;
        
        // Breadcrumb Settings
        const crumbDetails = document.createElement('details');
        crumbDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        crumbDetails.open = true;
        const crumbSummary = document.createElement('summary');
        crumbSummary.textContent = 'Breadcrumb Settings';
        crumbSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        crumbDetails.appendChild(crumbSummary);
        const crumbContainer = document.createElement('div');
        crumbContainer.classList.add('space-y-2');
        crumbDetails.appendChild(crumbContainer);
        container.appendChild(crumbDetails);
        
        createCheckbox('Show Breadcrumb', 'showBreadcrumb', content, crumbContainer);
        if (content.showBreadcrumb) {
            createInput('Home Text', 'breadcrumbHome', 'text', 'Home', null, content, crumbContainer);
            createInput('Home Link', 'breadcrumbHomeLink', 'text', '#', null, content, crumbContainer);
            createInput('Current Text', 'breadcrumbCurrent', 'text', 'Welcome', null, content, crumbContainer);
        }
        
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
        
        createInput('Headline', 'headline', 'text', 'Welcome to Our Story', null, content, headContainer);
        createInput('Headline Font Size', 'headlineFontSize', 'text', '28px', null, content, headContainer);
        createInput('Headline Color', 'headlineColor', 'color', '#1e293b', null, content, headContainer);
        createInput('Text Align', 'textAlign', 'select', 'center', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, headContainer);
        createInput('Font Family', 'fontFamily', 'select', 'Arial, Helvetica, sans-serif', fontOptions, content, headContainer);
        
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
        
        createInput('Subheadline', 'subheadline', 'textarea', 'Where innovation meets excellence.', null, content, subContainer);
        createInput('Subheadline Font Size', 'subheadlineFontSize', 'text', '16px', null, content, subContainer);
        createInput('Subheadline Color', 'subheadlineColor', 'color', '#64748b', null, content, subContainer);
        
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
        
        createInput('Padding', 'padding', 'text', '60px 20px', null, content, padContainer);
    }
});