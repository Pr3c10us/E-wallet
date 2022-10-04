// Import router
const router = require('express').Router();
const {authenticateUser} = require('../middlewares/authenticateUser');

// Import Controllers
const {
    transfer,
} = require('../controllers/transactionController');

router.route('/transfer').post(authenticateUser, transfer);

module.exports = router;
