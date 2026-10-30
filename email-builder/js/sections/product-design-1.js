SectionRegistry.register('product-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Premium Package',
            tagline: 'Everything you need to succeed',
            features: [
                {text: 'Unlimited Projects', icon: 'fas fa-project-diagram'},
                {text: 'Real-time Collaboration', icon: 'fas fa-users'},
                {text: 'Advanced Analytics', icon: 'fas fa-chart-line'},
                {text: 'Priority Support', icon: 'fas fa-headset'}
            ],
            price: '99',
            period: 'month',
            buttonText: 'Get Started',
            buttonLink: '#',
            buttonBackground: '#3b82f6',
            buttonColor: '#ffffff',
            layout: 'boxed' // 'boxed', 'bordered', 'gradient'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        let containerStyle = '';
        if (content.layout === 'gradient') {
            containerStyle = 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);';
        } else if (content.layout === 'bordered') {
            containerStyle = 'border: 2px solid #e2e8f0;';
        } else {
            containerStyle = 'border: 1px solid #e2e8f0;';
        }
        
        let featuresHtml = content.features.map(feature => `
            <li style="display: flex; align-items: center; margin-bottom: 12px; padding: 0;">
                <i class="${feature.icon}" style="color: #3b82f6; margin-right: 10px; font-size: 16px;"></i>
                <span>${feature.text}</span>
            </li>
        `).join('');
        
        return `
            <div style="background: ${containerStyle}; border-radius: 12px; padding: 30px; text-align: center; margin-bottom: 30px;">
                <h3 style="font-size: 20px; color: #64748b; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 15px 0;">
                    ${escapeHtml(content.tagline)}
                </h3>
                <h2 style="font-size: 28px; color: #0f172a; margin: 0 0 20px 0;">
                    ${escapeHtml(content.title)}
                </h2>
                <ul style="list-style: none; padding: 0; margin: 0 0 25px 0; text-align: left; max-width: 400px; margin-left: auto; margin-right: auto;">
                    ${featuresHtml}
                </ul>
                <div style="font-size: 48px; color: #1e293b; font-weight: 700; margin: 20px 0;">
                    $${content.price}
                    <span style="font-size: 18px; color: #64748b;">/${content.period}</span>
                </div>
                <table cellpadding="0" cellspacing="0" border="0" align="center">
                    <tr>
                        <td style="background-color: ${content.buttonBackground}; border-radius: 6px;">
                            <a href="${content.buttonLink}" style="font-size: 16px; color: ${content.buttonColor}; padding: 12px 24px; display: inline-block; text-decoration: none; border-radius: 6px; font-weight: 500;">
                                ${escapeHtml(content.buttonText)}
                            </a>
                        </td>
                    </tr>
                </table>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;
        
        // Package Settings
        const pkgDetails = document.createElement('details');
        pkgDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        pkgDetails.open = true;
        const pkgSummary = document.createElement('summary');
        pkgSummary.textContent = 'Package Settings';
        pkgSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        pkgDetails.appendChild(pkgSummary);
        const pkgContainer = document.createElement('div');
        pkgContainer.classList.add('space-y-2');
        pkgDetails.appendChild(pkgContainer);
        container.appendChild(pkgDetails);
        
        createInput('Title', 'title', 'text', 'Premium Package', null, content, pkgContainer);
        createInput('Tagline', 'tagline', 'text', 'Everything you need to succeed', null, content, pkgContainer);
        createInput('Price', 'price', 'text', '99', null, content, pkgContainer);
        createInput('Period', 'period', 'text', 'month', null, content, pkgContainer);
        
        // Layout Settings
        const layoutDetails = document.createElement('details');
        layoutDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        layoutDetails.open = true;
        const layoutSummary = document.createElement('summary');
        layoutSummary.textContent = 'Layout Settings';
        layoutSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        layoutDetails.appendChild(layoutSummary);
        const layoutContainer = document.createElement('div');
        layoutContainer.classList.add('space-y-2');
        layoutDetails.appendChild(layoutContainer);
        container.appendChild(layoutDetails);
        
        createInput('Layout Style', 'layout', 'select', 'boxed', [
            {value: 'boxed', label: 'Boxed (Default)'},
            {value: 'bordered', label: 'Bordered'},
            {value: 'gradient', label: 'Gradient'}
        ], content, layoutContainer);
        
        // Features Settings
        const featuresDetails = document.createElement('details');
        featuresDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        featuresDetails.open = true;
        const featuresSummary = document.createElement('summary');
        featuresSummary.textContent = 'Feature List';
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
                <button class="text-red-600 hover:text-red-800 p-1 text-sm" title="Remove" onclick="removeFeature(${section.id || 'section'}, ${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            itemDiv.appendChild(headerDiv);
            
            createInput('Icon Class', `features[${index}].icon`, 'text', 'fas fa-check', null, content.features[index], itemDiv);
            createInput('Text', `features[${index}].text`, 'text', 'Feature text', null, content.features[index], itemDiv);
            
            featuresContainer.appendChild(itemDiv);
        });
        
        const addBtn = document.createElement('button');
        addBtn.classList.add('w-full', 'mt-2', 'bg-green-600', 'hover:bg-green-700', 'text-white', 'px-3', 'py-2', 'rounded', 'text-sm');
        addBtn.innerHTML = '<i class="fas fa-plus mr-1"></i> Add Feature';
        addBtn.onclick = () => {
            content.features.push({text: 'New Feature', icon: 'fas fa-check'});
            showProperties();
        };
        featuresContainer.appendChild(addBtn);
        
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
        
        createInput('Button Text', 'buttonText', 'text', 'Get Started', null, content, buttonContainer);
        createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
        createInput('Button Background', 'buttonBackground', 'color', '#3b82f6', null, content, buttonContainer);
        createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, buttonContainer);
    }
});

// Helper for feature management
window.removeFeature = function(sectionId, index) {
    // This would need proper section lookup
    console.log('Remove feature', index, 'from section', sectionId);
};