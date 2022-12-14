const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user'],
        unique: [true, 'User already has a wallet'],
    },
    Balance: {
        type: Number,
        default: 0,
    },
    Currency: {
        type: String,
        default: 'NGN',
    },
    Pin: {
        type: String,
        required: [true, 'Please add a pin'],
        min: [4, 'Pin must be at least 4 characters'],
        max: [4, 'Pin must be less than 4 characters'],
    },
    AccountNumber: {
        type: String,
        required: [true, 'Please add an account number'],
        unique: [true, 'Account number already exist'],
        min: [10, 'Pin must be at least 10 characters'],
        max: [10, 'Pin must be less than 10 characters'],
    },
});

module.exports = mongoose.model('Wallet', Schema);
