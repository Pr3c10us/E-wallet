// Import bcrypt and badRequestError
const bcrypt = require('bcryptjs');
const { badRequestError } = require('../errors');

const Hash = (word) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedword = bcrypt.hashSync(word, salt);

    return hashedword;
};

const isMatch = async (word, hashedWord, message) => {
    const correct = bcrypt.compareSync(word, hashedWord);

    if (!correct) {
        throw new badRequestError(message);
    }
};

module.exports = {
    Hash,
    isMatch,
};
