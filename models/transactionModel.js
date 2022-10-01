const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Amount: {
        type: Number,
        required: [true, 'Please add an amount'],
    },
    Description: {
        type: String,
        required: [true, 'Please add a description'],
        default: 'Nil',
    },
    CreditedWallet: {
        type: mongoose.Schema.ObjectId,
        ref: 'Wallet',
        required: [true, 'Please add a wallet'],
    },
    DebitedWallet: {
        type: mongoose.Schema.ObjectId,
        ref: 'Wallet',
        required: [true, 'Please add a wallet'],
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Transaction', Schema);
