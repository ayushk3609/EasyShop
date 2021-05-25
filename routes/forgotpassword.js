const express = require('express')
const router = express.Router()
const User = require('../models/user')
const passport = require('passport')
const sgMail = require('@sendgrid/mail')
const util = require('util')
const crypto = require('crypto')


sgMail.setApiKey(process.env.SGMAIL_APIKEY)


router.get('/forgotpassword',(req,res)=>{
    res.render('forgot')
})


router.put('/forgotpassword',async(req,res)=>{
    const token = await crypto.randomBytes(20).toString('hex')
    const {email} = req.body
    const user = await User.findOne({email:email})
    //Check if email-id exists in database
    if(!user){
        console.log('User doesnt exists')
        req.flash('error','You are not registered')
        return res.redirect('/forgotpassword')
    }
    //if exists then put the token and expire time in database
    user.resetPasswordToken = token
    user.resetPasswordExpires = Date.now() + 3600000
    await user.save()
    const msg = {
        to: email,
        from: 'easyshop303@gmail.com',
        subject: 'Reset Password',
        text: `You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process:
        http://${req.headers.host}/reset/${token}
        If you did not request this, please ignore this email and
        your password will remain unchanged.`.replace(/    /g, ''),
        html: `You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on the following link, or paste this into your browser to complete the process:
        http://${req.headers.host}/reset/${token}
        If you did not request this, please ignore this email and
        your password will remain unchanged.`,
    }
    await sgMail.send(msg)
    req.flash('success',`'An Email has sent to ${email}`)
    console.log('An Email has sent to '+email)
    res.redirect('/forgotpassword')
})

router.get('/reset/:token',async(req,res)=>{
    const token = req.params.token
    const user = await User.findOne({
        resetPasswordToken:token,
        resetPasswordExpires:{$gt:Date.now()}
    })
    //if user doesn't exist or the token has been expired
    if(!user){
        console.log("Password Reset Token Has Expired")
        req.flash('error','Password Reset Token Has Expired')
        return res.redirect('/forgotpassword')
    }

    //if token is valid then show reset password page
    res.render('reset',{token})
})

router.put('/reset/:token',async(req,res)=>{

    const token = req.params.token
    const user = await User.findOne({
        resetPasswordToken:token,
        resetPasswordExpires:{$gt:Date.now()}
    })

    //if user doesn't exist or the token has been expired
    if(!user){
        console.log("Password Reset Token Has Expired")
        req.flash('error','Password Reset Token Has Expired')
        return res.redirect('/forgotpassword')
    }

    //If everything goes fine then check the password and confirm fields
    if(req.body.password === req.body.confirm){
        //update the new password
        await user.setPassword(req.body.password)
        //set token to null
        user.resetPasswordToken = null
        user.resetPasswordExpires = null
        //save the user and login
        await user.save()
        const login = util.promisify(req.login.bind(req))
        await login(user)
    }//if password doesn't match ask them to enter again
    else{
        console.log('Passwords does not match')
        req.flash('error','Passwords does not match')
        return res.redirect(`/reset/${token}`)
    }
    res.redirect('/products')
})


module.exports = router