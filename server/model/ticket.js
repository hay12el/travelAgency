const mongoose = require('mongoose')

const schema = mongoose.Schema;

const ticketSchema = new schema({
    flightId: {
        type: schema.Types.ObjectId,
        required: true,
        ref: "Flight"
    },
    userId:{
        type: schema.Types.ObjectId,
        required: true,
        ref: "User" 
    },
    seatNumber: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Ticket", ticketSchema);