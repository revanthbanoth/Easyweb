const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const initDB = async () => {
  const client = await pool.connect();
  try {
    // Users table
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Website templates table
    await client.query(`
      CREATE TABLE IF NOT EXISTS website_templates (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        preview_image TEXT,
        demo_url TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Orders table
    await client.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
        template_id INTEGER REFERENCES website_templates(id) ON DELETE SET NULL,
        business_name VARCHAR(255),
        business_category VARCHAR(100),
        phone VARCHAR(20),
        email VARCHAR(255),
        order_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Payments table
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
        amount DECIMAL(10, 2),
        payment_status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // Contact messages table
    await client.query(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log('✅ All database tables created/verified successfully.');

    // Seed templates if table is empty
    const { rows } = await client.query('SELECT COUNT(*) FROM website_templates');
    if (parseInt(rows[0].count) === 0) {
      await client.query(`
        INSERT INTO website_templates (title, category, description, price, preview_image, demo_url) VALUES
        ('MedCare Pro', 'Healthcare', 'A professional website for clinics, doctors, and healthcare providers. Features appointment booking, doctor profiles, and service listings.', 4999, 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80', 'https://demo.easyweb.com/medcare'),
        ('FitZone Elite', 'Fitness', 'High-energy gym and fitness center website with class schedules, trainer profiles, membership plans, and online booking.', 3999, 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&q=80', 'https://demo.easyweb.com/fitzone'),
        ('Savoria Restaurant', 'Restaurant', 'Elegant restaurant website with menu showcase, online reservations, gallery, chef profiles, and location integration.', 2999, 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80', 'https://demo.easyweb.com/savoria'),
        ('LegalEdge Law', 'Legal', 'Professional law firm website with practice areas, attorney profiles, case results, and consultation booking.', 4999, 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80', 'https://demo.easyweb.com/legaledge'),
        ('BeautyBliss Salon', 'Beauty', 'Stunning salon and spa website with service menu, portfolio gallery, booking system, and stylist profiles.', 2999, 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80', 'https://demo.easyweb.com/beautybliss'),
        ('EduLearn Academy', 'Education', 'Modern education platform website with course listings, instructor profiles, enrollment system, and student testimonials.', 3999, 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', 'https://demo.easyweb.com/edulearn'),
        ('TechStart Agency', 'Technology', 'Sleek tech agency website with portfolio showcase, service offerings, team section, and client logos.', 4999, 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80', 'https://demo.easyweb.com/techstart'),
        ('RealEstate Pro', 'Real Estate', 'Premium real estate agency website with property listings, agent profiles, search filters, and virtual tour integration.', 4999, 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', 'https://demo.easyweb.com/realestate')
      `);
      console.log('✅ Sample template data seeded successfully.');
    } else {
      // Update existing templates if they have old prices (only do this once)
      await client.query(`
        UPDATE website_templates SET price = 4999 WHERE price < 1000 AND category IN ('Healthcare', 'Legal', 'Technology', 'Real Estate');
        UPDATE website_templates SET price = 3999 WHERE price < 1000 AND category IN ('Fitness', 'Education');
        UPDATE website_templates SET price = 2999 WHERE price < 1000 AND category IN ('Restaurant', 'Beauty');
      `);
      console.log('✅ Existing template prices updated to professional levels.');
    }
  } finally {
    client.release();
  }
};

module.exports = { pool, initDB };
