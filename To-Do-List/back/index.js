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
        }else{
            const newdata=JSON.stringify(data)
            console.log(data)
            console.log(JSON.stringify(JSON.parse(data), null, 2));

        }
    })
    res.end("ok")
})

app.listen(8000, () => {
    console.log("Server Is Running At 8000")
})