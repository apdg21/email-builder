SectionRegistry.register('text-image', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            imageUrl: 'https://placehold.co/300x200/3a86ff/ffffff?text=Image',
            altText: 'Content Image',
            text: 'This is some text next to an image. You can edit this content.',
            fontSize: '16px',
            lineHeight: '1.5',
            textColor: '#333333',
            textAlign: 'left',
            imagePosition: 'left',
            imageWidth: '50%',
            textWidth: '50%',
            verticalAlign: 'middle',
            
            // Image border settings
            imageBorderRadius: '0px',
            imageBorderWidth: '0px',
            imageBorderColor: '#000000',
            imageBorderStyle: 'solid',
            
            // Button settings
            showButton: false,
            buttonText: 'Learn More',
            buttonLink: '#',
            buttonBackground: '#007bff',
            buttonColor: '#ffffff',
            buttonFontSize: '14px',
            buttonPadding: '8px 16px',
            buttonBorderRadius: '4px',
            buttonAlign: 'left',
            
            // Mobile settings
            mobileBreakpoint: '480px',
            mobileStackOrder: 'image-first', // 'image-first' or 'text-first'
            mobileImageWidth: '100%',
            mobileTextWidth: '100%',
            mobileImageMargin: '0 0 20px 0',
            mobileTextMargin: '0',
            mobileImageBorderRadius: '0px',
            mobileFontSize: '15px',
            mobileButtonWidth: '100%',
            mobileButtonPadding: '10px 20px'
        };
    },

    generateContent: function(section) {
        const content = section.content;
        const uid = 'ti_' + String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');
        const imagePosition = content.imagePosition || 'left';
        const textWidth = content.textWidth || '50%';
        const imageWidth = content.imageWidth || '50%';
        const breakpoint = content.mobileBreakpoint || '480px';
        const isImageFirstOnMobile = (content.mobileStackOrder !== 'text-first');
        
        // Image style with border options
        const imageStyle = `
            display: block; 
            width: 100%; 
            max-width: 100%; 
            height: auto; 
            border: ${content.imageBorderWidth} ${content.imageBorderStyle} ${content.imageBorderColor};
            border-radius: ${content.imageBorderRadius};
        `;
        
        const imgHtml = `
            <img class="ti-img-${uid}" src="${content.imageUrl}" alt="${escapeHtml(content.altText)}" style="${imageStyle}" />
        `;
        
        let textHtml = `
            <p class="ti-p-${uid}" style="font-size: ${content.fontSize}; line-height: ${content.lineHeight}; color: ${content.textColor}; margin: 0; text-align: ${content.textAlign};">${escapeHtml(content.text)}</p>
        `;
        
        if (content.showButton) {
            textHtml += `
                <table cellpadding="0" cellspacing="0" border="0" align="${content.buttonAlign}" class="ti-btn-table-${uid}" style="margin-top: 15px;">
                    <tr>
                        <td style="background-color: ${content.buttonBackground}; border-radius: ${content.buttonBorderRadius};">
                            <a href="${content.buttonLink}" class="ti-btn-${uid}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: ${content.buttonBorderRadius};">${escapeHtml(content.buttonText)}</a>
                        </td>
                    </tr>
                </table>
            `;
        }

        // Image Column Cell
        const imgCell = `
            <td class="ti-col-${uid} ti-img-cell-${uid}" width="${imageWidth}" valign="${content.verticalAlign}" align="center" dir="ltr" style="width: ${imageWidth}; vertical-align: ${content.verticalAlign}; padding: ${imagePosition === 'left' ? '0 20px 0 0' : '0 0 0 20px'}; box-sizing: border-box;">
                <div style="width: 100%; text-align: center;">
                    ${imgHtml}
                </div>
            </td>
        `;

        // Text Column Cell
        const textCell = `
            <td class="ti-col-${uid} ti-txt-cell-${uid}" width="${textWidth}" valign="${content.verticalAlign}" align="${content.textAlign}" dir="ltr" style="width: ${textWidth}; vertical-align: ${content.verticalAlign}; padding: 0; box-sizing: border-box;">
                ${textHtml}
            </td>
        `;

        // Determine Table Direction & Cell Order to support mobile stacking order without DOM duplication
        let tableDir = 'ltr';
        let cellsHtml = '';

        if (isImageFirstOnMobile) {
            // Mobile: imgCell first, textCell second
            cellsHtml = imgCell + textCell;
            // Desktop: if imagePosition is 'right', flip direction so text shows on left, img on right
            tableDir = (imagePosition === 'right') ? 'rtl' : 'ltr';
        } else {
            // Mobile: textCell first, imgCell second
            cellsHtml = textCell + imgCell;
            // Desktop: if imagePosition is 'left', flip direction so img shows on left, text on right
            tableDir = (imagePosition === 'left') ? 'rtl' : 'ltr';
        }

        // Responsive styles
        const responsiveStyles = `
            <style>
                .ti-img-${uid} {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .ti-img-${uid}:hover {
                    transform: scale(1.02);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
                
                @media only screen and (max-width: 480px), only screen and (max-width: ${breakpoint}) {
                    .ti-table-${uid} {
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                    .ti-col-${uid} {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        direction: ltr !important;
                        box-sizing: border-box !important;
                        padding: 0 !important;
                    }
                    .ti-img-cell-${uid} {
                        width: ${content.mobileImageWidth || '100%'} !important;
                        margin: ${content.mobileImageMargin || '0 0 20px 0'} !important;
                        text-align: center !important;
                    }
                    .ti-txt-cell-${uid} {
                        width: ${content.mobileTextWidth || '100%'} !important;
                        margin: ${content.mobileTextMargin || '0'} !important;
                    }
                    .ti-img-${uid} {
                        width: 100% !important;
                        max-width: 100% !important;
                        height: auto !important;
                        border-radius: ${content.mobileImageBorderRadius || content.imageBorderRadius} !important;
                        margin: 0 auto !important;
                    }
                    .ti-p-${uid} {
                        font-size: ${content.mobileFontSize || content.fontSize} !important;
                        text-align: center !important;
                    }
                    .ti-btn-table-${uid} {
                        width: 100% !important;
                        margin-left: auto !important;
                        margin-right: auto !important;
                    }
                    .ti-btn-table-${uid} td {
                        display: block !important;
                        width: 100% !important;
                        text-align: center !important;
                    }
                    .ti-btn-${uid} {
                        width: ${content.mobileButtonWidth || '100%'} !important;
                        padding: ${content.mobileButtonPadding || '10px 20px'} !important;
                        box-sizing: border-box !important;
                        display: inline-block !important;
                        text-align: center !important;
                    }
                }
                
                @media only screen and (max-width: 360px) {
                    .ti-btn-${uid} {
                        font-size: 13px !important;
                        padding: 8px 16px !important;
                    }
                }
            </style>
        `;
        
        return `
            ${responsiveStyles}
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="text-image-table ti-table-${uid}" dir="${tableDir}">
                <tr>
                    ${cellsHtml}
                </tr>
            </table>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;
        
        // Image Settings
        const imageDetails = document.createElement('details');
        imageDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        imageDetails.open = true;
        const imageSummary = document.createElement('summary');
        imageSummary.textContent = 'Image Settings';
        imageSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        imageDetails.appendChild(imageSummary);
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('space-y-2');
        imageDetails.appendChild(imageContainer);
        container.appendChild(imageDetails);
        
        createInput('Image URL', 'imageUrl', 'text', 'https://placehold.co/300x200/3a86ff/ffffff?text=Image', null, content, imageContainer);
        createInput('Alt Text', 'altText', 'text', 'Content Image', null, content, imageContainer);
        createInput('Image Position', 'imagePosition', 'select', 'left', [
            {value: 'left', label: 'Left'},
            {value: 'right', label: 'Right'}
        ], content, imageContainer);
        createInput('Image Width', 'imageWidth', 'text', '50%', null, content, imageContainer);
        createInput('Border Radius', 'imageBorderRadius', 'text', '0px', null, content, imageContainer);
        createInput('Border Width', 'imageBorderWidth', 'text', '0px', null, content, imageContainer);
        createInput('Border Color', 'imageBorderColor', 'color', '#000000', null, content, imageContainer);
        createInput('Border Style', 'imageBorderStyle', 'select', 'solid', [
            {value: 'solid', label: 'Solid'},
            {value: 'dashed', label: 'Dashed'},
            {value: 'dotted', label: 'Dotted'},
            {value: 'none', label: 'None'}
        ], content, imageContainer);
        
        // Text Settings
        const textDetails = document.createElement('details');
        textDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        textDetails.open = true;
        const textSummary = document.createElement('summary');
        textSummary.textContent = 'Text Settings';
        textSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        textDetails.appendChild(textSummary);
        const textContainer = document.createElement('div');
        textContainer.classList.add('space-y-2');
        textDetails.appendChild(textContainer);
        container.appendChild(textDetails);
        
        createInput('Text Content', 'text', 'textarea', 'This is some text next to an image.', null, content, textContainer);
        createInput('Font Size', 'fontSize', 'text', '16px', null, content, textContainer);
        createInput('Line Height', 'lineHeight', 'text', '1.5', null, content, textContainer);
        createInput('Text Color', 'textColor', 'color', '#333333', null, content, textContainer);
        createInput('Text Align', 'textAlign', 'select', 'left', [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
            {value: 'right', label: 'Right'}
        ], content, textContainer);
        createInput('Text Width', 'textWidth', 'text', '50%', null, content, textContainer);
        createInput('Vertical Align', 'verticalAlign', 'select', 'middle', [
            {value: 'top', label: 'Top'},
            {value: 'middle', label: 'Middle'},
            {value: 'bottom', label: 'Bottom'}
        ], content, textContainer);
        createInput('Font Family', 'fontFamily', 'select', 'Arial, Helvetica, sans-serif', fontOptions, content, textContainer);
        
        // Button Settings
        const buttonDetails = document.createElement('details');
        buttonDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        buttonDetails.open = true;
        const buttonSummary = document.createElement('summary');
        buttonSummary.textContent = 'Button Settings';
        buttonSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        buttonDetails.appendChild(buttonSummary);
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('space-y-2');
        buttonDetails.appendChild(buttonContainer);
        container.appendChild(buttonDetails);
        
        createCheckbox('Show Button', 'showButton', content, buttonContainer);
        if (content.showButton) {
            createInput('Button Text', 'buttonText', 'text', 'Learn More', null, content, buttonContainer);
            createInput('Button Link', 'buttonLink', 'text', '#', null, content, buttonContainer);
            createInput('Button Background', 'buttonBackground', 'color', '#007bff', null, content, buttonContainer);
            createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, buttonContainer);
            createInput('Button Font Size', 'buttonFontSize', 'text', '14px', null, content, buttonContainer);
            createInput('Button Padding', 'buttonPadding', 'text', '8px 16px', null, content, buttonContainer);
            createInput('Button Border Radius', 'buttonBorderRadius', 'text', '4px', null, content, buttonContainer);
            createInput('Button Align', 'buttonAlign', 'select', 'left', [
                {value: 'left', label: 'Left'},
                {value: 'center', label: 'Center'},
                {value: 'right', label: 'Right'}
            ], content, buttonContainer);
        }
        
        // Mobile Settings
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
        
        createInput('Mobile Breakpoint', 'mobileBreakpoint', 'text', '480px', null, content, mobileContainer);
        createInput('Stack Order', 'mobileStackOrder', 'select', 'image-first', [
            {value: 'image-first', label: 'Image First, Then Text'},
            {value: 'text-first', label: 'Text First, Then Image'}
        ], content, mobileContainer);
        createInput('Image Width (Mobile)', 'mobileImageWidth', 'text', '100%', null, content, mobileContainer);
        createInput('Text Width (Mobile)', 'mobileTextWidth', 'text', '100%', null, content, mobileContainer);
        createInput('Image Margin (Mobile)', 'mobileImageMargin', 'text', '0 0 20px 0', null, content, mobileContainer);
        createInput('Text Margin (Mobile)', 'mobileTextMargin', 'text', '0', null, content, mobileContainer);
        createInput('Image Border Radius (Mobile)', 'mobileImageBorderRadius', 'text', '0px', null, content, mobileContainer);
        createInput('Font Size (Mobile)', 'mobileFontSize', 'text', '15px', null, content, mobileContainer);
        createInput('Button Width (Mobile)', 'mobileButtonWidth', 'text', '100%', null, content, mobileContainer);
        createInput('Button Padding (Mobile)', 'mobileButtonPadding', 'text', '10px 20px', null, content, mobileContainer);
    }
});