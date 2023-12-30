const express = require('express')
const Blogsmodel = require('../Models/Blogsmodel')
const mongoose = require('mongoose')
const route = express()

//Fetch all blogs no need to authantication user.
route.get('/getallblogs', async(req, res) => {
    let status = false
    try{
        const blogs = await Blogsmodel.aggregate([
            {$match : {status : 1}},
            {
                $lookup : {
                    from : "blogers",
                    localField : "blogerid",
                    foreignField : "_id",
                    as : "blogerid"
                }
            }
        ])
        if(!blogs) return res.status(404).json({status, msg : "Blog not found."})
        res.status(200).json({status, blogs})
    }
    catch(error){
        res.status(500).json({status, msg : "Internal server error."})
    }
})

//Fetch a single blog no need to authantication.
route.post('/getblogsbyid', async(req, res) => {
    const blogid = new mongoose.Types.ObjectId(req.body.blogid)
    let status = false
    try{
        // const blogs = await Blogsmodel.findById(blogid)
        const blogs = await Blogsmodel.aggregate([
            {
                $match : {
                    _id : blogid,
                    status : {$in : [1,2]}
                }
            },
            {
                $lookup : {
                    from : "blogers",
                    localField : "blogerid",
                    foreignField : "_id",
                    as : "blogerid"
                }
            }
        ])
        if(!blogs) return res.status(404).json({status, msg : "Blog not found."})
        status = true
        return res.status(200).json({status, blogs})
    }
    catch(error){
        res.status(500).json({status, msg : "Internal server error."})
    }
})


//Filter blog by category, no need to authantication.
route.post('/filterbycategory', async(req, res) => {
    const cate = req.body.category;
    let status = false
    try{
        const blogs = await Blogsmodel.find({category : cate})
        if(!blogs) return res.status(404).json({status, msg : "Blog not found."})
        status = true
        return res.status(200).json({status, blogs})
    }
    catch(error){
        res.status(500).json({status, msg : "Internal server error."})
    }
})

// Views 
route.post('/views', async(req, res) => {
    const id = req.body.blogid
    let status = false
    try{
        const blog = await Blogsmodel.findById(id)
        if(!blog) return res.status(404).json({status, msg : 'Invalid request.'})
        const view = blog.views + 1
        const result = await Blogsmodel.updateOne(
            {_id : id},{$set : {views : view}}
        )
        status = true
        return res.json({status, msg : "Done."})
    }
    catch(error){
        res.status(500).json({status, msg : "Internal server error."})
    }
})

module.exports = route