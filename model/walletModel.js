const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    UserId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please add a user'],
    },
    Balance: {
        type: Number,
        required: [true, 'Please add a balance'],
    },
});

module.exports = mongoose.model('Wallet', Schema);
