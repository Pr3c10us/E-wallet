// Import dependencies
require('dotenv').config();
require('express-async-errors');
const mongoose = require('mongoose');

// Import Express
const express = require('express');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

// Import routes
const userRoutes = require('./routes/userRoutes');

//
// Middleware
app.use(express.json());

// Routes
app.use('/api/user', userRoutes);

// Setup for root url
app.get('/', (req, res) => {
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
