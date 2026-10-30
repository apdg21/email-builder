SectionRegistry.register('promo-code-design-1', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Limited Time Offer',
            subheadline: 'Use code below at checkout',
            promoCode: 'SAVE20',
            promoDiscount: '20% OFF',
            promoDescription: 'Use this code at checkout to get 20% off your order.',
            expirationText: 'Offer ends soon!',
            buttonText: 'Redeem Now',
            buttonLink: '#',
            buttonBackground: '#3b82f6',
            buttonColor: '#ffffff',
            buttonFontSize: '14px',
            buttonPadding: '10px 20px',
            showCountdown: false,
            countdownDate: '2026-12-31 23:59:59',
            backgroundColor: '#f8fafc',
            borderColor: '#e2e8f0',
            borderRadius: '12px',
            codeBackground: '#ffffff',
            codeTextColor: '#0f172a',
            textAlign: 'center'
        };
    },

    generateContent: function(section) {
        const content = section.content;

        return `
            <div style="background-color: ${content.backgroundColor}; border: 2px dashed ${content.borderColor}; border-radius: ${content.borderRadius}; padding: 30px 20px; text-align: center;">
                ${content.title ? `<h2 style="font-size: 24px; color: #0f172a; margin: 0 0 10px 0; font-weight: 700;">${escapeHtml(content.title)}</h2>` : ''}
                ${content.subheadline ? `<p style="font-size: 14px; color: #64748b; margin: 0 0 20px 0;">${escapeHtml(content.subheadline)}</p>` : ''}

                <div style="background-color: ${content.codeBackground}; border: 1px solid ${content.borderColor}; border-radius: 8px; padding: 15px; margin: 0 auto 20px; display: inline-block;">
                    <p style="font-size: 28px; font-family: 'Courier New', monospace; font-weight: 700; color: ${content.codeTextColor}; margin: 0; letter-spacing: 4px;">
                        ${escapeHtml(content.promoCode)}
                    </p>
                    <p style="font-size: 16px; color: #10b981; font-weight: 700; margin: 5px 0 0 0;">
                        ${escapeHtml(content.promoDiscount)}
                    </p>
                </div>

                ${content.promoDescription ? `<p style="font-size: 14px; color: #475569; margin: 0 0 15px 0; max-width: 400px; margin-left: auto; margin-right: auto;">${escapeHtml(content.promoDescription)}</p>` : ''}
                ${content.expirationText ? `<p style="font-size: 13px; color: #ef4444; font-weight: 600; margin: 0 0 15px 0;">${escapeHtml(content.expirationText)}</p>` : ''}

                <table cellpadding="0" cellspacing="0" border="0" align="center">
                    <tr>
                        <td style="background-color: ${content.buttonBackground}; border-radius: 6px;">
                            <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: 6px; font-weight: 600;">
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

        // Promo Code Settings
        const codeDetails = document.createElement('details');
        codeDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        codeDetails.open = true;
        const codeSummary = document.createElement('summary');
        codeSummary.textContent = 'Promo Code Content';
        codeSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        codeDetails.appendChild(codeSummary);
        const codeContainer = document.createElement('div');
        codeContainer.classList.add('space-y-2');
        codeDetails.appendChild(codeContainer);
        container.appendChild(codeDetails);

        createInput('Title', 'title', 'text', 'Limited Time Offer', null, content, codeContainer);
        createInput('Subheadline', 'subheadline', 'text', 'Use code below at checkout', null, content, codeContainer);
        createInput('Promo Code', 'promoCode', 'text', 'SAVE20', null, content, codeContainer);
        createInput('Discount Text', 'promoDiscount', 'text', '20% OFF', null, content, codeContainer);
        createInput('Promo Description', 'promoDescription', 'text', 'Use this code at checkout to get 20% off your order.', null, content, codeContainer);
        createInput('Expiration Text', 'expirationText', 'text', 'Offer ends soon!', null, content, codeContainer);

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

        createInput('Background Color', 'backgroundColor', 'color', '#f8fafc', null, content, styleContainer);
        createInput('Border Color', 'borderColor', 'color', '#e2e8f0', null, content, styleContainer);
        createInput('Border Radius', 'borderRadius', 'text', '12px', null, content, styleContainer);
        createInput('Code Background', 'codeBackground', 'color', '#ffffff', null, content, styleContainer);
        createInput('Code Text Color', 'codeTextColor', 'color', '#0f172a', null, content, styleContainer);

        // Button
        const btnDetails = document.createElement('details');
        btnDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        btnDetails.open = false;
        const btnSummary = document.createElement('summary');
        btnSummary.textContent = 'Button';
        btnSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        btnDetails.appendChild(btnSummary);
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('space-y-2');
        btnDetails.appendChild(btnContainer);
        container.appendChild(btnDetails);

        createInput('Button Text', 'buttonText', 'text', 'Redeem Now', null, content, btnContainer);
        createInput('Button Link', 'buttonLink', 'text', '#', null, content, btnContainer);
        createInput('Button Background', 'buttonBackground', 'color', '#3b82f6', null, content, btnContainer);
        createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, btnContainer);
    }
});