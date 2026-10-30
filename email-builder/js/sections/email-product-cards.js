
// Product Cards — Email-derived section from "You just gained an extra hour" email
// Category: Content Blocks
SectionRegistry.register('email-product-cards', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            cardGap: '14px',
            cardBackground: '#FDFBF7',
            cardBorder: '#E7DFD2',
            fontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            cardPadding: '22px 0',
            productImgWrapBg: '#F5F2EB',
            productCardHoverBorder: '#E7DFD2',
            productCardHoverShadow: '0 12px 26px rgba(46,42,57,0.18)',
            productCardHoverColor: '#9B046F',

            // Product 1
            p1Name: 'Product One',
            p1Rating: '5.0/5',
            p1RatingCount: '214 reviews',
            p1Desc: 'A beautifully crafted template for your next creative project. Quick to set up and easy to customize.',
            p1Link: '#',
            p1ImgUrl: 'https://placehold.co/226x226/F5F2EB/2E2A39?text=Product+1',
            p1Button: 'View details',

            // Product 2
            p2Name: 'Product Two',
            p2Rating: '5.0/5',
            p2RatingCount: '189 reviews',
            p2Desc: 'Designed with versatility in mind. Perfect for rapid development and seamless integration.',
            p2Link: '#',
            p2ImgUrl: 'https://placehold.co/226x226/F5F2EB/2E2A39?text=Product+2',
            p2Button: 'View details',

            // Product 3
            p3Name: 'Product Three',
            p3Rating: '5.0/5',
            p3RatingCount: '152 reviews',
            p3Desc: 'Modern design with clean typography. A fast, deeply satisfying solution for your workflow.',
            p3Link: '#',
            p3ImgUrl: 'https://placehold.co/226x226/F5F2EB/2E2A39?text=Product+3',
            p3Button: 'View details',

            cardImgWidth: '226px',
            cardNameFontSize: '19px',
            cardDescFontSize: '14px',
            cardRatingFontSize: '12px',
            cardButtonFontSize: '11px',
            cardColor: '#9B046F',
            cardColorHover: '#7A0358',
            showProductCards: true
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const uid = 'cards_' + String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');

        if (!c.showProductCards) {
            return '';
        }

        const cardHtml = (pi, p) => `
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" class="product-card-${uid}" style="width:100%;background-color:${c.cardBackground};border:1px solid ${c.cardBorder};" bgcolor="${c.cardBackground}">
                <tr class="product-card-row-${uid}">
                    <td class="product-card-img-${uid}" width="248" valign="middle" align="center" style="width:248px;padding:${c.cardPadding};">
                        <div style="box-shadow:0 4px 12px rgba(46,42,57,0.08);line-height:0;font-size:0;">
                            <a href="${p.link}" target="_blank" style="text-decoration:none;">
                                <img src="${p.img}" alt="${escapeHtml(p.name)}" width="226" style="display:block;width:100%;max-width:100%;height:auto;border:0;outline:none;text-decoration:none;background-color:${c.productImgWrapBg};">
                            </a>
                        </div>
                    </td>
                    <td class="product-card-content-${uid}" dir="ltr" valign="middle" align="left" style="direction:ltr;text-align:left;padding:${c.cardPadding} 24px 22px 20px;">
                        <a href="${p.link}" target="_blank" style="text-decoration:none;">
                            <div style="font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:${c.cardNameFontSize};line-height:27px;font-weight:500;color:#2E2A39;padding-bottom:6px;">${escapeHtml(p.name)}</div>
                        </a>
                        <div style="font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:${c.cardRatingFontSize};line-height:18px;letter-spacing:1.6px;color:#9B046F;font-weight:400;padding-bottom:10px;">
                            ${'★'.repeat(5)} <span style="color:#8A7F73;letter-spacing:0.4px;font-size:11px;">(${escapeHtml(p.rating)})</span>
                        </div>
                        <div style="font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:${c.cardDescFontSize};line-height:24px;font-weight:300;color:#4A4453;padding-bottom:14px;">${escapeHtml(p.desc)}</div>
                        <a class="product-cta" href="${p.link}" target="_blank" style="font-family:'Poppins',Helvetica,Arial,sans-serif;font-size:${c.cardButtonFontSize};line-height:18px;letter-spacing:2px;text-transform:uppercase;color:${c.cardColor};font-weight:600;text-decoration:none;border-bottom:1px solid #D9AEC8;padding-bottom:3px;">${escapeHtml(p.button)} &#8594;</a>
                    </td>
                </tr>
            </table>
        `;

        return `
            <style>
                @media only screen and (max-width: 480px) {
                    .product-card-${uid} {
                        display: block !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        padding: 0 !important;
                    }
                    .product-card-row-${uid} {
                        display: block !important;
                    }
                    .product-card-img-${uid} {
                        display: block !important;
                        width: 100% !important;
                        padding-right: 0 !important;
                        padding-bottom: 16px !important;
                    }
                    .product-card-content-${uid} {
                        display: block !important;
                        width: 100% !important;
                        padding-left: 0 !important;
                        padding-right: 0 !important;
                        text-align: center !important;
                    }
                    .product-card-content-${uid} a {
                        text-align: center !important;
                        display: inline-block !important;
                    }
                    .product-card-content-${uid} div,
                    .product-card-content-${uid} a {
                        text-align: center !important;
                    }
                }
            </style>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%;">
                <tr>
                    <td class="mob-gap" height="24" style="height:24px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                    <td align="center">${cardHtml(1, {
                        name: c.p1Name,
                        rating: c.p1Rating,
                        ratingCount: c.p1RatingCount,
                        desc: c.p1Desc,
                        link: c.p1Link,
                        img: c.p1ImgUrl,
                        button: c.p1Button
                    })}</td>
                </tr>
                <tr>
                    <td class="mob-gap" height="18" style="height:18px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                    <td align="center">${cardHtml(2, {
                        name: c.p2Name,
                        rating: c.p2Rating,
                        ratingCount: c.p2RatingCount,
                        desc: c.p2Desc,
                        link: c.p2Link,
                        img: c.p2ImgUrl,
                        button: c.p2Button
                    })}</td>
                </tr>
                <tr>
                    <td class="mob-gap" height="18" style="height:18px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
                <tr>
                    <td align="center">${cardHtml(3, {
                        name: c.p3Name,
                        rating: c.p3Rating,
                        ratingCount: c.p3RatingCount,
                        desc: c.p3Desc,
                        link: c.p3Link,
                        img: c.p3ImgUrl,
                        button: c.p3Button
                    })}</td>
                </tr>
                <tr>
                    <td class="mob-gap" height="28" style="height:28px;font-size:0;line-height:0;">&nbsp;</td>
                </tr>
            </table>
        `;
    },

    showProperties: function(section, container) {
        const c = section.content;
        const products = [
            { prefix: 'p1', pi: 1, name: 'Product 1' },
            { prefix: 'p2', pi: 2, name: 'Product 2' },
            { prefix: 'p3', pi: 3, name: 'Product 3' }
        ];

        createInput('Card Gap', 'cardGap', 'text', c.cardGap, null, c, container);
        createInput('Card Background', 'cardBackground', 'color', c.cardBackground, null, c, container);
        createInput('Card Border', 'cardBorder', 'text', c.cardBorder, null, c, container);

        createCheckbox('Show Product Cards', 'showProductCards', c, container);
        if (c.showProductCards) {
            products.forEach(prod => {
                const group = document.createElement('div');
                group.className = 'mb-3';
                const title = document.createElement('div');
                title.textContent = prod.name;
                title.style.fontWeight = '600';
                title.style.marginBottom = '8px';
                group.appendChild(title);

                createInput(`${prod.name} - Name`, `${prod.prefix}Name`, 'text', c[`${prod.prefix}Name`], null, c, group);
                createInput(`${prod.name} - Rating`, `${prod.prefix}Rating`, 'text', c[`${prod.prefix}Rating`], null, c, group);
                createInput(`${prod.name} - Rating Count`, `${prod.prefix}RatingCount`, 'text', c[`${prod.prefix}RatingCount`], null, c, group);
                createInput(`${prod.name} - Description`, `${prod.prefix}Desc`, 'textarea', c[`${prod.prefix}Desc`], null, c, group);
                createInput(`${prod.name} - Link`, `${prod.prefix}Link`, 'text', c[`${prod.prefix}Link`], null, c, group);
                createInput(`${prod.name} - Image URL`, `${prod.prefix}ImgUrl`, 'text', c[`${prod.prefix}ImgUrl`], null, c, group);
                createInput(`${prod.name} - Button Text`, `${prod.prefix}Button`, 'text', c[`${prod.prefix}Button`], null, c, group);

                container.appendChild(group);
            });
        }
    }
});
