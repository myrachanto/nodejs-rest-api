const mongoose = require('mongoose')

const roleSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    level1: { type: String, default: 'level1' },
    level2: { type: String, default: 'level2' },
    level3: { type: String, default: 'level3' }

})

module.exports = mongoose.model('Role', roleSchema)