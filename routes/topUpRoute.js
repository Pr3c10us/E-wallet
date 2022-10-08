// Import topUp controller
const {
    topUp,
    webhook,
} = require('../controllers/topUpController');

// Import router
const router = require('express').Router();

// Create post route for topUp
router.route('/:id').get(topUp);
// router.route('/webhook').post(webhook);

module.exports = router;
