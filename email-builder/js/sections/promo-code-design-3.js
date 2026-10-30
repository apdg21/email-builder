SectionRegistry.register('promo-code-design-3', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            title: 'Exclusive Deal Inside',
            promoCode: 'WELCOME15',
            promoDiscount: '15% OFF',
            showTimer: true,
            timerHours: 2,
            timerMinutes: 0,
            timerSeconds: 0,
            buttonText: 'Claim Your Discount',
            buttonLink: '#',
            buttonBackground: '#8b5cf6',
            buttonColor: '#ffffff',
            buttonFontSize: '14px',
            buttonPadding: '10px 24px',
            backgroundColor: '#f5f3ff',
            accentColor: '#8b5cf6',
            borderRadius: '16px',
            textAlign: 'center'
        };
    },

    generateContent: function(section) {
        const content = section.content;

        const totalSeconds = (content.timerHours * 3600) + (content.timerMinutes * 60) + content.timerSeconds;
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');

        return `
            <div style="background-color: ${content.backgroundColor}; border-radius: ${content.borderRadius}; padding: 30px 20px; text-align: center; border: 1px solid ${content.accentColor}20;">
                <h2 style="font-size: 22px; color: #0f172a; margin: 0 0 15px 0; font-weight: 700;">
                    ${escapeHtml(content.title)}
                </h2>

                ${content.showTimer ? `
                <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 20px; display: inline-block; margin-bottom: 20px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="text-align: center; padding: 0 8px;">
                                <span style="font-size: 24px; font-weight: 700; color: ${content.accentColor}; display: block;">${hours}</span>
                                <span style="font-size: 11px; color: #94a3b8;">HRS</span>
                            </td>
                            <td style="color: ${content.accentColor}; font-size: 18px; font-weight: 700;">:</td>
                            <td style="text-align: center; padding: 0 8px;">
                                <span style="font-size: 24px; font-weight: 700; color: ${content.accentColor}; display: block;">${minutes}</span>
                                <span style="font-size: 11px; color: #94a3b8;">MIN</span>
                            </td>
                            <td style="color: ${content.accentColor}; font-size: 18px; font-weight: 700;">:</td>
                            <td style="text-align: center; padding: 0 8px;">
                                <span style="font-size: 24px; font-weight: 700; color: ${content.accentColor}; display: block;">${seconds}</span>
                                <span style="font-size: 11px; color: #94a3b8;">SEC</span>
                            </td>
                        </tr>
                    </table>
                </div>
                ` : ''}

                <div style="background: #ffffff; border: 2px dashed ${content.accentColor}; border-radius: 10px; padding: 18px; margin: 0 auto 20px; max-width: 300px;">
                    <p style="font-size: 16px; color: #64748b; margin: 0 0 5px; text-transform: uppercase; font-weight: 600;">${escapeHtml(content.promoDiscount)}</p>
                    <p style="font-size: 28px; font-family: 'Courier New', monospace; font-weight: 800; color: #0f172a; margin: 5px 0; letter-spacing: 5px;">
                        ${escapeHtml(content.promoCode)}
                    </p>
                </div>

                <table cellpadding="0" cellspacing="0" border="0" align="center">
                    <tr>
                        <td style="background-color: ${content.buttonBackground}; border-radius: 8px;">
                            <a href="${content.buttonLink}" style="font-size: ${content.buttonFontSize}; color: ${content.buttonColor}; padding: ${content.buttonPadding}; display: inline-block; text-decoration: none; border-radius: 8px; font-weight: 600;">
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

        createInput('Title', 'title', 'text', 'Exclusive Deal Inside', null, content, codeContainer);
        createInput('Promo Code', 'promoCode', 'text', 'WELCOME15', null, content, codeContainer);
        createInput('Discount Text', 'promoDiscount', 'text', '15% OFF', null, content, codeContainer);

        // Timer
        const timerDetails = document.createElement('details');
        timerDetails.classList.add('mb-3', 'border', 'rounded', 'p-2');
        timerDetails.open = false;
        const timerSummary = document.createElement('summary');
        timerSummary.textContent = 'Countdown Timer';
        timerSummary.classList.add('font-medium', 'cursor-pointer', 'mb-2');
        timerDetails.appendChild(timerSummary);
        const timerContainer = document.createElement('div');
        timerContainer.classList.add('space-y-2');
        timerDetails.appendChild(timerContainer);
        container.appendChild(timerDetails);

        createCheckbox('Show Timer', 'showTimer', content, timerContainer);
        if (content.showTimer) {
            createInput('Hours', 'timerHours', 'number', '2', null, content, timerContainer);
            createInput('Minutes', 'timerMinutes', 'number', '0', null, content, timerContainer);
            createInput('Seconds', 'timerSeconds', 'number', '0', null, content, timerContainer);
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

        createInput('Background Color', 'backgroundColor', 'color', '#f5f3ff', null, content, styleContainer);
        createInput('Accent Color', 'accentColor', 'color', '#8b5cf6', null, content, styleContainer);
        createInput('Border Radius', 'borderRadius', 'text', '16px', null, content, styleContainer);

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

        createInput('Button Text', 'buttonText', 'text', 'Claim Your Discount', null, content, btnContainer);
        createInput('Button Link', 'buttonLink', 'text', '#', null, content, btnContainer);
        createInput('Button Background', 'buttonBackground', 'color', '#8b5cf6', null, content, btnContainer);
        createInput('Button Color', 'buttonColor', 'color', '#ffffff', null, content, btnContainer);
    }
});