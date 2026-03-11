const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function checkPrices() {
    const client = await pool.connect();
    try {
        const { rows } = await client.query('SELECT title, price FROM website_templates');
        console.log('Current Prices:');
        rows.forEach(r => console.log(`${r.title}: ₹${r.price}`));
    } finally {
        client.release();
        process.exit(0);
    }
}

checkPrices();
