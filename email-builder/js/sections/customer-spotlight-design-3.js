SectionRegistry.register('customer-spotlight-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            customerName: 'Jane Rodriguez',
            customerTitle: 'Product Lead, GlobalTech',
            testimonial: 'The level of detail and quality exceeded all our expectations. Highly recommended!',
            customerImage: 'https://placehold.co/70x70/3a86ff/ffffff?text=JR',
            companyName: 'GlobalTech Inc.',
            showQuoteIcon: true,
            quoteIcon: '“',
            showRating: true,
            rating: 5,
            backgroundColor: '#ffffff',
            textColor: '#334159',
            borderColor: '#e2e8f0',
            accentColor: '#3a86ff',
            textAlign: 'center'
        };
    },

    generateContent: function(section) {
        const content = section.content;

        let ratingHtml = '';
        if (content.showRating) {
            let stars = '';
            for (let i = 0; i < 5; i++) {
                if (i < content.rating) {
                    stars += '<i class="fas fa-star" style="color: #f59e0b; font-size: 16px;"></i>';
                } else {
                    stars += '<i class="far fa-star" style="color: #e2e8f0; font-size: 16px;"></i>';
                }
            }
            ratingHtml = `<div style="color: #f59e0b; margin-bottom: 12px;">${stars}</div>`;
        }

        return `
            <div style="background-color: ${content.backgroundColor}; border: 1px solid ${content.borderColor}; border-left: 4px solid ${content.accentColor}; border-radius: 0 8px 8px 0; padding: 30px 25px; text-align: ${content.textAlign};">
                ${content.showQuoteIcon ? `<p style="font-size: 42px; color: ${content.accentColor}; line-height: 1; margin-bottom: 15px;">${content.quoteIcon}</p>` : ''}
                ${ratingHtml}
                <p style="font-size: 16px; color: ${content.textColor}; line-height: 1.7; margin: 0 0 20px 0;">
                    ${escapeHtml(content.testimonial)}
                </p>
                <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
                    <img src="${content.customerImage}" alt="${escapeHtml(content.customerName)}" style="width: 70px; height: 70px; border-radius: 50%; object-fit: cover;">
                    <div style="text-align: center;">
                        <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0;">${escapeHtml(content.customerName)}</p>
                        <p style="font-size: 14px; color: #64748b; margin: 0;">${escapeHtml(content.customerTitle)}</p>
                        <p style="font-size: 13px; color: #94a3b8; margin: 0;">${escapeHtml(content.companyName)}</p>
                    </div>
                </div>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        // Testimonial Content
        const contentDetails = document.createElement('details');
        contentDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        contentDetails.open = true;
        const contentSummary = document.createElement('summary');
        contentSummary.textContent = 'Testimonial Content';
        contentSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        contentDetails.appendChild(contentSummary);
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('space-y-2');
        contentDetails.appendChild(contentContainer);
        container.appendChild(contentDetails);

        createInput('Customer Name', 'customerName', 'text', 'Jane Rodriguez', null, content, contentContainer);
        createInput('Customer Title', 'customerTitle', 'text', 'Product Lead, GlobalTech', null, content, contentContainer);
        createInput('Company Name', 'companyName', 'text', 'GlobalTech Inc.', null, content, contentContainer);
        createInput('Testimonial Text', 'testimonial', 'textarea', 'The level of detail and quality exceeded all our expectations. Highly recommended!', null, content, contentContainer);
        createInput('Customer Image URL', 'customerImage', 'text', 'https://placehold.co/70x70/3a86ff/ffffff?text=JR', null, content, contentContainer);

        // Quote & Rating
        const quoteDetails = document.createElement('details');
        quoteDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        quoteDetails.open = false;
        const quoteSummary = document.createElement('summary');
        quoteSummary.textContent = 'Quote & Rating';
        quoteSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        quoteDetails.appendChild(quoteSummary);
        const quoteContainer = document.createElement('div');
        quoteContainer.classList.add('space-y-2');
        quoteDetails.appendChild(quoteContainer);
        container.appendChild(quoteDetails);

        createCheckbox('Show Quote Icon', 'showQuoteIcon', content, quoteContainer);
        if (content.showQuoteIcon) {
            createInput('Quote Icon', 'quoteIcon', 'text', '“', null, content, quoteContainer);
        }
        createCheckbox('Show Rating', 'showRating', content, quoteContainer);
        if (content.showRating) {
            createInput('Star Rating', 'rating', 'number', '5', null, content, quoteContainer);
        }

        // Styling
        const styleDetails = document.createElement('details');
        styleDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        styleDetails.open = false;
        const styleSummary = document.createElement('summary');
        styleSummary.textContent = 'Styling';
        styleSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        styleDetails.appendChild(styleSummary);
        const styleContainer = document.createElement('div');
        styleContainer.classList.add('space-y-2');
        styleDetails.appendChild(styleContainer);
        container.appendChild(styleDetails);

        createInput('Background Color', 'backgroundColor', 'color', '#ffffff', null, content, styleContainer);
        createInput('Text Color', 'textColor', 'color', '#334159', null, content, styleContainer);
        createInput('Border Color', 'borderColor', 'color', '#e2e8f0', null, content, styleContainer);
        createInput('Accent Color', 'accentColor', 'color', '#3a86ff', null, content, styleContainer);
    }
});