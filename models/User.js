const mongoose = require('mongoose');

//create the schema for an user
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        minLength: 8
    }
});

//use the schema inside a model
const User = mongoose.model('User', userSchema);

module.exports = User;