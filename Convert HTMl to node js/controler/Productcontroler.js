const ejs=require("ejs")
const ProductModel = require("../model/Product.model")
const contact = require("../model/Contact.model")
const Home=async(req,res)=>{
res.render("Home.ejs")
}

const About=(req,res)=>{
    res.render('about')
}



const Products=async(req,res)=>{
    const Products=await ProductModel.find();
    res.render('Product',{Products})
}

const Contact=(req,res)=>{
    res.render('Contact')
}
const contactData=async(req,res)=>{
    const User=await contact.create(req.body);
    res.render("Home")
}


module.exports={Home,About,Products,Contact,contactData}