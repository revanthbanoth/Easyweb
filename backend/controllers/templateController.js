const { pool } = require('../db');

// GET all templates
const getAllTemplates = async (req, res) => {
    try {
        const { rows } = await pool.query(
            'SELECT id, title, category, price, preview_image, description FROM website_templates ORDER BY created_at DESC'
        );
        res.json({ success: true, data: rows });
    } catch (error) {
        console.error('Error fetching templates:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch templates' });
    }
};

// GET single template
const getTemplateById = async (req, res) => {
    const { id } = req.params;
    try {
        const { rows } = await pool.query(
            'SELECT * FROM website_templates WHERE id = $1',
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Template not found' });
        }
        res.json({ success: true, data: rows[0] });
    } catch (error) {
        console.error('Error fetching template:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch template' });
    }
};

module.exports = { getAllTemplates, getTemplateById };
