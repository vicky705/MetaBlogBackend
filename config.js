const mongoose = require('mongoose')
const dburl = "mongodb+srv://vickykumar776655:metablogs@cluster0.hv1bgmh.mongodb.net/metablogs?retryWrites=true&w=majority"

const connectToMongose = () => {
    mongoose.connect(dburl).then(()=> {
        console.log("Connected...")
    }).catch((error)=>{
        console.log(error.toString())
    })
}
module.exports = connectToMongose
