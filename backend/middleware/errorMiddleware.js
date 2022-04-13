//function to catch error thrown anywhere from the app - takes in the error, req, res and next
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500 //setting the status of the res, checking the statusCode on each res which is set with res.send(400) then assign the statusCode to 400 or 500 if no status code and server error
    res.status(statusCode)

    //send back json with the message as the message included with the res and stack of that error if app is in development
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = errorHandler 