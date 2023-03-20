const mongoose = require('mongoose');
const { isEmail } = require('validator');

//create the schema for an user
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'],
    },

    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [8, 'Minimum password length is 8 characters']
    }
});

//use the schema inside a model
const User = mongoose.model('User', userSchema);

module.exports = User;