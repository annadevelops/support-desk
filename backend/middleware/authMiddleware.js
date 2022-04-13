const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token

    //check if the header of the request has authorization and the authorization starts with Bearer which is how a JWT is stored
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //set token by spliting the JWT authorization in header at " " - this is because JWT is stored as 'Bear JWT' so split at " " to create an array and assign token to be the second item in array
            token = req.headers.authorization.split(" ")[1]
            //using jsonwebtoken method verify to decode the token then .id to get the id that was passed into the generateToken() in userController
            const decoded = jwt.verify(token, process.env.JWT_SECRET).id
            //set the req to have a req.user to be the doc in db that matches the id of the id from token - then calls select(-password) so not return the password of user
            req.user = await User.findById(decoded).select('-password')

            //using next to call the next middleWare - for /api/users/me that is the getMe middleware in userController
            next()
        } catch (error) {
            console.log(error)
            res.status(400)
            throw new Error('Not authorized')
        }

    }

    if(!token) {
        res.status(400)
        throw new Error('Not authorized')
    }
})

module.exports = { protect }
