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

    res.send('User registered')
})

//@desc    Login a user
//@route    /api/users/login
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
    res.send('Login Route')
})

module.exports = {
    registerUser,
    loginUser
}