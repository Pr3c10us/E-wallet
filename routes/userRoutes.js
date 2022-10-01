// create router
const router = require('express').Router();

// Import controller
const {
    Register,
    Login,
    Logout,
} = require('../controllers/userController');

router.route('/register').post(Register);
router.route('/login').post(Login);
router.route('/logout').get(Logout);

// Export router
module.exports = router;
