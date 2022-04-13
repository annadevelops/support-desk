const User = require('../models/userModel')
const bcrypt = require('bcryptjs') //to hash password before storing to DB
const saltRounds = bcrypt.genSaltSync(10) //salt rounds for bcrypt hash
const jwt = require('jsonwebtoken')

const asyncHandler = require('express-async-handler') //Easier syntax to call async await functions because Moongose will return promises see more - https://github.com/Abazhenov/express-async-handler


//@desc    Register a user
//@route    /api/users
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body

     //check if one of those fields are missing then set the res status to 400 then throw a new Error with message 'please include all fields' which will then be caught by the errorMiddleware to send back a json object. If no errorMiddleware configured then the default Express Error Handler will return a HTML page
     if(!name || !email || !password) {
        res.status(400)
        throw new Error('Please include all fields')
    }

    //Hash password and store in hashPassword
    const hashPassword = await bcrypt.hash(password, saltRounds)
    //Check with email sent in req to see if there's a User with that email
    const userExists = await User.findOne({email})

    const newUser = new User({
        name,
        email,
        password: hashPassword
    })

    if(userExists) {
        res.status(400)
        throw new Error('User already exists')
    } else {
        await newUser.save()
        res.status(201)
        res.json({
            _id: newUser._id,
            user: newUser,
            token: generateToken(newUser._id)
        })
    }
})

//@desc    Login a user
//@route    /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    //check if email exists i.e. user also exists before logging in
    const user = await User.findOne({email})

    //check if email exits and hashPassword stored matches the password sending in the body
    if(user && (bcrypt.compareSync(password, user.password))) {
        res.status(200)
        res.json({
            _id: user._id,
            user: user,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid credentials')
    }
})

//Generate a JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    registerUser,
    loginUser
}