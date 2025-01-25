const express=require("express");
const { register, Login } = require("../controler/authController");
const AuthRoute=express.Router();
AuthRoute.post("/register",register)
AuthRoute.post("/login",Login)
module.exports=AuthRoute