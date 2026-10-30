// Email Intro — Email-derived section from "You just gained an extra hour" email
// Category: Opening
SectionRegistry.register('email-intro', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            greeting: 'Hi [First Name],',
            greetingColor: '#9B046F',
            greetingFontSize: '14px',
            greetingFontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            mainHeadline: 'Happy "Fall Back" Sunday!',
            mainHeadlineColor: '#3A3548',
            mainHeadlineFontSize: '15px',
            bodyCopy: 'If you woke up today realizing you have an extra hour on your hands, you already know the best place to spend it: at your cutting table.',
            bodyCopyColor: '#3A3548',
            bodyCopyFontSize: '15px',
            bodyCopyLineHeight: '28px',
            fontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            textAlign: 'left',
            padding: '24px 24px 10px 24px',
            mobilePadding: '18px 16px 10px 16px',
            mobileFontSize: '14px',
            mobileLineHeight: '23px'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        const uid = 'intro_' + String(section.id || Math.floor(Math.random() * 1000000)).replace(/[^a-zA-Z0-9]/g, '');
        return `
            <style>
                @media only screen and (max-width: 480px) {
                    .intro-td-${uid} {
                        padding: ${c.mobilePadding || '18px 16px 10px 16px'} !important;
                    }
                    .intro-copy-${uid} {
                        font-size: ${c.mobileFontSize || '14px'} !important;
                        line-height: ${c.mobileLineHeight || '23px'} !important;
                    }
                }
            </style>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <td class="intro-td-${uid}" style="padding:${c.padding || '24px 24px 10px 24px'};">
                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                            <tr>
                                <td align="${c.textAlign}" style="font-family:${c.fontFamily};font-size:${c.greetingFontSize};line-height:25px;font-weight:500;color:${c.greetingColor};padding-bottom:16px;">
                                    ${escapeHtml(c.greeting)}
                                </td>
                            </tr>
                            ${c.mainHeadline ? `
                            <tr>
                                <td align="${c.textAlign}" class="intro-copy-${uid}" style="font-family:${c.fontFamily};font-size:${c.mainHeadlineFontSize};line-height:${c.bodyCopyLineHeight};font-weight:400;color:${c.mainHeadlineColor};padding-bottom:16px;">
                                    ${escapeHtml(c.mainHeadline)}
                                </td>
                            </tr>` : ''}
                            <tr>
                                <td align="${c.textAlign}" class="intro-copy-${uid}" style="font-family:${c.fontFamily};font-size:${c.bodyCopyFontSize};line-height:${c.bodyCopyLineHeight};font-weight:300;color:${c.bodyCopyColor};padding-bottom:16px;">
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
        createInput('Greeting', 'greeting', 'text', c.greeting, null, c, container);
        createInput('Greeting Color', 'greetingColor', 'color', c.greetingColor, null, c, container);
        createInput('Greeting Font Size', 'greetingFontSize', 'text', c.greetingFontSize, null, c, container);
        createInput('Main Headline', 'mainHeadline', 'text', c.mainHeadline, null, c, container);
        createInput('Main Headline Color', 'mainHeadlineColor', 'color', c.mainHeadlineColor, null, c, container);
        createInput('Main Headline Font Size', 'mainHeadlineFontSize', 'text', c.mainHeadlineFontSize, null, c, container);
        createInput('Body Copy', 'bodyCopy', 'textarea', c.bodyCopy, null, c, container);
        createInput('Body Copy Color', 'bodyCopyColor', 'color', c.bodyCopyColor, null, c, container);
        createInput('Body Copy Font Size', 'bodyCopyFontSize', 'text', c.bodyCopyFontSize, null, c, container);
        createInput('Body Copy Line Height', 'bodyCopyLineHeight', 'text', c.bodyCopyLineHeight, null, c, container);
        createInput('Padding', 'padding', 'text', c.padding || '24px 24px 10px 24px', null, c, container);
        createInput('Text Align', 'textAlign', 'select', c.textAlign, [
            {value: 'left', label: 'Left'},
            {value: 'center', label: 'Center'},
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

        createInput('Mobile Padding', 'mobilePadding', 'text', c.mobilePadding || '18px 16px 10px 16px', null, c, mobContainer);
        createInput('Mobile Font Size', 'mobileFontSize', 'text', c.mobileFontSize || '14px', null, c, mobContainer);
        createInput('Mobile Line Height', 'mobileLineHeight', 'text', c.mobileLineHeight || '23px', null, c, mobContainer);
    }
});
