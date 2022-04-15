//Create a Mongoose Schema and Model
const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: [true, 'Please enter the subject of the ticket']
    },
    body: {
        type: String,
        required: [true, 'Please provide in details the issue']
    },
    userId: {
        type: String
    },
}, { timestamps: true })

module.exports = mongoose.model('Ticket', ticketSchema);