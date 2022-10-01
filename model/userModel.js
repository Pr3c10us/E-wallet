const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Firstname: {
        type: String,
        required: [true, 'Please add a name'],
        min: [3, 'Name must be at least 3 characters'],
        max: [20, 'Name must be less than 20 characters'],
    },
    Secondname: {
        type: String,
        required: [true, 'Please add a name'],
        min: [3, 'Name must be at least 3 characters'],
        max: [20, 'Name must be less than 20 characters'],
    },
    Email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: [true, 'Email already exists'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    Phonenumber: {
        type: Number,
        required: [true, 'Please add a phone number'],
        unique: [true, 'Phone number already exists'],
        min: [
            11,
            'Phone number must be at least 11 characters',
        ],
        max: [
            11,
            'Phone number must be less than 11 characters',
        ],
    },
    Password: {
        type: String,
        required: [true, 'Please add a password'],
        min: [6, 'Password must be at least 6 characters'],
        max: [
            20,
            'Password must be less than 20 characters',
        ],
    },
});

module.exports = mongoose.model('User', Schema);
