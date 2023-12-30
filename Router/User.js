const express = require('express')
const route = express()
const jwt = require('jsonwebtoken')
const Usermodel = require('../Models/Usermodel')
const bcrypt = require('bcryptjs')
const JWT_SECRITE = "thisisvicky"
const Authanticatetoken = require('../Middleware/Authanticatetoken')

route.post('/createuser', async(req, res) => {
    let status = false
    try{
        const data = req.body
        const isUser = await Usermodel.findOne({email : data.email})
        if(isUser){
            return res.status(200).json({status, msg : "Email is already exist."})
        }
        const isUsername = await Usermodel.findOne({username : data.username})
        if(isUsername){
            return res.status(200).json({status, msg : "Username already used."})
        }
        const salt = await bcrypt.genSalt(10)
        const newPass = await bcrypt.hash(data.password, salt)
        data.password = newPass
        const user = await Usermodel.create(data)
        const userId = {
            blogerid : user._id
        }
        const authToken =await jwt.sign(userId, JWT_SECRITE)
        status = true
        res.status(200).json({status, user, authToken})
    }
    catch(error){
        return res.status(500).json({status, msg : "Internal server error."})
    }
})

route.post('/loginuser', async(req, res) => {
    let status = false;
    try{
        const data = req.body
        const isUser = await Usermodel.findOne({email : data.email})
        if(!isUser) return res.status(400).json({status, msg : "Invalid Credential"})
        const isPassword = await bcrypt.compare(data.password, isUser.password)
        if(!isPassword) return res.status(400).json({status, msg : "Invalid Credential"})
        const userId = {
            blogerid : isUser._id
        }
        const authToken = await jwt.sign(userId, JWT_SECRITE)
        status = true
        res.status(200).json({status, isUser, authToken})
    }
    catch(error){
        return res.status(500).json({status, msg : "Internal server error."})
    }
})

route.post('/getuser', Authanticatetoken, async(req, res) => {
    const user = req.user
    let status = false
    try{
        const users = await Usermodel.findById(user)
        if(!users) return res.status(404).json({status, msg : "Invalid User."})
        status = true
        res.status(200).json({status, users})
    }
    catch(error){
        return res.status(500).json({status, msg : "Internal server error."})
    }
})

route.put('/updateprofile', Authanticatetoken, async(req, res) => {
    const users = req.user
    const newDetails = req.body
    let status = false
    try{
        const user = await Usermodel.findByIdAndUpdate(users, {$set : newDetails}, {new:true})
        if(!user) return res.status(420).json({status, msg : "Profile update failed."})  
        status = true
        res.status(200).json({status, user})      
    }
    catch(error){
        return res.status(500).json({status, msg : "Internal server error."})
    }
})



module.exports = route