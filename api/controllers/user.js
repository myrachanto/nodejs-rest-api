const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//import model
const User = require('../models/user')

exports.getusers = async (req, res, next) => {
    try {
        const users = await User.find().exec()
        res.send({
          status: true,
          message: 'resource found',
          result: users
      })
      }catch{
          res.send({
              status: false,
              message: 'resource not found',
              result: []
          })
      }
}
exports.register = async (req, res, next) => {
    try {
        pass = req.body.password
        email = req.body.email
        e = validateEmail(email)
        if (e != true){
            throw ('that email is wrongly formated')
        }
        const user = await userexist(email)
        if (user){
            throw ('that email email eixst in the system')
         }
        const hash = await encrypt(pass)
        if (hash == ""){
            throw ("something went wrong")
        }
        await User.create({
            _id: new mongoose.Types.ObjectId(),
            email: email,
            password: hash
        })
        res.send({
            status: true,
            message: 'user created successifuly',
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
exports.login = async(req,res, next) =>{
    try {
        const email = req.body.email
        const password = req.body.password
        const user = await userexist(email)
        if (!user){
            throw ('that email and password combo is wrong')
         }
        console.log(user.password)
        const result = await compare(password, user.password)
        if (result != true){
            throw ('that email and password combo is wrong')
        }
        const token = jwt.sign({
            email:email,
            role:user.role,
            level:user.level,
            userid:user._id    
            }, process.env.JWT_KEY,
            {
                expiresIn: "1h"
            })
        res.send({
            status: true,
            message: 'welcome '+ user.email,
            token:token
        })
    }catch(err){
        res.send({
            status: false,
            message: 'something went wrong logging in',
            error: err
        })
    }
}
exports.updateUsers =  async (req,res, next) => {
    try {
        const id = req.params.id
    const updateduser = {}
    for (let [k,v] of Object.entries(req.body)){
        updateduser[k] = v
        }
    await User.updateOne({_id:id}, {$set:updateduser}).exec()
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
exports.delete = async (req,res, next) => {
    try {
        const id = req.params.id
        const user = await User.remove({_id:id}).exec()
        res.status(200).json({
            status: true,
            message: 'resource remove successfully',
        })
    } catch {
        res.send({
            status: false,
            message: 'resource not found',
        })
    }
}
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
async function userexist(email){
    try {
        const user = await User.findOne({email:email}).exec()
        return user
    } catch(err) {
       return err
    }
}
async function encrypt (password) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);

        // Hash password
        return await bcrypt.hash(password, salt);
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
}
async function compare (pass1, pass2) {
    try {
        console.log(pass1, pass2)
        // Generate a salt
        return await bcrypt.compare(pass1, pass2);
    } catch (error) {
        console.log(error);
    }

    // Return null if error
    return null;
}