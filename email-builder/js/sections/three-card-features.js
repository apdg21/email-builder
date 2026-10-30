SectionRegistry.register('three-card-features', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            sectionBackground: '#F9ECD9',
            cardBackground: '#FFFFFF',
            cardBorderRadius: '10px',
            cardPadding: '26px 16px',
            cardGap: '16px',
            fontFamily: 'Arial, Helvetica, sans-serif',
            titleFontFamily: 'Georgia, serif',

            // Card 1
            card1Icon: '🌿',
            card1Title: 'Fast-Finish Lap Sizes',
            card1Desc: 'Quick geometric layouts designed to come together over a single weekend.',

            // Card 2
            card2Icon: '☕',
            card2Title: 'Dorm & Den Friendly',
            card2Desc: 'Perfect dimensions for couch throws, reading nooks, and twin beds.',

            // Card 3
            card3Icon: '🧵',
            card3Title: 'Stash-Busting Designs',
            card3Desc: 'Great for pulling together leftover fabric bundles without needing heavy yardage.',

            // Typography & Colors
            iconFontSize: '28px',
            cardTitleFontSize: '15px',
            cardTitleColor: '#3A2E27',
            cardDescFontSize: '13px',
            cardDescColor: '#6B5D52',

            // Mobile Breakpoint
            mobileBreakpoint: '480px'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const uid = 'cards_' + String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');

        const renderSingleCard = (icon, title, desc, isLast) => `
            <td class="feat-col-${uid}" width="33.33%" valign="top" align="center" style="width: 33.33%; padding: 0 ${isLast ? '0' : c.cardGap} 0 0; box-sizing: border-box;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: ${c.cardBackground}; border-radius: ${c.cardBorderRadius}; height: 100%;">
                    <tr>
                        <td align="center" style="padding: ${c.cardPadding}; text-align: center; font-family: ${c.fontFamily};">
                            <div style="font-size: ${c.iconFontSize}; line-height: 1; margin-bottom: 12px;">${icon}</div>
                            <h4 style="margin: 0 0 8px 0; font-family: ${c.titleFontFamily || 'Georgia, serif'}; font-size: ${c.cardTitleFontSize}; font-weight: 700; color: ${c.cardTitleColor}; line-height: 1.3;">
                                ${escapeHtml(title)}
                            </h4>
                            <p style="margin: 0; font-size: ${c.cardDescFontSize}; line-height: 1.5; color: ${c.cardDescColor};">
                                ${escapeHtml(desc)}
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        `;

        const responsiveStyles = `
            <style>
                @media only screen and (max-width: ${c.mobileBreakpoint || '480px'}) {
                    .feat-col-${uid} {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 0 0 16px 0 !important;
                        box-sizing: border-box !important;
                    }
                }
            </style>
        `;

        return `
            ${responsiveStyles}
            <div style="background-color: ${c.sectionBackground}; padding: 24px 20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        ${renderSingleCard(c.card1Icon, c.card1Title, c.card1Desc, false)}
                        ${renderSingleCard(c.card2Icon, c.card2Title, c.card2Desc, false)}
                        ${renderSingleCard(c.card3Icon, c.card3Title, c.card3Desc, true)}
                    </tr>
                </table>
            </div>
        `;
    },

    showProperties: function(section, container) {
        const content = section.content;

        // Card 1
        const c1Details = document.createElement('details');
        c1Details.classList.add('mb-3', 'border', 'rounded', 'p-2');
        c1Details.open = true;
        const c1Summary = document.createElement('summary');
        c1Summary.textContent = 'Card 1';
        c1Summary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        c1Details.appendChild(c1Summary);
        const c1Container = document.createElement('div');
        c1Container.classList.add('space-y-2');
        c1Details.appendChild(c1Container);
        container.appendChild(c1Details);

        createInput('Card 1 Icon / Emoji', 'card1Icon', 'text', '🌿', null, content, c1Container);
        createInput('Card 1 Title', 'card1Title', 'text', 'Fast-Finish Lap Sizes', null, content, c1Container);
        createInput('Card 1 Description', 'card1Desc', 'textarea', '', null, content, c1Container);

        // Card 2
        const c2Details = document.createElement('details');
        c2Details.classList.add('mb-3', 'border', 'rounded', 'p-2');
        c2Details.open = false;
        const c2Summary = document.createElement('summary');
        c2Summary.textContent = 'Card 2';
        c2Summary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        c2Details.appendChild(c2Summary);
        const c2Container = document.createElement('div');
        c2Container.classList.add('space-y-2');
        c2Details.appendChild(c2Container);
        container.appendChild(c2Details);

        createInput('Card 2 Icon / Emoji', 'card2Icon', 'text', '☕', null, content, c2Container);
        createInput('Card 2 Title', 'card2Title', 'text', 'Dorm & Den Friendly', null, content, c2Container);
        createInput('Card 2 Description', 'card2Desc', 'textarea', '', null, content, c2Container);

        // Card 3
        const c3Details = document.createElement('details');
        c3Details.classList.add('mb-3', 'border', 'rounded', 'p-2');
        c3Details.open = false;
        const c3Summary = document.createElement('summary');
        c3Summary.textContent = 'Card 3';
        c3Summary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        c3Details.appendChild(c3Summary);
        const c3Container = document.createElement('div');
        c3Container.classList.add('space-y-2');
        c3Details.appendChild(c3Container);
        container.appendChild(c3Details);

        createInput('Card 3 Icon / Emoji', 'card3Icon', 'text', '🧵', null, content, c3Container);
        createInput('Card 3 Title', 'card3Title', 'text', 'Stash-Busting Designs', null, content, c3Container);
        createInput('Card 3 Description', 'card3Desc', 'textarea', '', null, content, c3Container);

        // Card Styles
        const styleDetails = document.createElement('details');
        styleDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        styleDetails.open = false;
        const styleSummary = document.createElement('summary');
        styleSummary.textContent = 'Grid & Card Styles';
        styleSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        styleDetails.appendChild(styleSummary);
        const styleContainer = document.createElement('div');
        styleContainer.classList.add('space-y-2');
        styleDetails.appendChild(styleContainer);
        container.appendChild(styleDetails);

        createInput('Section Background', 'sectionBackground', 'color', '#F9ECD9', null, content, styleContainer);
        createInput('Card Background', 'cardBackground', 'color', '#FFFFFF', null, content, styleContainer);
        createInput('Card Border Radius', 'cardBorderRadius', 'text', '10px', null, content, styleContainer);
        createInput('Card Padding', 'cardPadding', 'text', '26px 16px', null, content, styleContainer);
        createInput('Card Gap', 'cardGap', 'text', '16px', null, content, styleContainer);
        createInput('Title Color', 'cardTitleColor', 'color', '#3A2E27', null, content, styleContainer);
        createInput('Description Color', 'cardDescColor', 'color', '#6B5D52', null, content, styleContainer);
    }
});
