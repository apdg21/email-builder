SectionRegistry.register('footer-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            companyName: 'Your Company',
            copyrightText: '© 2026 Your Company. All rights reserved.',
            showSocial: true,
            socialLinks: [
                {icon: 'fab fa-facebook-f', url: '#'},
                {icon: 'fab fa-twitter', url: '#'},
                {icon: 'fab fa-instagram', url: '#'},
                {icon: 'fab fa-linkedin-in', url: '#'}
            ],
            showLinks: true,
            footerLinks: [
                {label: 'Privacy Policy', url: '#'},
                {label: 'Terms of Service', url: '#'},
                {label: 'Contact', url: '#'}
            ],
            backgroundColor: '#0f172a',
            textColor: '#94a3b8',
            linkColor: '#cbd5e1'
        };
    },

    generateContent: function(section) {
        const content = section.content;

        let socialHtml = '';
        // Inline SVGs for email-safe social icons
        const socialSvgs = {
            'fab fa-facebook-f': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
            'fab fa-twitter':    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>',
            'fab fa-instagram':  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>',
            'fab fa-linkedin-in':'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>'
        };

        if (content.showSocial && content.socialLinks && content.socialLinks.length > 0) {
            socialHtml = content.socialLinks.map(link => {
                const svg = socialSvgs[link.icon] || '';
                return `
                <a href="${link.url}" style="display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; background: #1e293b; border-radius: 50%; margin: 0 6px; color: ${content.linkColor}; text-decoration: none;">
                    ${svg}
                </a>
            `}).join('');
        }

        let linksHtml = '';
        if (content.showLinks && content.footerLinks && content.footerLinks.length > 0) {
            linksHtml = content.footerLinks.map(link => `
                <a href="${link.url}" style="color: ${content.linkColor}; text-decoration: none; font-size: 14px; margin: 0 12px;">${escapeHtml(link.label)}</a>
            `).join('');
        }

        return `
            <div style="background-color: ${content.backgroundColor}; color: ${content.textColor}; padding: 30px 20px; text-align: center; font-size: 14px;">
                ${socialHtml ? `<div style="margin-bottom: 20px;">${socialHtml}</div>` : ''}
                ${linksHtml ? `<div style="margin-bottom: 15px;">${linksHtml}</div>` : ''}
                <p style="margin: 0; color: ${content.textColor}; font-size: 14px;">
                    ${escapeHtml(content.copyrightText)}
                </p>
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
        contentSummary.textContent = 'Footer Content';
        contentSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        contentDetails.appendChild(contentSummary);
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('space-y-2');
        contentDetails.appendChild(contentContainer);
        container.appendChild(contentDetails);

        createInput('Company Name', 'companyName', 'text', 'Your Company', null, content, contentContainer);
        createInput('Copyright Text', 'copyrightText', 'text', '© 2026 Your Company. All rights reserved.', null, content, contentContainer);
        createInput('Background Color', 'backgroundColor', 'color', '#0f172a', null, content, contentContainer);
        createInput('Text Color', 'textColor', 'color', '#94a3b8', null, content, contentContainer);
        createInput('Link Color', 'linkColor', 'color', '#cbd5e1', null, content, contentContainer);

        // Social Media
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
    }
});