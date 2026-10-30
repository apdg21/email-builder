SectionRegistry.register('customer-spotlight-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            customerName: 'Mike Chen',
            customerTitle: 'CEO, StartupX',
            testimonial: 'Working with this platform increased our conversions by 300%. Simply amazing!',
            customerImage: 'https://placehold.co/80x80/10b981/ffffff?text=MC',
            companyLogo: '',
            showRating: true,
            rating: 5,
            backgroundColor: '#f0fdf4',
            accentColor: '#10b981',
            borderColor: '#bbf7d0',
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
                    stars += '<i class="fas fa-star" style="color: #f59e0b; font-size: 18px;"></i>';
                } else {
                    stars += '<i class="far fa-star" style="color: #e2e8f0; font-size: 18px;"></i>';
                }
            }
            ratingHtml = `<div style="color: #f59e0b; margin-bottom: 12px;">${stars}</div>`;
        }

        const logoHtml = content.companyLogo ?
            `<img src="${content.companyLogo}" alt="Company Logo" style="height: 30px; margin-bottom: 12px;">` : '';

        return `
            <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: ${content.backgroundColor}; border: 1px solid ${content.borderColor}; border-radius: 16px;">
                <tr>
                    <td style="padding: 30px;">
                        ${logoHtml}
                        <div style="display: flex; gap: 16px; align-items: flex-start;">
                            <img src="${content.customerImage}" alt="${escapeHtml(content.customerName)}" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover; flex-shrink: 0;">
                            <div style="flex: 1;">
                                ${ratingHtml}
                                <p style="font-size: 16px; color: #1e293b; line-height: 1.7; margin: 0 0 15px 0;">
                                    ${escapeHtml(content.testimonial)}
                                </p>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <div style="width: 3px; height: 30px; background: ${content.accentColor}; border-radius: 2px;"></div>
                                    <div>
                                        <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0;">${escapeHtml(content.customerName)}</p>
                                        <p style="font-size: 14px; color: #64748b; margin: 0;">${escapeHtml(content.customerTitle)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
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

        createInput('Customer Name', 'customerName', 'text', 'Mike Chen', null, content, contentContainer);
        createInput('Customer Title', 'customerTitle', 'text', 'CEO, StartupX', null, content, contentContainer);
        createInput('Testimonial Text', 'testimonial', 'textarea', 'Working with this platform increased our conversions by 300%. Simply amazing!', null, content, contentContainer);
        createInput('Customer Image URL', 'customerImage', 'text', 'https://placehold.co/80x80/10b981/ffffff?text=MC', null, content, contentContainer);
        createInput('Company Logo URL', 'companyLogo', 'text', '', null, content, contentContainer);

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

        createInput('Background Color', 'backgroundColor', 'color', '#f0fdf4', null, content, styleContainer);
        createInput('Accent Color', 'accentColor', 'color', '#10b981', null, content, styleContainer);
        createInput('Border Color', 'borderColor', 'color', '#bbf7d0', null, content, styleContainer);
    }
});