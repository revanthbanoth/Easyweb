const { pool } = require('../db');
const { sendNotificationEmail } = require('../utils/email');

const submitContactMessage = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and message are required',
        });
    }

    try {
        // Save to DB
        await pool.query(
            `INSERT INTO contact_messages (name, email, phone, message)
             VALUES ($1, $2, $3, $4)`,
            [name, email, phone || null, message]
        );

        // Send Email Notification
        sendNotificationEmail('CONTACT', { name, email, phone, message });

        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
        });
    } catch (error) {
        console.error('Error submitting contact message:', error);
        res.status(500).json({ success: false, message: 'Failed to send message' });
    }
};

module.exports = { submitContactMessage };
