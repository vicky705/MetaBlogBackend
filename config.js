const mongoose = require('mongoose')
const dburl = "mongodb+srv://vickykumar776655:dWTInCnc9EnnR3ZT@cluster0.hv1bgmh.mongodb.net/MetaBlogs?retryWrites=true&w=majority"

const connectToMongose = () => {
    mongoose.connect(dburl).then(()=> {
        console.log("Connected...")
    }).catch((error)=>{
        console.log(error.toString())
    })
}
module.exports = connectToMongose