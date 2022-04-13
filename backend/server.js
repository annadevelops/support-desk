const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000

const app = express()

app.get('/', (req,res) => {
    res.send('Hello')
})

//Routes - which returned by the Router in userRoutes. So if requests send to /api/users/ - will be register and /api/users/login will be login
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log('Server started'))