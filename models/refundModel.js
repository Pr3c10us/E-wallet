//Create a modek for failedRefund and export it
const mongoose = require('mongoose');

const RefundSchema = new mongoose.Schema({
    TransactionId: {
        type: String,
        required: true,
    },
    Amount: {
        type: Number,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    },
    Email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Refund', RefundSchema);
