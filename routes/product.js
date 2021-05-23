const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const Review = require('../models/review')
const {isLoggedIn} = require('../middleware')
const {authRole} = require('../retailAuth')
const {confirmRetail} = require('../confirmAuth')
router.get('/products',async (req,res)=>{

    try{
        const products = await Product.find({})
        res.render('products/index',{products})
    }
    catch(e){
        console.log("Something Went Wrong")
        req.flash('error','Cannot find Products')
        res.redirect('/error')
    }
})

// Get the form for new Product
router.get('/products/new',isLoggedIn,authRole,(req,res)=>{
    res.render('products/new')
})

// Create New Product

router.post('/products',isLoggedIn,authRole, async(req,res)=>{
    try{
        const {product} = req.body
        await Product.create(product)
        req.flash('success','Product Created Successfully')
        res.redirect('/products')
    }
    catch(e){
        console.log(e.message)
        req.flash('error',"Couldn't Create a new Product!")
        res.redirect('error')
    }
})

router.get('/products/:id',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id).populate('reviews')
        res.render('products/show',{product})
    }
    catch(e){
        console.log(e.message)
        req.flash('error',"Couldn't find that product :(")
        res.redirect('/error')
    }
})

router.get('/products/:id/edit',isLoggedIn,authRole,confirmRetail,async(req,res)=>{
    const product = await Product.findById(req.params.id)
    res.render('products/edit',{product})
})

router.patch('/products/:id',isLoggedIn,authRole,confirmRetail,async(req,res)=>{
    try{
        const {product} = req.body
        await Product.findByIdAndUpdate(req.params.id,product)
        req.flash('success','Product Updated!')
        res.redirect(`/products/${req.params.id}`)
    }
    catch(e){
        console.log(e.message)
        req.flash('error',"Product Updation failed!")
        res.redirect('error')
    }
})

router.delete('/products/:id',isLoggedIn,authRole,confirmRetail,async(req,res)=>{
    await Product.findByIdAndRemove(req.params.id)
    res.redirect('/products')
})

router.get('/error',(req,res)=>{
    res.status(404).render('error')
})


// Creating a new comment on a Product

router.post('/products/:id/review',isLoggedIn,async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id)
        const review = new Review({
            user:req.user.username,
            ...req.body
        })

        product.reviews.push(review)

        await review.save()
        await product.save()
        req.flash('success','Review added Successfully!')
        res.redirect(`/products/${req.params.id}`)
    }
    catch(e){
        console.log(e.message)
        req.flash('error','Cannot Add Review To This Product!!')
        res.redirect('/error')
    }
})

router.delete('/products/:id/review/:reviewId',isLoggedIn,async(req,res)=>{
    const {id,reviewId} = req.params
    await Product.findByIdAndUpdate(id,{$pull:{review:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    res.redirect(`/products/${id}`)
})


module.exports = router
