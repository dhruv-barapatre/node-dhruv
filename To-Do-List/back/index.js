const express = require("express")
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
            const { user } = JSON.parse(data)
            console.log(data)
            const jsondata = JSON.stringify(user)
            res.send(jsondata)
        }
    })
})

app.post("/addUser", (req, res) => {
    fs.readFile("./db.json", "utf-8", (er5r, data) => {
        if (err) {
            res.send(err)
        } else {
            const jsonData = JSON.parse(data)
            const id = generateUniqueId()
            req.body.id = id
            jsonData.user.push(req.body)
            const pushData = JSON.stringify(jsonData)
            fs.writeFile("./db.json", pushData, (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("Data Set SuccesFully")
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
            const { user } = JSON.parse(data)
            let deletdUser = user.filter((el) => el.id != id)
            const pushData = JSON.stringify(deletdUser)
            fs.writeFile("./db.json", pushData, (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("Data Set SuccesFully")
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
            let { user } = JSON.parse(data)
            const { id } = req.params
            const index = user.findIndex((el) => el.id == id)
            if (index == -1) {
                res.send("User Not Found")
            } else {
                user[index] = req.body
                user[index].id=id
                const pushData = JSON.stringify(user)
                fs.writeFile("./db.json", pushData, (err) => {
                    if (err) {
                        res.send(err)
                    } else {
                        res.send("Data Set SuccesFully")
                    }
                })
                res.send("ok")
            }
        }
    })
])

app.listen(8000, () => {
    console.log("Server Is Running At 8000")
})