const express = require('express')
const multer = require('multer')
const auth = require('../middlewares/auth-check')
const router = express.Router()
const productcontrollers = require('../controllers/product')

const storage = multer.diskStorage({
    destination: function (req, file,cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb)  {
        cb(null, file.originalname)
    }
})
const fileFilter = (req,file, cb)=> {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        
         cb(null, true)
    }else{
        cb(null, false)
    }
}
const upload = multer({
    storage: storage, 
    limit:{
    fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
})


//routes reources in regards to everything to do with products -crud
router.get('/', productcontrollers.getproducts)
router.post('/', auth, upload.single('image'), productcontrollers.postProducts)
router.get('/:id', productcontrollers.getProduct)
router.patch('/:id', auth, productcontrollers.updateProduct)
router.delete('/:id', auth, productcontrollers.deleteProduct)
module.exports = router