SectionRegistry.register('product-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Ready to Transform Your Business?',
            subheadline: 'Join thousands of satisfied customers who boosted their productivity.',
            features: [
                {icon: 'fas fa-check-circle', text: 'No credit card required'},
                {icon: 'fas fa-clock', text: 'Cancel anytime'},
                {icon: 'fas fa-shield-alt', text: '256-bit SSL encryption'}
            ],
            buttonText: 'Start Free Trial',
            buttonLink: '#',
            buttonBackground: '#10b981',
            buttonColor: '#ffffff',
            trustBadge: true,
            layout: 'centered' // 'centered', 'split', 'full-width'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        let featuresHtml = content.features.map(f => `
            <span style="display: inline-flex; align-items: center; margin: 0 15px 0 0; color: #64748b;">
                <i class="${f.icon}" style="color: #10b981; margin-right: 6px;"></i>
                <span>${f.text}</span>
            </span>
        `).join('');
        
        return `
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1a1d27 100%); padding: 60px 20px; border-radius: 16px; text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 32px; color: #ffffff; margin: 0 0 20px 0; font-weight: 700;">
                    ${escapeHtml(content.title)}
                </h2>
                <p style="font-size: 16px; color: #cbd5e1; margin: 0 0 25px 0; max-width: 600px; margin-left: auto; margin-right: auto;">
                    ${escapeHtml(content.subheadline)}
                </p>
                <div style="margin-bottom: 25px;">${featuresHtml}</div>
                <table cellpadding="0" cellspacing="0" border="0" align="center">
                    <tr>
                        <td style="background-color: ${content.buttonBackground}; border-radius: 50px; padding: 12px 30px;">
                            <a href="${content.buttonLink}" style="font-size: 18px; color: ${content.buttonColor}; text-decoration: none; display: inline-block; font-weight: 600;">
                                ${escapeHtml(content.buttonText)}
                            </a>
                        </td>
                    </tr>
                </table>
                ${content.trustBadge ? `<div style="margin-top: 25px; font-size: 13px; color: #94a3b8;">
                    <i class="fas fa-shield-alt" style="margin-right: 8px;"></i>
                    Secure checkout with 256-bit SSL encryption
                </div>` : ''}
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
        
        createInput('Title', 'title', 'text', 'Ready to Transform Your Business?', null, content, titleContainer);
        createInput('Subheadline', 'subheadline', 'textarea', 'Join thousands of satisfied customers.', null, content, titleContainer);
        createInput('Layout', 'layout', 'select', 'centered', [
            {value: 'centered', label: 'Centered'},
            {value: 'split', label: 'Split'},
            {value: 'full-width', label: 'Full Width'}
        ], content, titleContainer);
        
        // Features Settings
        const featuresDetails = document.createElement('details');
        featuresDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        featuresDetails.open = true;
        const featuresSummary = document.createElement('summary');
        featuresSummary.textContent = 'Features/Badges';
        featuresSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        featuresDetails.appendChild(featuresSummary);
        const featuresContainer = document.createElement('div');
        featuresContainer.classList.add('space-y-2');
        featuresDetails.appendChild(featuresContainer);
        container.appendChild(featuresDetails);
        
        if (!content.features) content.features = [];
        
        content.features.forEach((feature, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('border', 'rounded', 'p-2', 'bg-gray-50');
            
            const headerDiv = document.createElement('div');
            headerDiv.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
            headerDiv.innerHTML = `
                <span class="font-medium text-sm">Badge ${index + 1}</span>
                <button class="text-red-600 hover:text-red-800 p-1 text-sm" onclick="removeFeatureFromCTA(${section.id}, ${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            itemDiv.appendChild(headerDiv);
            
            createInput(`Icon`, `features[${index}].icon`, 'text', 'fas fa-check-circle', null, content.features[index], itemDiv);
            createInput(`Text`, `features[${index}].text`, 'text', 'Feature text', null, content.features[index], itemDiv);
            
            featuresContainer.appendChild(itemDiv);
        });
        
        const addBtn = document.createElement('button');
        addBtn.classList.add('w-full', 'mt-2', 'bg-green-600', 'hover:bg-green-700', 'text-white', 'px-3', 'py-2', 'rounded', 'text-sm');
        addBtn.innerHTML = '<i class="fas fa-plus mr-1"></i> Add Badge';
        addBtn.onclick = () => {
            content.features.push({icon: 'fas fa-check-circle', text: 'New Badge'});
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
        
        createInput('Button Text', 'buttonText', 'text', 'Start Free Trial', null, content, buttonContainer);
        createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
        createInput('Button Background', 'buttonBackground', 'color', '#10b981', null, content, buttonContainer);
        createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, buttonContainer);
        
        // Trust Badge
        const trustDetails = document.createElement('details');
        trustDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        trustDetails.open = true;
        const trustSummary = document.createElement('summary');
        trustSummary.textContent = 'Trust Badge';
        trustSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        trustDetails.appendChild(trustSummary);
        const trustContainer = document.createElement('div');
        trustContainer.classList.add('space-y-2');
        trustDetails.appendChild(trustContainer);
        container.appendChild(trustDetails);
        
        createCheckbox('Show Trust Badge', 'trustBadge', content, trustContainer);
    }
});

window.removeFeatureFromCTA = function(sectionId, index) {
    console.log('Remove feature', index, 'from CTA section');
};