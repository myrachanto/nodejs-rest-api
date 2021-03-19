const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_KEY )
        console.log(decoded)
        if (decoded.level != 'level1'){
            throw err
        }
        next()
    }catch(err){
        res.send({
            status: false,
            message: "not authorised to access this resource!",
         })
    }
}