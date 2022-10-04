// Impore Dependencies
require('dotenv').config();

// Import jsonwebtoken
const jwt = require('jsonwebtoken');

const createAndSendToken = async (user, wallet, res) => {
    // Destructure user and wallet data
    const { _id: UserId, Firstname, Lastname } = user;
    const {
        _id: WalletId,
        Balance,
        AccountNumber,
    } = wallet;

    // Create payload from destructured user and walle data
    const payLoad = {
        UserId,
        WalletId,
        Firstname,
        Lastname,
        Balance,
        AccountNumber,
    };

    // create Token
    const Token = await jwt.sign(
        payLoad,
        process.env.jwt_secret,
        {
            expiresIn: '1h',
        }
    );

    // send token to browser as cookie
    res.cookie('Token', Token, {
        expires: new Date(Date.now() + 1000 * 60 * 60),
        signed: true,
    });
};

module.exports = {
    createAndSendToken,
};
