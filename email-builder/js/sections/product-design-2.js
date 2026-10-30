SectionRegistry.register('product-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Key Benefits',
            features: [
                {title: 'Save Time', description: 'Automate repetitive tasks and reduce manual work by up to 70%.', icon: 'fas fa-clock'},
                {title: 'Boost Revenue', description: 'Increase conversions with our proven optimization strategies.', icon: 'fas fa-chart-bar'},
                {title: 'Scale Easily', description: 'Grow your business without worrying about infrastructure limits.', icon: 'fas fa-expand'}
            ],
            layout: 'features-first', // 'features-first', 'icon-first', 'horizontal'
            iconColor: '#3b82f6'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        let featuresHtml = content.features.map(feature => `
            <div style="margin-bottom: 25px;">
                <div style="display: flex; align-items: flex-start; margin-bottom: 10px;">
                    <i class="${feature.icon}" style="font-size: 24px; color: ${content.iconColor}; margin-right: 15px;"></i>
                    <h4 style="font-size: 18px; color: #1e293b; margin: 0;">${escapeHtml(feature.title)}</h4>
                </div>
                <p style="font-size: 14px; color: #64748b; line-height: 1.5; margin: 0; padding-left: 35px;">
                    ${escapeHtml(feature.description)}
                </p>
            </div>
        `).join('');
        
        if (content.layout === 'horizontal') {
            featuresHtml = content.features.map(feature => `
                <div style="flex: 1; padding-right: 20px; margin-bottom: 20px;">
                    <div style="text-align: center; margin-bottom: 15px;">
                        <i class="${feature.icon}" style="font-size: 32px; color: ${content.iconColor};"></i>
                    </div>
                    <h4 style="font-size: 18px; color: #1e293b; margin: 0 0 10px 0; text-align: center;">${escapeHtml(feature.title)}</h4>
                    <p style="font-size: 14px; color: #64748b; line-height: 1.5; margin: 0; text-align: center;">
                        ${escapeHtml(feature.description)}
                    </p>
                </div>
            `).join('');
        }
        
        return `
            <div style="margin-bottom: 30px;">
                <h2 style="font-size: 28px; color: #0f172a; text-align: ${content.layout === 'horizontal' ? 'center' : 'left'}; margin: 0 0 30px 0;">
                    ${escapeHtml(content.title)}
                </h2>
                ${content.layout === 'horizontal' 
                    ? `<div style="display: flex; flex-wrap: wrap;">${featuresHtml}</div>` 
                    : featuresHtml}
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
        
        createInput('Title', 'title', 'text', 'Key Benefits', null, content, titleContainer);
        createInput('Layout Style', 'layout', 'select', 'features-first', [
            {value: 'features-first', label: 'Features First'},
            {value: 'icon-first', label: 'Icon First'},
            {value: 'horizontal', label: 'Horizontal'}
        ], content, titleContainer);
        createInput('Icon Color', 'iconColor', 'color', '#3b82f6', null, content, titleContainer);
        
        // Features Settings
        const featuresDetails = document.createElement('details');
        featuresDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        featuresDetails.open = true;
        const featuresSummary = document.createElement('summary');
        featuresSummary.textContent = 'Features';
        featuresSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        featuresDetails.appendChild(featuresSummary);
        const featuresContainer = document.createElement('div');
        featuresContainer.classList.add('space-y-3');
        featuresDetails.appendChild(featuresContainer);
        container.appendChild(featuresDetails);
        
        if (!content.features) content.features = [];
        
        content.features.forEach((feature, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('border', 'rounded', 'p-2', 'bg-gray-50');
            
            const headerDiv = document.createElement('div');
            headerDiv.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
            headerDiv.innerHTML = `
                <span class="font-medium text-sm">Feature ${index + 1}</span>
                <button class="text-red-600 hover:text-red-800 p-1 text-sm" onclick="removeFeatureFromProduct(${section.id}, ${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            itemDiv.appendChild(headerDiv);
            
            createInput(`Title`, `features[${index}].title`, 'text', 'Feature Title', null, content.features[index], itemDiv);
            createInput(`Description`, `features[${index}].description`, 'textarea', 'Feature description.', null, content.features[index], itemDiv);
            createInput(`Icon`, `features[${index}].icon`, 'text', 'fas fa-check', null, content.features[index], itemDiv);
            
            featuresContainer.appendChild(itemDiv);
        });
        
        const addBtn = document.createElement('button');
        addBtn.classList.add('w-full', 'mt-2', 'bg-green-600', 'hover:bg-green-700', 'text-white', 'px-3', 'py-2', 'rounded', 'text-sm', 'flex', 'items-center', 'justify-center');
        addBtn.innerHTML = '<i class="fas fa-plus mr-1"></i> Add Feature';
        addBtn.onclick = () => {
            content.features.push({title: 'New Feature', description: 'Description here.', icon: 'fas fa-check'});
            showProperties();
        };
        featuresContainer.appendChild(addBtn);
    }
});

// Helper for feature management
window.removeFeatureFromProduct = function(sectionId, index) {
    console.log('Remove feature', index, 'from product section');
};