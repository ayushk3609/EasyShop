const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const seedDB = require('./seed')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const dotenv = require('dotenv')
dotenv.config()
console.log(process.env.DB_URL)


const productRoutes = require('./routes/product')
const authRoutes = require('./routes/auth')
const cartRoutes = require('./routes/cart')
const paymentRoutes = require('./routes/payment')
const userRoutes = require('./routes/user')

const DB_URL = process.env.DB_URL

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false,
    useCreateIndex:true
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.log("Oh no! ERROR!!");
    console.log(error);
  });

  // seedDB()

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname,'/public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

const sessionConfig = {
  secret:'weneedsomebettersecret',
  resave:false,
  saveUninitialized:true
}
app.use(session(sessionConfig))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
  res.locals.success = req.flash('success')
  res.locals.error = req.flash('error')
  res.locals.currentUser = req.user
  next()
})


app.get("/", (req, res) => {
  res.render('home');
});

app.get("/about", (req, res) => {
  res.render('me/about');
});

app.use(productRoutes)
app.use(authRoutes)
app.use(cartRoutes)
app.use(paymentRoutes);
app.use(userRoutes)

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started at PORT:3000");
});
