const customError = require('./customError');

class unAuthorizedError extends customError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

module.exports = unAuthorizedError;
