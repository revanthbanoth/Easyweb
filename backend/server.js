require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDB } = require('./db');

const templateRoutes = require('./routes/templateRoutes');
const orderRoutes = require('./routes/orderRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware — allow all localhost origins (any port) + production URL
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (curl, Postman, server-to-server)
        if (!origin) return callback(null, true);
        // Allow any localhost port (5173, 5174, 3000, etc.)
        if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return callback(null, true);
        // Allow configured production frontend URL
        if (process.env.FRONTEND_URL && origin === process.env.FRONTEND_URL) return callback(null, true);
        callback(new Error(`CORS blocked: ${origin}`));
    },
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint used by uptime monitoring services
// Prevents Render free servers from sleeping by receiving periodic pings
app.get("/health", (req, res) => {
    console.log("Health check ping received");
    res.status(200).json({
        status: "ok",
        service: "EasyWeb backend",
        timestamp: new Date()
    });
});

// Routes
app.use('/api/templates', templateRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'EasyWeb API is running 🚀' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Startup
const start = async () => {
    try {
        await initDB();
        app.listen(PORT, () => {
            console.log(`\n🚀 EasyWeb server is running on http://localhost:${PORT}`);
            console.log(`📦 API available at http://localhost:${PORT}/api`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

start();
