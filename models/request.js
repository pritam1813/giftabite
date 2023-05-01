// Importing mongoose.js for creating mongoDB schemas
const mongoose = require('mongoose');
const User = require('./user');                 //Importing User DB

const requestSchema = new mongoose.Schema({
    requestedBy: {
        type: mongoose.Schema.Types.ObjectId,       //Referencing to user's db, so we know 
        ref: 'User'                                 // which request is made by which user
    },
        // Meals Quantity
    quantity: {
        type: Number,
        required: true
    },
        //Request completion status
    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    address: {
        type: String,
        required: true
    },
    addressType: {
      type: String,
      enum: ['pickup', 'delivery']
    }
},{
    timestamps: true
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;