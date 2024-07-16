const port = 4000
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require("path") 
const cors = require('cors') 

app.use(express.json())
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173/",
    })
  );

// Databse Connection With Mongodb
mongoose.connect("mongodb+srv://mohitdwivedi:mohit1234@cluster0.bthykv3.mongodb.net/e-commerce")

app.get('/', (req,res) => {
    res.send("Express App Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb) =>{
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage:storage})

// creating upload endPoint for image
app.use('/images', express.static('upload/images'))

app.post('/upload', upload.single('product'), (req,res) => {
    res.json({
        success: true,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

//  Schema for Creating Products
const Product = mongoose.model('Product',{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    new_price:{
        type: Number,
        required:true,
    },
    old_price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    avilable:{
        type: Boolean,
        default: true,
    }
})

// Schema creating for user model
const Users = mongoose.model('Users',{
    name:{
        type: String,
    }, 
    email:{
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
        default: {}
    },
    date:{
        type: Date,
        default: Date.now
    }
})

// creating end point for regestring the user
app.post('/signup', async (req,res) => {
    const {name, password, email} = req.body
    console.log(req.body)
    let check = await Users.findOne({email})
    if(check){
       return res.status(400).json({success: false, error: "existing user found with same email id or email address"})
    }  
    let cart = {}
    for(let i=0; i<300; i++){
        cart[i] = 0
    }
    let user = new Users({
        name: name,
        email: email,
        password: password,
        cartData: cart
    })
    user = await user.save()

    const data = {
        user: {
            id: user.id
        }
    }
    const token = jwt.sign(data, 'secret_ecom')
    res.json({success: true, token, user})
})

// creating end point for login the user
app.post('/login', async (req,res) => {
    const { password, email} = req.body
    console.log(req.body)
    let user = await Users.findOne({email})
    console.log(user)
    if(user){
        const passwordcompare = password === user.password
        if(passwordcompare){
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({success:true, token})
        }
        else{
            res.json({success:false, error: 'invalid password please provide valid password'})
        }
    }
    else{
        res.json({success:false, error: 'wrong email id'})
    }
})

// Creating api for adding product
app.post('/addproduct', async(req,res) =>{
    let products = await Product.find({})
    let id
    if(products.length>0){
        let last_product_array = products.slice(-1)
        let last_prduct = last_product_array[0]
        id = last_prduct.id+1
    }
    else{
        id = 1
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    await product.save()
    res.json({
        success: true,
        name: req.body.name
    })
}) 

// Creating Api for deleting product
app.post('/removeproduct', async (req,res) => {
    await Product.findOneAndDelete({id:req.body.id})
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating api for getting all product
app.get('/allproducts', async (req,res) => {
    let products = await Product.find({})
    res.json(products)
})

//craeting api for new collection data
app.get('/newcollections', async (req,res) => {
    let products = await Product.find({})
    let new_collection = products.slice(1).slice(-8)
    res.send(new_collection)
})

//craeting api for popular in women
app.get('/popularInWomen', async (req,res) => {
    let products = await Product.find({category: 'women'})
    let dataproduct = products.slice(0,4)
    res.send(dataproduct)
})

// creating middleware to fetch user
const fetchUser = async (req,res,next) =>{
    const token = req.header('auth-token')
    console.log(token)
    if(!token){
        res.status(400).send({error: 'Please auth valid token'})
    }
    else{
        try {
            const data = jwt.verify(token, 'secret_ecom')
            console.log(data)
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({error: 'Please auth a valid token'})
        }
    }
}

//craeting api for adding product from carts in data
app.post('/addtocart', fetchUser, async (req,res) => {
    const itemId = req.body.itemId
    let userData = await Users.findOne({_id: req.user.id})
    userData.cartData[itemId] += 1
    await Users.findByIdAndUpdate({_id: req.user.id}, {cartData: userData.cartData})
    res.json('Added')
})

//craeting api for remove product fromcarts in data
app.post('/removeproduct', fetchUser, async (req,res) => {
    let userData = await Users.findOne({_id: req.user.id})
    if(userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("remove")
})

// creating end point get cart data
app.post('/getcart',fetchUser, async(req,res) =>{
    console.log('get cart')
    let userData = await Users.findById({_id: req.user.id})
    res.json(userData.cartData)
})

// API Creation
app.listen(port, (error) => {
    if(!error){
        console.log("Server running on Port " + port)
    }
    else{
        console.log("Error :" + error)
    }
})