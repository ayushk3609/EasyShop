const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/user')
const favicon = require('serve-favicon')
const cloudinary = require('../config/cloudinaryConfig')
const upload = require('../config/multerConfig')
const path = require('path')




router.get('/register',async(req,res)=>{
    res.render('auth/signup')
})

router.post('/register',upload.single('profileImage'),async(req,res)=>{
    try{

        let imageurl;
        if (! req.file || ! req.file.path) {
            imageurl = 'https://bellfund.ca/wp-content/uploads/2018/03/demo-user.jpg'
        }else{
        const result = await cloudinary.uploader.upload(req.file.path)
        imageurl = result.secure_url
        }

        const user = new User({
            username:req.body.username,
            profileImage:imageurl,
            email:req.body.email,
            role:req.body.role,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            mobNo:req.body.mobNo,
            Address:req.body.Address
        })
        const newUser = await User.register(user,req.body.password)
        await user.save()
        req.flash('success','Registered Successfully! Please Login to Continue')
        res.redirect('/login')
    }
    catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
})

router.get('/login',(req,res)=>{
    res.render('auth/login')
})

router.post('/login',
passport.authenticate('local',
{
    failureRedirect:'/login',
    failureFlash:true

}),
(req,res)=>{
    req.flash('success',`Hi ${req.user.username}! Welcome Back`)
    res.redirect('/products')
})

router.get('/logout',(req,res)=>{
    if(!req.user){
        req.flash('error','Please Log In first!!!')
        res.redirect('/login')
    }else{
        req.logout()
        req.flash('success','Logged Out Successfully')
        res.redirect('/login')
    }
})



module.exports = router