SectionRegistry.register('closing-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Thank You for Your Time',
            subheadline: 'We look forward to working with you.',
            showSocial: true,
            socialLinks: [
                {icon: 'fab fa-facebook-f', url: '#'},
                {icon: 'fab fa-twitter', url: '#'},
                {icon: 'fab fa-instagram', url: '#'},
                {icon: 'fab fa-linkedin-in', url: '#'}
            ],
            showCopyright: true,
            copyrightText: '© 2026 Your Company. All rights reserved.'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        let socialHtml = '';
        if (content.showSocial && content.socialLinks && content.socialLinks.length > 0) {
            socialHtml = content.socialLinks.map(link => `
                <a href="${link.url}" style="display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; background: #f1f5f9; border-radius: 50%; margin: 0 8px; color: #64748b; transition: all 0.3s ease;" onmouseover="this.style.background='#3b82f6'; this.style.color='#ffffff'" onmouseout="this.style.background='#f1f5f9'; this.style.color='#64748b'">
                    <i class="${link.icon}" style="font-size: 18px;"></i>
                </a>
            `).join('');
        }
        
        return `
            <div style="text-align: center; padding: 40px 20px; margin-bottom: 30px;">
                <h2 style="font-size: 24px; color: #0f172a; margin: 0 0 15px 0;">
                    ${escapeHtml(content.title)}
                </h2>
                <p style="font-size: 16px; color: #64748b; margin: 0 0 25px 0;">
                    ${escapeHtml(content.subheadline)}
                </p>
                ${socialHtml ? `<div style="margin-bottom: 25px;">${socialHtml}</div>` : ''}
                ${content.showCopyright ? `
                    <p style="font-size: 14px; color: #94a3b8; margin: 0;">
                        ${escapeHtml(content.copyrightText)}
                    </p>
                ` : ''}
            </div>
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
        
        createInput('Title', 'title', 'text', 'Thank You for Your Time', null, content, contentContainer);
        createInput('Subheadline', 'subheadline', 'text', 'We look forward to working with you.', null, content, contentContainer);
        createInput('Copyright Text', 'copyrightText', 'text', '© 2026 Your Company. All rights reserved.', null, content, contentContainer);
        
        // Social Media Settings
        const socialDetails = document.createElement('details');
        socialDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        socialDetails.open = false;
        const socialSummary = document.createElement('summary');
        socialSummary.textContent = 'Social Media';
        socialSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        socialDetails.appendChild(socialSummary);
        const socialContainer = document.createElement('div');
        socialContainer.classList.add('space-y-2');
        socialDetails.appendChild(socialContainer);
        container.appendChild(socialDetails);
        
        createCheckbox('Show Social Links', 'showSocial', content, socialContainer);
        
        // Copyright Settings
        const copyDetails = document.createElement('details');
        copyDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        copyDetails.open = false;
        const copySummary = document.createElement('summary');
        copySummary.textContent = 'Copyright';
        copySummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        copyDetails.appendChild(copySummary);
        const copyContainer = document.createElement('div');
        copyContainer.classList.add('space-y-2');
        copyDetails.appendChild(copyContainer);
        container.appendChild(copyDetails);
        
        createCheckbox('Show Copyright', 'showCopyright', content, copyContainer);
    }
});