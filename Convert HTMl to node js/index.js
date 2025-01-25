const express = require("express");
const ExpressRouter = require("./routes/Routes");
const connect = require("./db");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const dotenv = require("dotenv").config()
app.set("view engine", "ejs");
app.use("/", ExpressRouter);



app.listen(process.env.PORT, async () => {
    try {
        await connect
        console.log("Connected With Database")
    } catch (error) {
        console.log(error?.message)
    }
})