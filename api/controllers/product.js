const mongoose = require('mongoose')

//import the product model schema
const Product = require('../models/product')
exports.getproducts = async (req, res, next) => {
    try {
      const products = await Product.find().select("name price _id picture").exec()
      res.send({
        status: true,
        message: 'resource found',
        result: products
    })
    }catch{
        res.send({
            status: false,
            message: 'resource not found',
            result: {}
        })
    }
}
exports.postProducts = async (req, res, next) => {
    try {
        console.log(req.file)
     await Product.create({
         _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
         price: req.body.price,
         picture: req.file.path
     })
     res.send({
         status: true,
         message: 'item created successifuly',
         error:{}
     })
    } catch (err){
          res.send({
             status: false,
             message: 'Failed to create',
             error: err
         })
    }
 }
 exports.getProduct = async (req,res, next) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id).exec()
        res.status(200).json({
            status: true,
            message: 'resource found',
            result: product
        })
    } catch {
        res.send({
            status: false,
            message: 'resource not found',
            result: {}
        })
    }
}
exports.updateProduct =  async (req,res, next) => {
    try {
        const id = req.params.id
    const updatedproduct = {}
    for (let [k,v] of Object.entries(req.body)){
        updatedproduct[k] = v
        }
    await Product.updateOne({_id:id}, {$set:updatedproduct}).exec()
    res.send({
            status: true,
            message: 'resource updated',
        })
    } catch {
        res.send({
            status: false,
            message: 'resource not found',
        })
    }
}
exports.deleteProduct = async (req,res, next) => {
    try {
        const id = req.params.id
        await  Product.remove({_id:id}).exec()
        res.send({
            status: true,
            message: 'item deleted succesifully',
        })
    }catch {
        res.send({
            status: false,
            message: 'resource not found',
        })
    }
}