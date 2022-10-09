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
        required: [true, 'Please add a Credit wallet ID'],
        min: [10, 'Pin must be at least 10 characters'],
        max: [10, 'Pin must be less than 10 characters'],
    },
    DebitedAccount: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Please add a Debit wallet ID'],
        min: [10, 'Pin must be at least 10 characters'],
        max: [10, 'Pin must be less than 10 characters'],
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
    },
    CreditedAccountFullName: {
        type: String,
        required: [
            true,
            'Please add Credited wallet Fullname',
        ],
    },
    DebitedAccountFullName: {
        type: String,
        required: [
            true,
            'Please add Debited wallet Fullname',
        ],
    },
    CreditedAccountNumber: {
        type: String,
        required: [
            true,
            'Please add a Credit wallet account number',
        ],
    },
    DebitedAccountNumber: {
        type: String,
        required: [
            true,
            'Please add a Debit wallet account number',
        ],
    },
    CreditedBank: {
        type: String,
        required: [true, 'Please add a Credited bank'],
    },
    DebitedBank: {
        type: String,
        required: [true, 'Please add Debited a bank'],
    },
    TransactionType: {
        type: String,
        enum: ['Top Up', 'Transfer'],
        required: [true, 'Please add a transaction type'],
    },
});

const Transaction = mongoose.model('Transaction', Schema);

module.exports = {
    Transaction,
};
