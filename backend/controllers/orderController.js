const { pool } = require('../db');
const { sendNotificationEmail } = require('../utils/email');

// POST create new order
const createOrder = async (req, res) => {
    const { name, business_name, business_category, email, phone, template_id } = req.body;

    if (!name || !email || !template_id) {
        return res.status(400).json({
            success: false,
            message: 'Name, email, and template_id are required',
        });
    }

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Upsert user
        const userResult = await client.query(
            `INSERT INTO users (name, email, phone)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name, phone = EXCLUDED.phone
       RETURNING id`,
            [name, email, phone || null]
        );
        const userId = userResult.rows[0].id;

        // Get template price
        const templateResult = await client.query(
            'SELECT price FROM website_templates WHERE id = $1',
            [template_id]
        );
        if (templateResult.rows.length === 0) {
            await client.query('ROLLBACK');
            return res.status(404).json({ success: false, message: 'Template not found' });
        }
        const templatePrice = templateResult.rows[0].price;

        // Create order
        const orderResult = await client.query(
            `INSERT INTO orders (user_id, template_id, business_name, business_category, phone, email, order_status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
            [userId, template_id, business_name || null, business_category || null, phone || null, email]
        );
        const order = orderResult.rows[0];

        // Create payment record
        await client.query(
            `INSERT INTO payments (order_id, amount, payment_status)
       VALUES ($1, $2, 'pending')`,
            [order.id, templatePrice]
        );

        await client.query('COMMIT');

        // Send Email Notification
        sendNotificationEmail('REQUEST', { name, email, phone, business_name, business_category, template_id });

        res.status(201).json({
            success: true,
            message: 'Order placed successfully!',
            data: order,
        });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating order:', error);
        res.status(500).json({ success: false, message: 'Failed to create order' });
    } finally {
        client.release();
    }
};

// GET all orders (Admin)
const getAllOrders = async (req, res) => {
    try {
        const { rows } = await pool.query(`
      SELECT 
        o.id, o.business_name, o.business_category, o.phone, o.email,
        o.order_status, o.created_at,
        u.name AS customer_name,
        wt.title AS template_title, wt.category AS template_category, wt.price,
        p.payment_status, p.amount
      FROM orders o
      LEFT JOIN users u ON o.user_id = u.id
      LEFT JOIN website_templates wt ON o.template_id = wt.id
      LEFT JOIN payments p ON o.id = p.order_id
      ORDER BY o.created_at DESC
    `);
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch orders' });
    }
};

// PUT update order status
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { order_status } = req.body;

    const validStatuses = ['pending', 'in_progress', 'completed', 'cancelled'];
    if (!validStatuses.includes(order_status)) {
        return res.status(400).json({
            success: false,
            message: `Invalid status. Valid statuses: ${validStatuses.join(', ')}`,
        });
    }

    try {
        const { rows } = await pool.query(
            'UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *',
            [order_status, id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, message: 'Order status updated', data: rows[0] });
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ success: false, message: 'Failed to update order' });
    }
};

module.exports = { createOrder, getAllOrders, updateOrderStatus };
