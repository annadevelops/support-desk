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

 //@desc    Get user's tickets
//@route    GET /api/tickets/:id
//@access   Private
const getTicket = asyncHandler(async (req, res) => {
    //Get user using the id in the JWT
    const user = await User.findById(req.user._id)
    const ticket = await Ticket.findById(req.params.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found')
    } else {
        res.status(200).json(ticket)

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
       user: user._id
   })

    res.status(200).json(req.body)
})

//@desc    Delete a ticket
//@route    DELETE /api/tickets/:id
//@access   Private
const deleteTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id)
    await Ticket.deleteOne({_id: ticket})
    res.status(200).json({success: true})
   
 })

 //@desc    Update a ticket
//@route    PUT /api/tickets/:id
//@access   Private
const updateTicket = asyncHandler(async (req, res) => {
    const ticket = await Ticket.findById(req.params.id)
    const updatedTicket = await Ticket.findOneAndUpdate({_id: ticket}, req.body, { new: true })
    res.status(200).json(updatedTicket)
   
 })

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket
}