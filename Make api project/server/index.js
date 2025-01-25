const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors")
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
const { expressRouter } = require("./routes/Userroutes");
const connection = require("./db");
app.use(express.json());
app.use("/", expressRouter)
app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Server are running at 8080")
    } catch (error) {
        console.log(error)
    }
})