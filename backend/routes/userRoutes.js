const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getMe} = require('../controllers/userController')
const { protect } = require("../middleware/authMiddleware")

//each route has a function coming from a controller userController
router.post('/', registerUser)
router.post('/login', loginUser)
//if route calls the protect middleware, it needs a JWT to get through so will calls protect first then getMe
router.get('/me', protect, getMe)

module.exports = router