// Hero / Banner — Email-derived section
// Source: "You just gained an extra hour" email, hero copy + image block
// Category: Hero / Banner
SectionRegistry.register('hero-email', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            backgroundType: 'image',
            backgroundImage: 'https://placehold.co/600x400/EEEEEE/808080?text=Hero+Image',
            overlayColor: 'rgba(0,0,0,0.3)',
            heroBackground: '#F5F2EB',
            eyebrowText: 'One bonus hour  •  One cozy session',
            eyebrowColor: '#9B046F',
            eyebrowFontSize: '10px',
            headline: 'YOU JUST GAINED AN EXTRA HOUR: HERE\'S HOW TO STITCH IT',
            headlineColor: '#2E2A39',
            headlineFontSize: '32px',
            headlineEmoji: '✨',
            bodyCopy: 'Daylight saving time gave you 60 bonus minutes today! Grab a warm mug of coffee, turn on your iron, and let\'s make the most of your extra sewing time.',
            bodyCopyColor: '#4A4453',
            bodyCopyFontSize: '15px',
            heroPadding: '44px 46px 38px 46px',
            heroTextAlign: 'center',
            mobileHeadlineFontSize: '22px',
            mobileEyebrowFontSize: '9px',
            mobileBodyCopyFontSize: '14px',
            mobilePadding: '28px 18px 24px 18px'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const uid = 'heroemail_' + String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');
        const align = c.heroTextAlign || 'center';
        // Build background style: image takes precedence when present
        let bgStyle;
        if (c.backgroundType === 'image' && c.backgroundImage) {
            bgStyle = `background-image: linear-gradient(${c.overlayColor || 'rgba(0,0,0,0.3)'}, ${c.overlayColor || 'rgba(0,0,0,0.3)'}), url(${c.backgroundImage}); background-size: cover; background-position: center; background-repeat: no-repeat;`;
        } else if (c.backgroundType === 'gradient' && c.backgroundGradient) {
            bgStyle = `background: ${c.backgroundGradient};`;
        } else {
            bgStyle = `background-color: ${c.heroBackground};`;
        }
        return `
            <style>
                @media only screen and (max-width: 480px) {
                    .hero-cell-${uid} {
                        padding: ${c.mobilePadding || '28px 18px 24px 18px'} !important;
                    }
                    .hero-eyebrow-${uid} {
                        font-size: ${c.mobileEyebrowFontSize || '9px'} !important;
                        letter-spacing: 1.8px !important;
                        line-height: 14px !important;
                    }
                    .hero-hd-${uid} {
                        font-size: ${c.mobileHeadlineFontSize || '22px'} !important;
                        line-height: 30px !important;
                        letter-spacing: 0.2px !important;
                        padding: 10px 0 12px 0 !important;
                    }
                    .hero-body-${uid} {
                        font-size: ${c.mobileBodyCopyFontSize || '14px'} !important;
                        line-height: 22px !important;
                        padding: 0 !important;
                    }
                }
            </style>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td align="${align}" class="hero-cell-${uid}" style="${bgStyle};padding:${c.heroPadding};">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="${align}" style="padding-bottom:18px;">
                                    <span class="hero-eyebrow-${uid}" style="font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:${c.eyebrowFontSize};line-height:14px;letter-spacing:3.2px;text-transform:uppercase;color:${c.eyebrowColor};font-weight:600;">${escapeHtml(c.eyebrowText)}</span>
                                </td>
                            </tr>
                            <tr>
                                <td align="${align}" style="padding-bottom:8px;">
                                    <div style="width:52px;height:2px;background-color:#9B046F;font-size:0;line-height:0;${align === 'center' ? 'margin:0 auto;' : align === 'right' ? 'margin-left:auto;' : ''}">&nbsp;</div>
                                </td>
                            </tr>
                            <tr>
                                <td align="${align}" class="hero-hd-${uid}" style="font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:${c.headlineFontSize};line-height:42px;font-weight:600;letter-spacing:0.4px;color:${c.headlineColor};padding:14px 0 16px 0;">
                                    ${c.headlineEmoji ? escapeHtml(c.headlineEmoji) + ' ' : ''}${escapeHtml(c.headline)}
                                </td>
                            </tr>
                            <tr>
                                <td align="${align}" class="hero-body-${uid}" style="font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:${c.bodyCopyFontSize};line-height:27px;font-weight:300;color:${c.bodyCopyColor};padding:0 8px;">
                                    ${escapeHtml(c.bodyCopy)}
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        `;
    },

    showProperties: function(section, container) {
        const c = section.content;
        createInput('Eyebrow Text', 'eyebrowText', 'text', c.eyebrowText, null, c, container);
        createInput('Eyebrow Color', 'eyebrowColor', 'color', c.eyebrowColor, null, c, container);
        createInput('Eyebrow Font Size', 'eyebrowFontSize', 'text', c.eyebrowFontSize, null, c, container);
        createInput('Headline', 'headline', 'text', c.headline, null, c, container);
        createInput('Headline Color', 'headlineColor', 'color', c.headlineColor, null, c, container);
        createInput('Headline Font Size', 'headlineFontSize', 'text', c.headlineFontSize, null, c, container);
        createInput('Headline Emoji', 'headlineEmoji', 'text', c.headlineEmoji, null, c, container);
        createInput('Body Copy', 'bodyCopy', 'textarea', c.bodyCopy, null, c, container);
        createInput('Body Copy Color', 'bodyCopyColor', 'color', c.bodyCopyColor, null, c, container);
        createInput('Body Copy Font Size', 'bodyCopyFontSize', 'text', c.bodyCopyFontSize, null, c, container);
        createInput('Hero Background Color', 'heroBackground', 'color', c.heroBackground, null, c, container);
        createInput('Background Type', 'backgroundType', 'select', c.backgroundType, [
            {value: 'color', label: 'Color'},
            {value: 'image', label: 'Image'}
        ], c, container);
        if (c.backgroundType === 'image') {
            createInput('Background Image URL', 'backgroundImage', 'text', c.backgroundImage || 'https://placehold.co/600x400/EEEEEE/808080?text=Hero+Image', null, c, container);
            createInput('Overlay Color', 'overlayColor', 'text', 'rgba(0,0,0,0.3)', null, c, container);
        }
        createInput('Hero Padding', 'heroPadding', 'text', '44px 46px 38px 46px', null, c, container);
        createInput('Text Align', 'heroTextAlign', 'select', c.heroTextAlign, [
            {value: 'center', label: 'Center'},
            {value: 'left', label: 'Left'},
            {value: 'right', label: 'Right'}
        ], c, container);

        const mobDetails = document.createElement('details');
        mobDetails.classList.add('mt-3', 'border', 'rounded', 'p-2');
        const mobSummary = document.createElement('summary');
        mobSummary.textContent = 'Mobile Settings';
        mobSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        mobDetails.appendChild(mobSummary);
        const mobContainer = document.createElement('div');
        mobContainer.classList.add('space-y-2');
        mobDetails.appendChild(mobContainer);
        container.appendChild(mobDetails);

        createInput('Mobile Headline Size', 'mobileHeadlineFontSize', 'text', c.mobileHeadlineFontSize || '22px', null, c, mobContainer);
        createInput('Mobile Eyebrow Size', 'mobileEyebrowFontSize', 'text', c.mobileEyebrowFontSize || '9px', null, c, mobContainer);
        createInput('Mobile Body Size', 'mobileBodyCopyFontSize', 'text', c.mobileBodyCopyFontSize || '14px', null, c, mobContainer);
        createInput('Mobile Padding', 'mobilePadding', 'text', c.mobilePadding || '28px 18px 24px 18px', null, c, mobContainer);
    }
});
