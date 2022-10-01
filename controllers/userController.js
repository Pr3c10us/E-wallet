// Import Dependencies
const User = require('../models/userModel');
const Wallet = require('../models/walletModel');
const { Hash } = require('../utils/Hash');

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

    // console.log(req.body.Pin);
};

const Login = (req, res) => {
    res.send('Login');
};

const Logout = (req, res) => {
    res.send('Logout');
};

module.exports = {
    Register,
    Login,
    Logout,
};
