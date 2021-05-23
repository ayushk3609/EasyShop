const mongoose = require('mongoose')
const Review = require('./review')
const productSchema = new mongoose.Schema({
   image:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        min:0
    },
    desc:{
        type:String
    },
    retailName:{
        type:String,
        required:true
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
})

const Product = mongoose.model('Product',productSchema)
module.exports = Product