// Import wallet Models and joi schema
const Wallet = require('../models/walletModel');
const {
    Transaction,
} = require('../models/transactionModel');
const { isMatch } = require('../utils/Hash');
// Import Errors
const { badRequestError } = require('../errors');

const transfer = async (req, res) => {
    // Get tranfer details and pin from request body and check that they are not empty
    const { Amount, AccountNumber, Pin, Description } =
        req.body;
    if (!Pin || !AccountNumber || !Amount || !Description) {
        throw new badRequestError(
            'Please provide all required fields'
        );
    }

    // Get User information
    const { WalletId } = req.user;

    // Get Senderwallet info
    const wallet = await Wallet.findById(WalletId);

    // Get info about reciever wallet
    const RecieverWallet = await Wallet.findOne({
        AccountNumber,
    });
    // Check if reciever account exists
    if (!RecieverWallet) {
        throw new badRequestError(
            'Account Number does not exist'
        );
    }

    // Check if Pin is correct
    await isMatch(Pin, wallet.Pin, 'Incorrect Pin');

    // Remove Amount from user(sender) wallet
    wallet.Balance = +wallet.Balance - +Amount;
    await wallet.save();

    // Add Amount to reciever Account
    RecieverWallet.Balance =
        +RecieverWallet.Balance + +Amount;
    await RecieverWallet.save();

    // Create a transaction
    // Append createdAccount and DebitedAccount to request body
    req.body.CreditedAccount = WalletId;
    req.body.DebitedAccount = RecieverWallet._id;
    const transaction = await Transaction.create(req.body);

    // Respond with transaction details
    res.json({ transaction });
};

module.exports = {
    transfer,
};
