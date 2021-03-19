const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()

//import routes
const productroutes = require('./api/routes/product')
const orderroutes = require('./api/routes/order')
const userroutes = require('./api/routes/user')
const roleroutes = require('./api/routes/roles')

//database connection
mongoose.connect( process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true  } ).then(() => {
    console.log("succesifully connected to mognodb")
}).catch(err => {
    console.log("well check your mongodb coz something went wrong it did not connect!")
})
//logg request with morgan
app.use(morgan('dev'))
//provide uploads folder to be available to the frontend
app.use('/uploads', express.static('uploads'))
//parse data from forms used to be body-parser but now its depricated
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//configure cors to accpt cross origin site requests
app.use((req, res, next) => {
    res.header('Access-control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

//hook the import routes to the app for naviagation
app.use('/products', productroutes)
app.use('/order', orderroutes)
app.use('/user', userroutes)
app.use('/role', roleroutes)

//this middleware captures errors preciselly not found resources
app.use((req,res,next) => {
    const error = new Error('resource not found')
    error.status = 404
    next(error)
})
//this middleware capture others errors most probably 500 server and db related errors
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
})
module.exports = app