// Import bcrypt
const bcrypt = require('bcryptjs');

const Hash = (word) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedword = bcrypt.hashSync(word, salt);

    return hashedword;
};

module.exports = {
    Hash,
};
