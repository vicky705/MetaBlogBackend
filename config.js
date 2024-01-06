const mongoose = require('mongoose')
const dburl = "mongodb URI"

const connectToMongose = () => {
    mongoose.connect(dburl).then(()=> {
        console.log("Connected...")
    }).catch((error)=>{
        console.log(error.toString())
    })
}
module.exports = connectToMongose