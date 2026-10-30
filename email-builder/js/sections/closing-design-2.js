SectionRegistry.register('closing-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Stay Connected',
            subheadline: 'Follow us on social media for the latest updates.',
            showSocial: true,
            socialLinks: [
                {icon: 'fab fa-youtube', url: '#'},
                {icon: 'fab fa-linkedin-in', url: '#'},
                {icon: 'fab fa-twitter', url: '#'},
                {icon: 'fab fa-facebook-f', url: '#'}
            ],
            showNewsletter: true,
            newsletterPlaceholder: 'Enter your email...',
            newsletterButtonText: 'Subscribe',
            newsletterBackground: '#1e293b'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        
        let socialHtml = '';
        if (content.showSocial && content.socialLinks && content.socialLinks.length > 0) {
            socialHtml = content.socialLinks.map(link => `
                <a href="${link.url}" style="display: inline-flex; align-items: center; justify-content: center; width: 50px; height: 50px; background: var(--b-surface2); border-radius: 50%; margin: 0 8px; color: var(--b-text); transition: all 0.3s ease;">
                    <i class="${link.icon}" style="font-size: 20px;"></i>
                </a>
            `).join('');
        }
        
        return `
            <div style="background: ${content.newsletterBackground}; padding: 50px 20px; text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 24px; color: #ffffff; margin: 0 0 15px 0;">
                    ${escapeHtml(content.title)}
                </h2>
                <p style="font-size: 16px; color: #cbd5e1; margin: 0 0 25px 0;">
                    ${escapeHtml(content.subheadline)}
                </p>
                <div style="margin-bottom: 25px;">${socialHtml}</div>
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
        
        createInput('Title', 'title', 'text', 'Stay Connected', null, content, contentContainer);
        createInput('Subheadline', 'subheadline', 'text', 'Follow us on social media for the latest updates.', null, content, contentContainer);
        
        // Social Media Settings
        const socialDetails = document.createElement('details');
        socialDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        socialDetails.open = false;
        const socialSummary = document.createElement('summary');
        socialSummary.textContent = 'Social Media Links';
        socialSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        socialDetails.appendChild(socialSummary);
        const socialContainer = document.createElement('div');
        socialContainer.classList.add('space-y-2');
        socialDetails.appendChild(socialContainer);
        container.appendChild(socialDetails);
        
        createCheckbox('Show Social Links', 'showSocial', content, socialContainer);
        
        // Background Settings
        const bgDetails = document.createElement('details');
        bgDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        bgDetails.open = false;
        const bgSummary = document.createElement('summary');
        bgSummary.textContent = 'Background Settings';
        bgSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        bgDetails.appendChild(bgSummary);
        const bgContainer = document.createElement('div');
        bgContainer.classList.add('space-y-2');
        bgDetails.appendChild(bgContainer);
        container.appendChild(bgDetails);
        
        createInput('Background Color', 'newsletterBackground', 'color', '#1e293b', null, content, bgContainer);
    }
});