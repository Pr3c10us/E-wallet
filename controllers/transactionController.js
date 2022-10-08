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

    // Check if AccountNumber is the same as the user's account number
    if (wallet.AccountNumber === AccountNumber) {
        throw new badRequestError(
            'You cannot transfer to your own account'
        );
    }

    // Check if Pin is correct
    await isMatch(Pin, wallet.Pin, 'Incorrect Pin');

    if (Amount > wallet.Balance) {
        throw new badRequestError('Insufficient Balance');
    }

    // Remove Amount from user(sender) wallet
    wallet.Balance = wallet.Balance - Amount;
    await wallet.save();

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
    // Add Amount to reciever Account
    RecieverWallet.Balance =
        +RecieverWallet.Balance + +Amount;
    await RecieverWallet.save();

    // Create a transaction
    // Append createdAccount and DebitedAccount to request body
    req.body.CreditedAccount = RecieverWallet._id;
    req.body.DebitedAccount = WalletId;
    const transaction = await Transaction.create(req.body);

    // Respond with transaction details
    transaction.Amount = -transaction.Amount;
    res.json({ transaction });
};

const getTransactions = async (req, res) => {
    // Get User wallet Id
    const { WalletId } = req.user;

    // Get query parameters
    const { transactionType, startDate, endDate } =
        req.query;

    // Set filter to an empty object
    let filter = {};

    // Set filter for both transaction types if transactionType is not provided
    if (!transactionType) {
        filter.$or = [
            { CreditedAccount: WalletId },
            { DebitedAccount: WalletId },
        ];
    }
    // Set filter for either credit or debit transactions
    if (transactionType === 'credit') {
        filter.CreditedAccount = WalletId;
    }
    if (transactionType === 'debit') {
        filter.DebitedAccount = WalletId;
    }

    // Set filter for startDate if provided
    if (startDate) {
        filter.CreatedAt = { $gte: startDate };
    }

    // Set filter for endDate if provided
    if (endDate) {
        filter.CreatedAt = { $lt: endDate };
    }

    //Get all Transactions associated to user wallet based on filter
    const transactions = await Transaction.find(
        filter
    ).sort('CreatedAt');

    // if transaction is a debit transaction,display the amount as negative in response
    transactions.forEach((transaction) => {
        if (
            transaction.DebitedAccount.toString() ===
            WalletId.toString()
        ) {
            transaction.Amount = -transaction.Amount;
        }
    });

    // Respond with all transactions
    res.json({
        nbHits: transactions.length,
        transactions,
    });
};

module.exports = {
    transfer,
    getTransactions,
};
