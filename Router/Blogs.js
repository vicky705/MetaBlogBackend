const express = require('express')
const route = express()
const Authanticatetoken = require('../Middleware/Authanticatetoken')
const Blogsmodel = require('../Models/Blogsmodel')


// Upload a new Blogs
route.post('/uploadblog', Authanticatetoken, async(req, res)=>{
    const user = req.user
    const data = req.body
    data.blogerid = user
    data.dateandtime = Date.now()
    data.likes = 0
    data.views = 0
    let status = false
    try{
        const blog = await Blogsmodel.create(data)
        if(!blog) return res.status(400).json({status, msg : "Sorry! Blog not posted."})
        status = true
        res.status(200).json({status, blog})
    }
    catch(error){
        res.status(500).json({status, msg : "Internal server error."})
    }
})
 
// Delete a Blogs using blog id and need a authanticate user
route.delete('/blogdelete', Authanticatetoken, async(req, res) => {
    const user = req.user
    const blogid = req.body.blogid
    
    let status = false
    try{
        const blog = await Blogsmodel.findById(blogid)
        if(!blog) return res.status(400).json({status, msg : "Blog not found."})
        if(blog.blogerid.toString() !== user.toString()) return res.status(401).json({status, msg : {bid : blog.blogerid, id : user}})
        const del = await Blogsmodel.findByIdAndDelete(blogid)
        if(!del) res.status(400).json({status, msg : "Blog not deleted."})
        status = true
        res.status(200).json({status, msg : "Blog deleted successfully."})
    }
    catch(error){ 
        res.status(500).json({status, msg : "Internal server error."})
    }
})


// Update a blog using blog id and need to authanticate user
route.put('/updateblog', Authanticatetoken, async(req, res) => {
    const user = req.user
    const blogid = req.body._id
    let status = false
    try{
        const blog = await Blogsmodel.findById(blogid)
        if(!blog) return res.status(400).json({status, msg : "Blog not found."})
        const update = await Blogsmodel.findByIdAndUpdate(blogid, {$set : req.body}, {new : true})
        if(!update) res.status(400).json({status, msg : "Blog not updated."})
        status = true
        res.status(200).json({status, update})
    }
    catch(error){
        res.status(500).json({status, msg : "Internal server error."})
    }
})

route.post('/getallblogs', Authanticatetoken, async(req, res) => {
    const user = req.user
    let status = false
    try{
        const blogs = await Blogsmodel.find({blogerid : user})
        status = true
        if(!blogs) return res.status(404).json({status, msg : "Blogs not found."})
        return res.status(200).json(blogs) 
    }
    catch(error){
        res.status(500).json({status, msg : "Internal server error."})
    }
})




module.exports = route