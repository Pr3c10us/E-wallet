// Import router
const router = require('express').Router();
const {
    authenticateUser,
} = require('../middlewares/authenticateUser');

// Import Controllers
const {
    transfer,
    getTransactions,
} = require('../controllers/transactionController');
const {
    verifyAccountNumber,
    initiateExternalTransfer,
} = require('../controllers/externalTransferController');

// Route for transfer within the app
router
    .route('/transfer/e-wal')
    .post(authenticateUser, transfer);

// Route to verify account number
router
    .route('/transfer/external/verifyAccountNumber')
    .post(authenticateUser, verifyAccountNumber);

// Route to initiate external transfer
router
    .route('/transfer/external')
    .post(authenticateUser, initiateExternalTransfer);

// Route to get transactions
router.route('/').get(authenticateUser, getTransactions);

// Route to check if a transfer exists


module.exports = router;
