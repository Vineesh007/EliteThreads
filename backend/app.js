const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const connectDatabase = require('./config/connectDatabase');
const authRoutes = require('./routes/authRoutes');
const products = require('./routes/product');
const orders = require('./routes/order');
const app = express();
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');

// const cookieParser = require('cookie-parser');

// app.use(cookieParser());
require('dotenv').config({path:'./config/config.env'});
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// Load environment variables from the .env file
dotenv.config({ path: path.join(__dirname,'config.env') });

// Connect to the database
connectDatabase();

// Middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
// Session Middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false, httpOnly: true, sameSite: "lax", maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/v1/', products);  // Products route
app.use('/api/v1/', orders);    // Orders route
app.use('/api/auth', authRoutes);  // Auth routes for login/signup
app.use('/api/admin', adminRoutes); // Ensure correct endpoint
app.use('/api/v1', paymentRoutes);
// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'frontend', 'build')));

    // Serve index.html for any route that doesn't match
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html'));
    });
}

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server listening on Port ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
