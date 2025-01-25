const express = require("express")
const todoroutes = require("./routes/todo.routes")
const connection = require("./utlis/db")
const cors = require("cors")
const app = express()

app.use(express.json())
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your frontend's URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Allow cookies or authorization headers
    })
);
app.use("/todo", todoroutes)

app.listen(8080, async () => {
    try {
        await connection
    } catch (error) {
        console.log(error.message)
    }
    console.log("server is runninng....")
})