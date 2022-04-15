const express = require('express')
const router = express.Router()
const { createTicket, getTickets } = require('../controllers/ticketController')
const { protect } = require('../middleware/authMiddleware')

//use .route to chain on requests
router.route('/').get(protect, getTickets).post(protect, createTicket)


module.exports = router