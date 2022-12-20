const mongoose = require('mongoose');
const {Schema} = require('mongoose');

const userSchema = new Schema({
    fName: {
        type: String,
        required: true
    },
    lName: {
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
        required: true
    },
    phone: {
        type: String,
        required: true 
    },
    isAdmin: {
        type: Boolean,
    },
    bDate: {
        type: Date,
        required: true
    }, 
    country: {
        type: String,
        required: true
    },
    CCNumber:{
        type: Number,
        required: false,
        unique: true
    }
})

module.exports = mongoose.model("User", userSchema);