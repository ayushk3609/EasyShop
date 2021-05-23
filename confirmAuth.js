const Product = require("./models/product")

const confirmRetail = async(req,res,next)=>{
    const item = await Product.findById(req.params.id)
    if(item.retailName !== req.user.username){
        req.flash('error','You are not Authorized')
       return res.redirect('/products')
    }
    next()
}


module.exports = {
    confirmRetail
}