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

router.route('/transfer').post(authenticateUser, transfer);
router
    .route('/transactions')
    .get(authenticateUser, getTransactions);

module.exports = router;
