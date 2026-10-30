SectionRegistry.register('footer-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            companyName: 'Your Company',
            tagline: 'Making email marketing easy',
            copyrightText: '© 2026 Your Company. All rights reserved.',
            showSocial: true,
            socialLinks: [
                {label: 'Facebook', icon: 'fab fa-facebook-f', url: '#'},
                {label: 'Twitter', icon: 'fab fa-twitter', url: '#'},
                {label: 'Instagram', icon: 'fab fa-instagram', url: '#'},
                {label: 'LinkedIn', icon: 'fab fa-linkedin-in', url: '#'}
            ],
            showLinks: true,
            footerLinks: [
                {label: 'About Us', url: '#'},
                {label: 'Services', url: '#'},
                {label: 'Contact', url: '#'},
                {label: 'Support', url: '#'}
            ],
            backgroundColor: '#1e293b',
            footerTextColor: '#94a3b8',
            footerLinkColor: '#93c5fd',
            footerLinkHoverColor: '#3b82f6',
            textAlign: 'center'
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
                <a href="${link.url}" style="display: inline-flex; align-items: center; gap: 6px; color: ${content.footerLinkColor}; text-decoration: none; font-size: 14px;">
                    ${svg} ${escapeHtml(link.label)}
                </a>
            `}).join('');
        }

        let linksHtml = '';
        if (content.showLinks && content.footerLinks && content.footerLinks.length > 0) {
            linksHtml = content.footerLinks.map(link => `
                <a href="${link.url}" style="color: ${content.footerLinkColor}; text-decoration: none; font-size: 14px; margin: 0 10px;">${escapeHtml(link.label)}</a>
            `).join('');
        }

        return `
            <div style="background-color: ${content.backgroundColor}; color: ${content.footerTextColor}; padding: 35px 20px; text-align: ${content.textAlign}; font-family: ${content.fontFamily};">
                <div style="margin-bottom: 20px;">
                    <h3 style="font-size: 18px; font-weight: 700; color: #ffffff; margin: 0 0 5px 0;">
                        ${escapeHtml(content.companyName)}
                    </h3>
                    <p style="font-size: 14px; color: ${content.footerTextColor}; margin: 0;">
                        ${escapeHtml(content.tagline)}
                    </p>
                </div>
                ${linksHtml ? `<div style="margin-bottom: 20px; font-size: 14px;">${linksHtml}</div>` : ''}
                ${socialHtml ? `<div style="margin-bottom: 20px; display: flex; justify-content: center; gap: 20px; flex-wrap: wrap;">${socialHtml}</div>` : ''}
                <p style="font-size: 12px; color: #64748b; margin: 0;">
                    ${escapeHtml(content.copyrightText)}
                </p>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        // Company Info
        const infoDetails = document.createElement('details');
        infoDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        infoDetails.open = true;
        const infoSummary = document.createElement('summary');
        infoSummary.textContent = 'Company Info';
        infoSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        infoDetails.appendChild(infoSummary);
        const infoContainer = document.createElement('div');
        infoContainer.classList.add('space-y-2');
        infoDetails.appendChild(infoContainer);
        container.appendChild(infoDetails);

        createInput('Company Name', 'companyName', 'text', 'Your Company', null, content, infoContainer);
        createInput('Tagline', 'tagline', 'text', 'Making email marketing easy', null, content, infoContainer);
        createInput('Copyright Text', 'copyrightText', 'text', '© 2026 Your Company. All rights reserved.', null, content, infoContainer);
        createInput('Background Color', 'backgroundColor', 'color', '#1e293b', null, content, infoContainer);
        createInput('Text Color', 'footerTextColor', 'color', '#94a3b8', null, content, infoContainer);
        createInput('Link Color', 'footerLinkColor', 'color', '#93c5fd', null, content, infoContainer);

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

        // Footer Links
        const linksDetails = document.createElement('details');
        linksDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        linksDetails.open = false;
        const linksSummary = document.createElement('summary');
        linksSummary.textContent = 'Footer Links';
        linksSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        linksDetails.appendChild(linksSummary);
        const linksContainer = document.createElement('div');
        linksContainer.classList.add('space-y-2');
        linksDetails.appendChild(linksContainer);
        container.appendChild(linksDetails);

        createCheckbox('Show Footer Links', 'showLinks', content, linksContainer);
    }
});