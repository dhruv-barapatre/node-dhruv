const express = require("express")
const fs = require("fs")
const app = express()
const cors = require("cors")

// server
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("ok")
})
app.get("/getdata", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            const { user } = JSON.parse(data)
            console.log(user)
            const jsondata = JSON.stringify(user)
            res.send(jsondata)
        }
    })
})

app.post("/addUser", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            const jsonData = JSON.parse(data)
            jsonData.user.push(req.body)
            const pushData = JSON.stringify(jsonData)
            fs.writeFile("./db.json",pushData,(err)=> {
                if(err){
                    res.send(err)
                }else{
                    res.send("Data Set SuccesFully")
                }
            })
        }
    })

})

app.listen(8000, () => {
    console.log("Server Is Running At 8000")
})