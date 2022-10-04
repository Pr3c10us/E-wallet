// import dependencies
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Import Errors
const { unAuthorizedError } = require('../errors');

const authenticateUser = async (req, res, next) => {
    // Check for token
    const token = await req.signedCookies.Token;
    if (!token) {
        throw new unAuthorizedError(
            'Token not present or has been tampared with'
        );
    }

    // get UserInfo from Token and if theres an error throw unauthenticated eror
    try {
        req.user = jwt.verify(
            token,
            process.env.jwt_secret
        );

        next();
    } catch (error) {
        throw new unAuthorizedError(
            'Authentication invalid!!!'
        );
    }
};

module.exports = {
    authenticateUser,
};
