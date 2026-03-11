const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

async function updatePrices() {
    const client = await pool.connect();
    try {
        console.log('🔄 Updating template prices to professional levels...');
        await client.query(`
      UPDATE website_templates SET price = 4999 WHERE price < 1000 AND category IN ('Healthcare', 'Legal', 'Technology', 'Real Estate');
      UPDATE website_templates SET price = 3999 WHERE price < 1000 AND category IN ('Fitness', 'Education');
      UPDATE website_templates SET price = 2999 WHERE price < 1000 AND category IN ('Restaurant', 'Beauty');
    `);
        console.log('✅ Prices updated successfully!');
    } catch (err) {
        console.error('❌ Update failed:', err.message);
    } finally {
        client.release();
        process.exit(0);
    }
}

updatePrices();
