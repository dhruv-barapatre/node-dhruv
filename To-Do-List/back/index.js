const express = require("express")
const fs=require("fs")
const app = express()

// server
app.use((req, res, next) => {
    next()
})

app.get("/getdata", (req, res) => {
    fs.readFile("./db.json","utf-8",(err,data)=>{
        if(err){
            console.log(err)
            res.send("something went wrong")
        }else{
            const newdata=JSON.parse(data)
            console.log(newdata)
            res.end(newdata)
        }
    })
})

app.listen(8000, () => {
    console.log("Server Is Running At 8000")
})