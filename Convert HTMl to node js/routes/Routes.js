const express=require("express");
const { Home, About, Products, Contact, contactData } = require("../controler/Productcontroler");
const app=express();
const ExpressRouter=express.Router();
ExpressRouter.get("/",Home)
ExpressRouter.get("/About",About);
ExpressRouter.get("/Product",Products);
ExpressRouter.get("/Contact",Contact);
ExpressRouter.post("/Contact",contactData);
module.exports=ExpressRouter

