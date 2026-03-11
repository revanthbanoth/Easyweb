const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

const sendNotificationEmail = async (type, data) => {
    // If no API key is provided, we just log the content
    if (!process.env.RESEND_API_KEY) {
        console.log('--- EMAIL NOTIFICATION (Simulated) ---');
        console.log(`To: officialeasyweb@gmail.com`);
        console.log(`Type: ${type}`);
        console.log(`Details:`, data);
        console.log('--- END EMAIL ---');
        return;
    }

    let subject = '';
    let html = '';

    if (type === 'REQUEST') {
        subject = `🚀 New Website Request: ${data.business_name || data.name}`;
        html = `
            <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                <h2 style="color: #6366f1; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Website Request Received</h2>
                <p>Hello Admin,</p>
                <p>A new website request has been submitted through EasyWeb.</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>Customer Name:</strong> ${data.name}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                    <p><strong>Business:</strong> ${data.business_name || 'N/A'}</p>
                    <p><strong>Category:</strong> ${data.business_category || 'N/A'}</p>
                    <p><strong>Template ID:</strong> ${data.template_id}</p>
                </div>
                <p>Log in to the <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin?admin=true" style="color: #6366f1; font-weight: bold; text-decoration: none;">Admin Dashboard</a> to manage this request.</p>
                <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                    This is an automated notification from your EasyWeb Platform.
                </footer>
            </div>
        `;
    } else if (type === 'CONTACT') {
        subject = `✉️ New Contact Message from ${data.name}`;
        html = `
            <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                <h2 style="color: #6366f1; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Inquiry</h2>
                <p>A user has sent a message through your website contact form.</p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
                    <p><strong>From:</strong> ${data.name} (${data.email})</p>
                    <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                    <p><strong>Message:</strong></p>
                    <p style="background: #eee; padding: 15px; border-radius: 8px; font-style: italic;">"${data.message}"</p>
                </div>
                <footer style="margin-top: 30px; font-size: 12px; color: #888;">
                    This is an automated notification from your EasyWeb Platform.
                </footer>
            </div>
        `;
    }

    try {
        const { data: resData, error } = await resend.emails.send({
            from: 'EasyWeb <onboarding@resend.dev>',
            to: 'officialeasyweb@gmail.com',
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('❌ Resend API Error:', error);
            return;
        }

        console.log(`✅ Email notification sent via Resend API: ${type}`, resData.id);
    } catch (error) {
        console.error('❌ Failed to send email via Resend API:', error);
    }
};

module.exports = { sendNotificationEmail };
