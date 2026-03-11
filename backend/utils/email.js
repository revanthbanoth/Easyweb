const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER || 'officialeasyweb@gmail.com',
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
});

const sendNotificationEmail = async (type, data) => {
    // If no password is provided, we just log the email content to console
    if (!process.env.EMAIL_PASS) {
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
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #6366f1;">New Website Request Received</h2>
                <p>Hello Admin,</p>
                <p>A new website request has been submitted through EasyWeb.</p>
                <hr />
                <p><strong>Customer Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>Business:</strong> ${data.business_name || 'N/A'}</p>
                <p><strong>Category:</strong> ${data.business_category || 'N/A'}</p>
                <p><strong>Template ID:</strong> ${data.template_id}</p>
                <hr />
                <p>Log in to the <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin?admin=true">Admin Dashboard</a> to manage this request.</p>
            </div>
        `;
    } else if (type === 'CONTACT') {
        subject = `✉️ New Contact Message from ${data.name}`;
        html = `
            <div style="font-family: sans-serif; padding: 20px; color: #333;">
                <h2 style="color: #6366f1;">New Contact Inquiry</h2>
                <p>A user has sent a message through the contact form.</p>
                <hr />
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
                <p><strong>Message:</strong></p>
                <p style="background: #f4f4f4; padding: 15px; border-radius: 8px;">${data.message}</p>
                <hr />
            </div>
        `;
    }

    try {
        await transporter.sendMail({
            from: `"EasyWeb Notifications" <${process.env.EMAIL_USER || 'officialeasyweb@gmail.com'}>`,
            to: 'officialeasyweb@gmail.com',
            subject: subject,
            html: html,
        });
        console.log(`✅ Email notification sent: ${type}`);
    } catch (error) {
        console.error('❌ EMAIL ERROR: Render is likely blocking SMTP ports. Your message is SAVED in the database.');
        console.error('👉 ACTION: Check your Admin Dashboard at /admin?admin=true to see this request.');
    }
};

module.exports = { sendNotificationEmail };
