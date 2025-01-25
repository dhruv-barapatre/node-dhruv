const express =  require("express")
const fs = require("fs")
const app = express()
const cors = require("cors");
const generateUniqueId = require("generate-unique-id");

// server
app.use(cors());
app.use(express.json());

app.get("/getdata", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            const jsondata = JSON.parse(data)
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
            const id = generateUniqueId()
            req.body.id = id
            jsonData.push(req.body)
            const pushData = JSON.stringify(jsonData)
            fs.writeFile("./db.json", pushData, (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("User Added SuccesFully")
                }
            })
        }
    })

})

app.delete("/deleteUser/:id", (req, res) => {
    const { id } = req.params
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            const jsonData = JSON.parse(data)
            let deletdUser = jsonData.filter((el) => el.id != id)
            const pushData = JSON.stringify(deletdUser)
            fs.writeFile("./db.json", pushData, (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("User Deleted SuccesFully")
                }
            })
        }
    })
})

app.put("/editUser/:id", (req, res) => [
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            let jsonData = JSON.parse(data)
            const { id } = req.params
            const index = jsonData.findIndex((el) => el.id == id)
            if (index == -1) {
                res.send("User Not Found")
            } else {
                jsonData[index] = req.body
                jsonData[index].id = id
                const pushData = JSON.stringify(jsonData)
                fs.writeFile("./db.json", pushData, (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("User Data Edited SuccesFully")
                    }
                })
            }
        }
    })
])

app.listen(8000, () => {
    console.log("Server Is Running At 8000")
})