const Ticket = require('../models/ticketModel')
const User = require('../models/userModel')

const asyncHandler = require('express-async-handler') //Easier syntax to call async await functions because Moongose will return promises see more - https://github.com/Abazhenov/express-async-handler

//@desc    Get user's tickets
//@route    GET /api/tickets
//@access   Private
const getTickets = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user._id)
    const tickets = await Ticket.find({userId: user._id})

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    } else {
        res.status(200).json(tickets)

    }
 })


//@desc    Create a new ticket
//@route    POST /api/tickets
//@access   Private
const createTicket = asyncHandler(async (req, res) => {
   const { subject, body } = req.body
   const user = await User.findById(req.user._id)
   
   Ticket.create({
       subject,
       body,
       userId: user._id
   })

    res.send(req.body)
})

module.exports = {
  createTicket,
  getTickets
}