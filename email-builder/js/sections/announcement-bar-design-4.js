// Announcement Bar Design 1 - Email-derived section
// Source: "You just gained an extra hour" email, top announcement bar
// Category: Announcement Bar
SectionRegistry.register('announcement-bar-design-4', {
    getDefaultContent: function(commonStyles) {
        return {
            ...commonStyles,
            // Email-derived campaign announcement bar
            message: 'Instant PDF patterns  •  Print & start stitching in minutes  •  Fall Back Sunday',
            messageFontSize: '10px',
            messageColor: '#FDFBF7',
            backgroundColor: '#2E2A39',
            fontFamily: 'Poppins, Helvetica, Arial, sans-serif',
            textAlign: 'center',
            showLink: false,
            paddingTop: '11px',
            paddingBottom: '11px'
        };
    },

    generateContent: function(section) {
        const c = section.content;
        return `
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${c.backgroundColor};" bgcolor="${c.backgroundColor}">
                <tr>
                    <td align="center" style="padding:${c.paddingTop} ${c.paddingLeft || 16}px ${c.paddingBottom} ${c.paddingLeft || 16}px; font-family:${c.fontFamily}; font-size:${c.messageFontSize}; line-height:16px; letter-spacing:2.2px; text-transform:uppercase; color:${c.messageColor}; font-weight:500;">
                        ${escapeHtml(c.message)}
                    </td>
                </tr>
            </table>
        `;
    },

    showProperties: function(section, container) {
        const c = section.content;
        createInput('Message', 'message', 'text', c.message, null, c, container);
        createInput('Message Font Size', 'messageFontSize', 'text', c.messageFontSize, null, c, container);
        createInput('Message Color', 'messageColor', 'color', c.messageColor, null, c, container);
        createInput('Background Color', 'backgroundColor', 'color', c.backgroundColor, null, c, container);
        createInput('Font Family', 'fontFamily', 'select', c.fontFamily, [
            {value: 'Poppins, Helvetica, Arial, sans-serif', label: 'Poppins'},
            {value: 'Arial, Helvetica, sans-serif', label: 'Arial'},
            {value: 'Times New Roman, Times, serif', label: 'Times New Roman'},
            {value: 'Georgia, serif', label: 'Georgia'},
            {value: 'Verdana, Geneva, sans-serif', label: 'Verdana'}
        ], c, container);
        createInput('Text Align', 'textAlign', 'select', c.textAlign, [
            {value: 'center', label: 'Center'},
            {value: 'left', label: 'Left'},
            {value: 'right', label: 'Right'}
        ], c, container);
        createCheckbox('Show Link', 'showLink', c, container);
        if (c.showLink) {
            createInput('Link Text', 'linkText', 'text', 'Shop Now', null, c, container);
            createInput('Link URL', 'linkUrl', 'text', '#', null, c, container);
            createInput('Link Color', 'linkColor', 'color', '#FDFBF7', null, c, container);
        }
    }
});
