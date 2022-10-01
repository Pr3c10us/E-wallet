//Import tools
const jwt = require('jsonwebtoken');
const {
    unAuthorizedError,
    badRequestError,
} = require('../errors');
// Import models
const User = require('../models/userModel');
const Wallet = require('../models/walletModel');
// Import Utils
const { Hash, isMatch } = require('../utils/Hash');
const { createAndSendToken } = require('../utils/Token');

const Register = async (req, res) => {
    // hash password
    req.body.Password = Hash(req.body.Password);

    // Create user
    const user = await User.create(req.body);

    // Create wallet
    const wallet = await Wallet.create({
        UserId: user._id,
        Pin: req.body.Pin,
    });

    // Create and Send a Token
    await createAndSendToken(user, wallet, res);

    res.json({ msg: 'Account created successfully' });
};

const Login = async (req, res) => {
    // Check if email and password is present
    let { Email, Password } = req.body;
    if (!Email || !Password) {
        throw new badRequestError(
            `Email or Password is missing`
        );
    }

    // Check if user with email specified exist
    const user = await User.findOne({
        Email,
    });
    if (!user) {
        throw new unAuthorizedError(
            `User with email ${req.body.Email} does not exist `
        );
    }

    // Check if password is correct
    await isMatch(
        Password,
        user.Password,
        'Password is incorrect'
    );

    // Get wallet info
    const wallet = await Wallet.findOne({
        UserId: user._id,
    });

    // Create and Send a Token
    await createAndSendToken(user, wallet, res);

    res.json({ msg: 'Successfully Loged In' });
};

const Logout = (req, res) => {
    res.send('Logout');
};

module.exports = {
    Register,
    Login,
    Logout,
};
