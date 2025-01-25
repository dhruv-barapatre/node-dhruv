const express=require("express");
const ExpressRouter = require("./routes/Routes");
const connect = require("./db");
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const dotenv=require("dotenv").config()
app.set("view engine","ejs");
app.use("/",ExpressRouter);



app.listen(process.env.PORT,()=>{
    try {
        connect
             console.log("http://localhost:8080")
    } catch (error) {
        console.log(error?.message)
    }
})