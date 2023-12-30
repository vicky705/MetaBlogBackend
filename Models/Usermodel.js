const mongoos = require('mongoose')
const { Schema } = mongoos

const Userschema = new Schema({
   name : {
    type : String
   },
   email : {
    type : String
   },
   username : {
    type : String
   },
   gender : {
    type : String
   },
   profile : {
    type : String
   },
   address : {
    addressline : {
        type : String
    },
    city : {
        type : String
    },
    state : {
        type : String
    },
    country : {
        type : String
    },
    pincode : {
        type : String
    }
   },
   password : {
    type : String
   },
   dataofjoining : {
    type : String
   },
   status : {
    type : Number
   }
})

module.exports = mongoos.model("Blogers", Userschema)