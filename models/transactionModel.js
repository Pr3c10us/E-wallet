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
    CreditedAccount: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please add a wallet'],
        min: [10, 'Pin must be at least 10 characters'],
        max: [10, 'Pin must be less than 10 characters'],
    },
    DebitedAccount: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please add a wallet'],
        min: [10, 'Pin must be at least 10 characters'],
        max: [10, 'Pin must be less than 10 characters'],
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
});





const Transaction = mongoose.model('Transaction', Schema);

module.exports = {
    Transaction,
}
