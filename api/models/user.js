const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { 
        type: String,
         required: true,
         unique: true },
    password: { type: String, required: true   },
    role: { type: String, default: 'basic' },
    level: { type: String, default: 'level1' }
    

})

module.exports = mongoose.model('User', userSchema)