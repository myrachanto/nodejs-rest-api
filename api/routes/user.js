const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth-check')
const level3 = require('../middlewares/level3')
const admin = require('../middlewares/admin')
//import user controllers
const usercontrollers = require('../controllers/user')
//routes reources in regards to everything to do with orders -crud
router.get('/', usercontrollers.getusers)
router.post('/register', usercontrollers.register)
router.post('/login', usercontrollers.login)
router.patch('/:id', auth, level3, usercontrollers.updateUsers)
router.delete('/:id', auth, admin, level3, usercontrollers.delete)
module.exports = router