const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const Product = require('./product')
const Order = require('./order')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    profileImage:String,
    role:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    mobNo:{
        type:Number,
        min:10,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    // below 2 properties are for Forgot Password
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    cart:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Order'
        }
    ],
})

userSchema.plugin(passportLocalMongoose)

const User = mongoose.model('User',userSchema)
module.exports = User
