const express = require('express')
const router = express.Router()
const {registerUser, loginUser} = require('../controllers/userController')

//each route has a function coming from a controller userController
router.post('/', registerUser)

router.post('/login', loginUser)

module.exports = router