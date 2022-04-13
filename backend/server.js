const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const  errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db') //get the connectDB() which initialise and connects to MongoDB with Mongoose
const PORT = process.env.PORT || 8000

//Connect to database
connectDB()

const app = express()

//express methods to read the body of the request - used to need bodyParser installed but now comes with Express
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req,res) => {
    res.send('Hello')
})

//Routes - which returned by the Router in userRoutes. So if requests send to /api/users/ - will be register and /api/users/login will be login
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, () => console.log('Server started'))