SectionRegistry.register('product-card-flip', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            // Desktop Layout
            imagePosition: 'left', // 'left' or 'right'
            showBadge: true,
            badgeText: 'NO. 1',
            badgeColor: '#C8692B',
            badgeFontSize: '13px',
            title: 'Pumpkin Patch Magic Quilt Pattern 🎃',
            titleFontSize: '22px',
            titleColor: '#3B3A33',
            headingFontFamily: 'Georgia, serif',
            description: 'Festive pumpkin blocks designed for fast assembly and cheerful autumn decorating.',
            descriptionFontSize: '15px',
            descriptionColor: '#4A473E',
            fontFamily: 'Arial, Helvetica, sans-serif',
            showPrice: false,
            price: '$12.00',
            originalPrice: '$15.00',
            priceColor: '#2F3A2A',
            imageUrl: 'https://placehold.co/533x400/f3f4f6/3b3a33?text=Product+Photo',
            imageLink: '#',
            showButton: true,
            buttonText: 'Shop Now →',
            buttonLink: '#',
            buttonBackground: '#BDC4A3',
            buttonColor: '#2F3A2A',
            buttonFontSize: '13px',
            buttonPadding: '12px 20px',
            buttonBorderRadius: '4px',
            cardBackground: '#F9F6F0',
            cardBorderRadius: '6px',
            cardBorderColor: '#E4DED0',
            cardBorderWidth: '0px',
            contentPadding: '24px 22px',

            // Mobile Settings (matches email industry standard & text-image pattern)
            mobileBreakpoint: '480px', // 480px so 600px desktop stays 2-columns
            mobileStackOrder: 'image-first', // 'image-first' or 'text-first'
            mobileImageWidth: '100%',
            mobileImageMargin: '0',
            mobileTextPadding: '20px 18px',
            mobileFontSize: '14px',
            mobileTitleFontSize: '20px',
            mobileTextAlign: 'left', // 'left' or 'center'
            mobileButtonWidth: '100%' // '100%' or 'auto'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const uid = 'pcard_' + String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');

        // Badge
        const badgeHtml = c.showBadge ? `
            <div style="font-family: ${c.headingFontFamily || 'Georgia, serif'}; font-size: ${c.badgeFontSize || '13px'}; letter-spacing: 3px; font-weight: 700; text-transform: uppercase; color: ${c.badgeColor}; margin-bottom: 6px;">
                ${escapeHtml(c.badgeText)}
            </div>` : '';

        // Price
        const priceHtml = c.showPrice ? `
            <div style="margin: 10px 0 6px 0; font-size: 16px; font-weight: 700; color: ${c.priceColor};">
                ${escapeHtml(c.price)}
                ${c.originalPrice ? `<span style="text-decoration: line-through; color: #9ca3af; font-weight: normal; margin-left: 6px; font-size: 14px;">${escapeHtml(c.originalPrice)}</span>` : ''}
            </div>` : '';

        // Button
        const buttonHtml = c.showButton ? `
            <table cellpadding="0" cellspacing="0" border="0" class="prod-btn-table-${uid}" style="margin-top: 16px;">
                <tr>
                    <td align="left" style="background-color: ${c.buttonBackground}; border-radius: ${c.buttonBorderRadius};">
                        <a href="${c.buttonLink}" class="prod-btn-${uid}" style="display: inline-block; padding: ${c.buttonPadding}; font-size: ${c.buttonFontSize}; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; color: ${c.buttonColor}; text-decoration: none; border-radius: ${c.buttonBorderRadius};">
                            ${escapeHtml(c.buttonText)}
                        </a>
                    </td>
                </tr>
            </table>` : '';

        // Image Column Cell
        const imgCell = `
            <td class="prod-col-${uid}" width="50%" valign="middle" align="center" dir="ltr" style="width: 50%; font-size: 0; line-height: 0; padding: 0;">
                <a href="${c.imageLink || '#'}" style="text-decoration: none; display: block;">
                    <img src="${c.imageUrl}" alt="${escapeHtml(c.title)}" class="prod-img-${uid}" style="width: 100%; max-width: 100%; height: auto; display: block; border: 0;" />
                </a>
            </td>`;

        // Text Column Cell
        const textCell = `
            <td class="prod-col-${uid} prod-text-${uid}" width="50%" valign="middle" align="left" dir="ltr" style="width: 50%; padding: ${c.contentPadding}; text-align: left; font-family: ${c.fontFamily}; box-sizing: border-box;">
                ${badgeHtml}
                <h3 style="margin: 0 0 10px 0; font-family: ${c.headingFontFamily || 'Georgia, serif'}; font-size: ${c.titleFontSize}; line-height: 1.25; font-weight: 700; color: ${c.titleColor};">
                    ${escapeHtml(c.title)}
                </h3>
                <p style="margin: 0; font-size: ${c.descriptionFontSize}; line-height: 1.55; color: ${c.descriptionColor};">
                    ${escapeHtml(c.description)}
                </p>
                ${priceHtml}
                ${buttonHtml}
            </td>`;

        // Determine Table Direction & Cell Order:
        // By controlling table direction and cell order, on desktop it renders 2-columns (left/right),
        // and on mobile (display: block) it stacks in the exact mobileStackOrder requested!
        const isImageFirstOnMobile = (c.mobileStackOrder === 'image-first');
        let tableDir = 'ltr';
        let cellsHtml = '';

        if (isImageFirstOnMobile) {
            // Mobile: imgCell is on top, textCell is on bottom
            cellsHtml = imgCell + textCell;
            // Desktop: if imagePosition is 'right', use dir="rtl" so imgCell shows on the right!
            tableDir = (c.imagePosition === 'right') ? 'rtl' : 'ltr';
        } else {
            // Mobile: textCell is on top, imgCell is on bottom
            cellsHtml = textCell + imgCell;
            // Desktop: if imagePosition is 'left', use dir="rtl" so imgCell shows on the left!
            tableDir = (c.imagePosition === 'left') ? 'rtl' : 'ltr';
        }

        const responsiveStyles = `
            <style>
                @media only screen and (max-width: ${c.mobileBreakpoint || '480px'}) {
                    .prod-col-${uid} {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        direction: ltr !important;
                        box-sizing: border-box !important;
                    }
                    .prod-img-${uid} {
                        width: ${c.mobileImageWidth || '100%'} !important;
                        max-width: 100% !important;
                        height: auto !important;
                        margin: ${c.mobileImageMargin || '0'} !important;
                    }
                    .prod-text-${uid} {
                        width: 100% !important;
                        padding: ${c.mobileTextPadding || '20px 18px'} !important;
                        text-align: ${c.mobileTextAlign || 'left'} !important;
                        box-sizing: border-box !important;
                    }
                    .prod-text-${uid} h3 {
                        font-size: ${c.mobileTitleFontSize || '20px'} !important;
                    }
                    .prod-text-${uid} p {
                        font-size: ${c.mobileFontSize || '14px'} !important;
                    }
                    ${c.mobileButtonWidth === '100%' ? `
                    .prod-btn-table-${uid} {
                        width: 100% !important;
                    }
                    .prod-btn-${uid} {
                        display: block !important;
                        width: 100% !important;
                        text-align: center !important;
                        box-sizing: border-box !important;
                    }` : ''}
                }
            </style>
        `;

        return `
            ${responsiveStyles}
            <div style="padding: 10px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" dir="${tableDir}" style="direction: ${tableDir}; background-color: ${c.cardBackground}; border: ${c.cardBorderWidth} solid ${c.cardBorderColor}; border-radius: ${c.cardBorderRadius}; overflow: hidden;">
                    <tr>
                        ${cellsHtml}
                    </tr>
                </table>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        // 1. Layout & Card Settings
        const layoutDetails = document.createElement('details');
        layoutDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        layoutDetails.open = true;
        const layoutSummary = document.createElement('summary');
        layoutSummary.textContent = 'Layout & Card (Desktop)';
        layoutSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        layoutDetails.appendChild(layoutSummary);
        const layoutContainer = document.createElement('div');
        layoutContainer.classList.add('space-y-2');
        layoutDetails.appendChild(layoutContainer);
        container.appendChild(layoutDetails);

        createInput('Image Side (Desktop)', 'imagePosition', 'select', 'left', [
            {value: 'left', label: 'Image Left, Text Right'},
            {value: 'right', label: 'Image Right, Text Left'}
        ], content, layoutContainer);
        createInput('Card Background', 'cardBackground', 'color', '#F9F6F0', null, content, layoutContainer);
        createInput('Border Radius', 'cardBorderRadius', 'text', '6px', null, content, layoutContainer);
        createInput('Border Width', 'cardBorderWidth', 'text', '0px', null, content, layoutContainer);
        createInput('Border Color', 'cardBorderColor', 'color', '#E4DED0', null, content, layoutContainer);
        createInput('Desktop Content Padding', 'contentPadding', 'text', '24px 22px', null, content, layoutContainer);

        // 2. Mobile Responsive Settings
        const mobileDetails = document.createElement('details');
        mobileDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        mobileDetails.open = true;
        const mobileSummary = document.createElement('summary');
        mobileSummary.textContent = 'Mobile Settings';
        mobileSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        mobileDetails.appendChild(mobileSummary);
        const mobileContainer = document.createElement('div');
        mobileContainer.classList.add('space-y-2');
        mobileDetails.appendChild(mobileContainer);
        container.appendChild(mobileDetails);

        createInput('Stack Order (Mobile)', 'mobileStackOrder', 'select', 'image-first', [
            {value: 'image-first', label: 'Image First, Then Text (Stacked)'},
            {value: 'text-first', label: 'Text First, Then Image (Stacked)'}
        ], content, mobileContainer);
        createInput('Mobile Breakpoint', 'mobileBreakpoint', 'text', '480px', null, content, mobileContainer);
        createInput('Text Align (Mobile)', 'mobileTextAlign', 'select', 'left', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'}
        ], content, mobileContainer);
        createInput('Title Font Size (Mobile)', 'mobileTitleFontSize', 'text', '20px', null, content, mobileContainer);
        createInput('Body Font Size (Mobile)', 'mobileFontSize', 'text', '14px', null, content, mobileContainer);
        createInput('Text Padding (Mobile)', 'mobileTextPadding', 'text', '20px 18px', null, content, mobileContainer);
        createInput('Button Width (Mobile)', 'mobileButtonWidth', 'select', '100%', [
            {value: '100%', label: 'Full Width (100%)'},
            {value: 'auto', label: 'Auto (Fit Content)'}
        ], content, mobileContainer);

        // 3. Product Image Settings
        const imgDetails = document.createElement('details');
        imgDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        imgDetails.open = true;
        const imgSummary = document.createElement('summary');
        imgSummary.textContent = 'Product Image';
        imgSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        imgDetails.appendChild(imgSummary);
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('space-y-2');
        imgDetails.appendChild(imgContainer);
        container.appendChild(imgDetails);

        createInput('Image URL', 'imageUrl', 'text', 'https://placehold.co/533x400/f3f4f6/3b3a33?text=Product+Photo', null, content, imgContainer);
        createInput('Image Click Link', 'imageLink', 'text', '#', null, content, imgContainer);

        // 4. Product Info & Typography
        const contentDetails = document.createElement('details');
        contentDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        contentDetails.open = true;
        const contentSummary = document.createElement('summary');
        contentSummary.textContent = 'Product Info';
        contentSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        contentDetails.appendChild(contentSummary);
        const contentContainer = document.createElement('div');
        contentContainer.classList.add('space-y-2');
        contentDetails.appendChild(contentContainer);
        container.appendChild(contentDetails);

        createCheckbox('Show Badge / Label', 'showBadge', content, contentContainer);
        if (content.showBadge) {
            createInput('Badge Text', 'badgeText', 'text', 'NO. 1', null, content, contentContainer);
            createInput('Badge Color', 'badgeColor', 'color', '#C8692B', null, content, contentContainer);
            createInput('Badge Font Size', 'badgeFontSize', 'text', '13px', null, content, contentContainer);
        }

        createInput('Product Title', 'title', 'text', 'Pumpkin Patch Magic Quilt Pattern 🎃', null, content, contentContainer);
        createInput('Title Font Size', 'titleFontSize', 'text', '22px', null, content, contentContainer);
        createInput('Title Color', 'titleColor', 'color', '#3B3A33', null, content, contentContainer);
        createInput('Description', 'description', 'textarea', 'Festive pumpkin blocks designed for fast assembly.', null, content, contentContainer);
        createInput('Description Font Size', 'descriptionFontSize', 'text', '15px', null, content, contentContainer);
        createInput('Description Color', 'descriptionColor', 'color', '#4A473E', null, content, contentContainer);

        createCheckbox('Show Price', 'showPrice', content, contentContainer);
        if (content.showPrice) {
            createInput('Price', 'price', 'text', '$12.00', null, content, contentContainer);
            createInput('Original Price (Strikethrough)', 'originalPrice', 'text', '$15.00', null, content, contentContainer);
            createInput('Price Color', 'priceColor', 'color', '#2F3A2A', null, content, contentContainer);
        }

        // 5. CTA Button Settings
        const btnDetails = document.createElement('details');
        btnDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        btnDetails.open = true;
        const btnSummary = document.createElement('summary');
        btnSummary.textContent = 'CTA Button';
        btnSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        btnDetails.appendChild(btnSummary);
        const btnContainer = document.createElement('div');
        btnContainer.classList.add('space-y-2');
        btnDetails.appendChild(btnContainer);
        container.appendChild(btnDetails);

        createCheckbox('Show Button', 'showButton', content, btnContainer);
        if (content.showButton) {
            createInput('Button Text', 'buttonText', 'text', 'Shop Now →', null, content, btnContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, btnContainer);
            createInput('Button Background', 'buttonBackground', 'color', '#BDC4A3', null, content, btnContainer);
            createInput('Button Text Color', 'buttonColor', 'color', '#2F3A2A', null, content, btnContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '13px', null, content, btnContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '12px 20px', null, content, btnContainer);
            createInput('Border Radius', 'buttonBorderRadius', 'text', '4px', null, content, btnContainer);
        }
    }
});
