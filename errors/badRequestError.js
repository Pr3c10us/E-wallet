const customError = require('./customError');

class badRequestError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

module.exports = badRequestError;
