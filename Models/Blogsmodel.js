const mongoos = require('mongoose')
const { Schema } = mongoos

const BlogsSchema = new Schema({
    // blogerid : {
    //     type : String
    // },
    blogerid : {
        type : Schema.Types.ObjectId,
        ref : 'blogers'
    },
    title : {
        type : String
    },
    blogbody : {
        type : String
    },
    tags : {
        type : Array
    },
    category : {
        type : String
    },
    dateandtime : {
        type: Date
    },
    likes : {
        type : Number
    },
    views : {
        type : Number
    },
    status : {
        type : Number
    }
})
module.exports = mongoos.model("Blogs", BlogsSchema)