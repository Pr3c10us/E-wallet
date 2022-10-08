//Import needed dependencis
require('dotenv').config();
const axios = require('axios');
//Import models
const User = require('../models/userModel');
const refund = require('../utils/refundUtils');
const {
    Transaction,
} = require('../models/transactionModel');
const Wallet = require('../models/walletModel');

const topUp = async (req, res) => {
    // Get user id from params
    const { id } = req.params;

    // Verify transaction from paystack
    const { data } = await axios.get(
        `https://api.paystack.co/transaction/verify/${id}`,
        {
            headers: {
                authorization: `Bearer ${process.env.paystack_secret}`,
            },
        }
    );

    if (!data.status) {
        return res.status(400).json({
            msg: 'Transaction failed',
        });
    }
    // Check if customer email is in the database
    const userExist = await User.findOne({
        Email: data.data.customer.email,
    });

    // If user is not in the database refund the transaction
    if (!userExist) {
        await refund(id, data, res);
    } else {
        // If user is in the database top up the user
        // Add the amount to the user's wallet
        const amount = data.data.amount / 100;

        // Get the user's wallet
        const wallet = await Wallet.findOne({
            UserId: userExist._id,
        });
        // Add the amount to the user's wallet
        wallet.Balance += amount;
        //Save
        await wallet.save();

        // Add the transaction to the user's transaction history
        const transaction = {
            Amount: amount,
            Description: 'Top up',
            CreditedAccount: wallet._id,
            DebitedAccount: '6341e3ba64f3f1fc8cc46de0',
        };
        await Transaction.create(transaction);

        // Send response
        res.json({
            msg: `Your wallet has been topped up with ${amount}`,
        });
    }
};

const webhook = async (req, res) => {
    console.log(req.body);
    res.status(200);
};

module.exports = {
    topUp,
    webhook,
};
