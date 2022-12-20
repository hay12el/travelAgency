const mongoose = require('mongoose');

const schema = mongoose.Schema;

const flightSchema = new schema({
    to: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    landHour:{
        type: Number,
        required: true
    },
    depHour:{
        type: Number,
        required: true
    },
    numOfSeats: {
        type: Number,
        required: true
    },
    seats: {
        type: [Number]
    },
    price: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Flight", flightSchema);