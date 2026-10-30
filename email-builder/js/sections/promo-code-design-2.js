SectionRegistry.register('promo-code-design-2', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'FLASH SALE',
            subtitle: '48 Hours Only',
            promoCode: 'FLASH48',
            promoDiscount: '50% OFF',
            promoDescription: 'Our biggest sale of the year.',
            buttonText: 'Shop Now',
            buttonLink: '#',
            buttonBackground: '#ef4444',
            buttonColor: '#ffffff',
            buttonFontSize: '14px',
            buttonPadding: '12px 24px',
            backgroundColor: '#fef2f2',
            headerColor: '#ef4444',
            codeColor: '#ef4444',
            borderRadius: '0px',
            textAlign: 'center'
        };
    },

    generateContent: function(section) {
        const content = section.content;

        return `
            <div style="background-color: ${content.backgroundColor}; border-radius: ${content.borderRadius}; padding: 25px 20px; text-align: center; border: 2px solid ${content.headerColor};">
                <div style="background-color: ${content.headerColor}; color: #ffffff; padding: 8px 16px; border-radius: 6px; display: inline-block; margin-bottom: 15px;">
                    <span style="font-size: 14px; font-weight: 700; letter-spacing: 1px;">${escapeHtml(content.subtitle)}</span>
                </div>
                <h2 style="font-size: 28px; color: ${content.headerColor}; margin: 0 0 15px 0; font-weight: 700; letter-spacing: -1px;">
                    ${escapeHtml(content.title)}
                </h2>
                <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 0 auto 20px; max-width: 350px;">
                    <p style="font-size: 14px; color: #64748b; margin: 0 0 5px 0; text-transform: uppercase; font-weight: 600;">${escapeHtml(content.promoDiscount)}</p>
                    <p style="font-size: 32px; font-family: 'Courier New', monospace; font-weight: 800; color: ${content.codeColor}; margin: 5px 0; letter-spacing: 6px;">
                        ${escapeHtml(content.promoCode)}
                    </p>
                    <p style="font-size: 13px; color: #94a3b8; margin: 5px 0 0 0;">${escapeHtml(content.promoDescription)}</p>
                </div>
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

        // Promo Code Content
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

        createInput('Title', 'title', 'text', 'FLASH SALE', null, content, codeContainer);
        createInput('Subtitle', 'subtitle', 'text', '48 Hours Only', null, content, codeContainer);
        createInput('Promo Code', 'promoCode', 'text', 'FLASH48', null, content, codeContainer);
        createInput('Discount Text', 'promoDiscount', 'text', '50% OFF', null, content, codeContainer);
        createInput('Description', 'promoDescription', 'text', 'Our biggest sale of the year.', null, content, codeContainer);

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

        createInput('Background Color', 'backgroundColor', 'color', '#fef2f2', null, content, styleContainer);
        createInput('Header/Border Color', 'headerColor', 'color', '#ef4444', null, content, styleContainer);
        createInput('Code Color', 'codeColor', 'color', '#ef4444', null, content, styleContainer);
        createInput('Border Radius', 'borderRadius', 'text', '0px', null, content, styleContainer);

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

        createInput('Button Text', 'buttonText', 'text', 'Shop Now', null, content, btnContainer);
        createInput('Button Link', 'buttonLink', 'text', '#', null, content, btnContainer);
        createInput('Button Background', 'buttonBackground', 'color', '#ef4444', null, content, btnContainer);
        createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, btnContainer);
    }
});