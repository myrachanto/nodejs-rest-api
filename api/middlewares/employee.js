const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY )
        if (decoded.role != 'employee'){
            throw err
        }
        next()
    }catch(err){
        res.send({
            status: false,
            message: "authorization failed",
         })
    }
}