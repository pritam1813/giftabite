// Importing mongoose.js for creating mongoDB schemas
const mongoose = require('mongoose');

//Creating User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        match: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&amp;*-]).{8,}$/
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^\d{10}$/
    },
    registerAs: {
        type: String,
        enum: ['NGO', 'Volunteer', 'Restaurant', 'Donor']
    }
});

//Telling mongoose it is a mongoDB model
const User = mongoose.model('User', userSchema);

//Exporting the model
module.exports = User;