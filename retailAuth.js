const User = require('./models/user')



const authRole = (req,res,next)=>{
    if(req.user.role !== 'Retailer'){
        req.flash('error','You are not Authorized')
       return res.redirect('/login')
    }
     next()

}

module.exports = {
    authRole
}