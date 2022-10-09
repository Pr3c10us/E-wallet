// Import dependencies
require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');

// Import Express
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

// Import routes
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoute');
const topUpRoutes = require('./routes/topUpRoute');

//
// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.jwt_secret));

// Routes
app.use('/api/user', userRoutes);
app.use('/api/transaction/', transactionRoutes);
app.use('/api/topUp/', topUpRoutes);

// Setup for root url
app.get('/', async (req, res) => {
    res.json({ msg: 'Hi' });
});

// Middleware for notFound and errorHandler
app.use((req, res) => {
    res.status(404).json({ msg: 'Route Not Found' });
});
app.use(errorHandler);

//
// create port variable
const port = process.env.port || 3001;

// Server Api
const Serve = async () => {
    // Connect to Database
    mongoose.connect(process.env.mongo_uri);
    console.log('Connect to db');

    app.listen(port, () =>
        console.log(
            `Checkout Api on http://localhost:${port}`
        )
    );
};
Serve();
