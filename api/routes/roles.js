const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth-check')
const admin = require('../middlewares/admin')
const level3 = require('../middlewares/level3')
//import controller
const RolesController =  require('../controllers/role')

//routes reources in regards to everything to do with orders -crud
router.get('/', auth, admin, level3, RolesController.getRoles)
router.post('/', auth, admin, level3, RolesController.postRoles)
router.get('/:id', auth, admin, level3, RolesController.getRole)
router.delete('/:id', auth, admin, level3, RolesController.deleteRole)
module.exports = router