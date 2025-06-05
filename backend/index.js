const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
const nodemailer = require("nodemailer");


app.use(express.json());
app.use(cors());

// Database Connection with MongoDb
mongoose.connect("mongodb+srv://aaditya123:aadityanepal@cluster0.mqstl.mongodb.net/e-commerce");

// API creation
app.get("/",(req,res)=>{
    res.send("Express App is Running")  
})


// Creating Image Storing Engine


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});


const upload = multer({storage :storage})

// Creating upload Endpoint for images
app.use('/images',express.static('upload/images'))
app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products

const ProductModel = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
})

app.post('/addproduct', async (req, res) => {
    let products = await ProductModel.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    // Use 'ProductModel' here
    const newProduct = new ProductModel({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(newProduct);
    await newProduct.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Creating API for deleting products

app.post('/removeproduct',async (req,res)=>{
    await ProductModel.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating API for getting ALL Products
app.get('/all_products',async (req,res)=>{
    let products = await ProductModel.find({});
    console.log("All Products Fetched");
    res.send(products);
})

// Schema Creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating endpoint for registering the user
app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,error:"existing user found"})
    }
    
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
        
    }

    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,'secret_ecom');
    res.json({success:true,token})
})

// creating endpoint for user login
app.post('/login',async (req,res)=> {
    let user = await Users.findOne({email:req.body.email});
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom');
            res.json({success:true,token})
        }
        else{
            res.json({success:false,errors:"Wrong Password"});
        }
    }
    else{
        res.json({success:false,errors:"Wrong Email ID"})
    }
})

//Creating endpoint for newcollection

app.get('/newcollection',async (req,res)=>{
    let products = await ProductModel.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection fetched")
    res.send(newcollection);
})

// Creating endpoint for popular in women section
app.get('/popularinwomen',async (req,res)=>{
    let products = await ProductModel.find({category:"women"});
    let popular_in_women = products.slice(0,4);
    console.log("Popular in women fetched");
    res.send(popular_in_women);
})

//Creating middlewaare to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({errors:"Please authenticate using valid token"})
    }
    else{
        try {
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user
            next();
        } catch (error) {
            res.status(401).send({errors:"please authenticate using a valid token"})
        }
    }
}


// creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser,async (req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added")
})

// creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async (req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed")
}) 

// creating endpoint to retrieve data
app.post('/getcart',fetchUser,async (req,res)=>{
    console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})





// Email Configuration
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "aadityanepal551@gmail.com",
        pass: "vstc rujx bgco smpk",
    },
});

// Send Email API
app.post("/send-email", async (req, res) => {
    const { name, phone, email, zipcode, address, paymentMethod } = req.body;

    // Check for required fields
    if (!name || !email || !address || !phone || !zipcode || !paymentMethod) {
        return res.status(400).json({ error: "All fields are required!" });
    }
                   
    // Adding information for the email to be send
    const mailOptions = {
        from: "your-email@gmail.com", 
        to: email, 
        subject: "Order Request Recieved - Thank You for Shopping with Us!",
        text: `Hello ${name},\n\nThank you for your order!\n\nHere are the details of your order:\n\n` +
            `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nZip Code: ${zipcode}\nAddress: ${address}\nPayment Method: ${paymentMethod}\n\n` +
            `We will process your order and send it to you soon. You will receive a confirmation email once your order has been shipped.\n\n` +
            `Thank you for shopping with us!\n\nBest regards,\nHexOP`,
    };

    try {
        await transporter.sendMail(mailOptions); 
        res.json({ success: true, message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});






//MVC



app.listen(port,(error)=>{
    if (!error) {
        console.log("Server Running on Port "+port)
    }
    else{
        console.log("Error : "+error)
    }
})
