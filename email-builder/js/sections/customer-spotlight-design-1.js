SectionRegistry.register('customer-spotlight-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            customerName: 'Sarah Johnson',
            customerTitle: 'Marketing Director, TechCorp',
            testimonial: 'This service has transformed the way we do business. The results speak for themselves.',
            customerImage: 'https://placehold.co/60x60/3a86ff/ffffff?text=SJ',
            showRating: true,
            rating: 5,
            showQuoteIcon: true,
            quoteIcon: '❝',
            backgroundColor: '#ffffff',
            borderColor: '#e2e8f0',
            textAlign: 'left'
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
            ratingHtml = `<div style="margin-bottom: 12px;">${stars}</div>`;
        }

        return `
            <div style="background-color: ${content.backgroundColor}; border: 1px solid ${content.borderColor}; border-radius: 12px; padding: 30px 24px; text-align: ${content.textAlign};">
                ${content.showQuoteIcon ? `<p style="font-size: 48px; color: #cbd5e1; line-height: 1; margin-bottom: 10px;">${content.quoteIcon}</p>` : ''}
                <p style="font-size: 16px; color: #475569; line-height: 1.7; margin: 0 0 20px 0; font-style: italic;">
                    ${escapeHtml(content.testimonial)}
                </p>
                ${ratingHtml}
                <div style="display: flex; align-items: center; gap: 12px; justify-content: ${content.textAlign === 'center' ? 'center' : content.textAlign === 'right' ? 'flex-end' : 'flex-start'};">
                    <img src="${content.customerImage}" alt="${escapeHtml(content.customerName)}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">
                    <div style="text-align: ${content.textAlign === 'center' ? 'center' : content.textAlign === 'right' ? 'right' : 'left'};">
                        <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0;">${escapeHtml(content.customerName)}</p>
                        <p style="font-size: 14px; color: #64748b; margin: 0;">${escapeHtml(content.customerTitle)}</p>
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

        createInput('Customer Name', 'customerName', 'text', 'Sarah Johnson', null, content, contentContainer);
        createInput('Customer Title', 'customerTitle', 'text', 'Marketing Director, TechCorp', null, content, contentContainer);
        createInput('Testimonial Text', 'testimonial', 'textarea', 'This service has transformed the way we do business. The results speak for themselves.', null, content, contentContainer);
        createInput('Customer Image URL', 'customerImage', 'text', 'https://placehold.co/60x60/3a86ff/ffffff?text=SJ', null, content, contentContainer);

        // Rating
        const ratingDetails = document.createElement('details');
        ratingDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        ratingDetails.open = false;
        const ratingSummary = document.createElement('summary');
        ratingSummary.textContent = 'Rating';
        ratingSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        ratingDetails.appendChild(ratingSummary);
        const ratingContainer = document.createElement('div');
        ratingContainer.classList.add('space-y-2');
        ratingDetails.appendChild(ratingContainer);
        container.appendChild(ratingDetails);

        createCheckbox('Show Rating', 'showRating', content, ratingContainer);
        if (content.showRating) {
            createInput('Star Rating', 'rating', 'number', '5', null, content, ratingContainer);
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

        createCheckbox('Show Quote Icon', 'showQuoteIcon', content, styleContainer);
        if (content.showQuoteIcon) {
            createInput('Quote Icon', 'quoteIcon', 'text', '❝', null, content, styleContainer);
        }
        createInput('Background Color', 'backgroundColor', 'color', '#ffffff', null, content, styleContainer);
        createInput('Border Color', 'borderColor', 'color', '#e2e8f0', null, content, styleContainer);
    }
});