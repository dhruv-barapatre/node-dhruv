const express = require("express")
const fs = require("fs")
const app = express()

app.use(express.json())

app.post("/add/hero", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            const newData = JSON.parse(data)
            const { heroes } = newData
            const ids = heroes.map((el) => el.id)
            const lastId = ids[ids.length - 1] + 1
            req.body.id = lastId
            newData.heroes.push(req.body)
            fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("Data Added")
                }
            })
        }
        res.send("ok")
    })
})

app.get("/heroes", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            data = JSON.parse(data)
            res.send(data)
        }
    })
})

app.patch("/update/villain/:hero_id", (req, res) => {
    const id = req.params.hero_id
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            const newData = JSON.parse(data)
            const needData = newData.heroes.find((el) => el.id == id)
            needData.villains.push(req.body)
            for (let i = 0; i < newData.heroes.length; i++) {
                if (newData.heroes[i].id == id) {
                    newData.heroes[i] = needData
                }
            }
            fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("Data Updated SuccessFuly")
                }
            })
        }
    })
})

app.delete("/delete/hero/:hero_id", (req, res) => {
    const id = req.params.hero_id
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err)
        } else {
            const newData = JSON.parse(data)
            newData.heroes = newData.heroes.filter((el) => el.id != id )
            fs.writeFile("./db.json", JSON.stringify(newData), (err) => {
                if (err) {
                    res.send(err)
                } else {
                    res.send("Data Updated SuccessFuly")
                }
            })
        }
    })
})

app.listen(8080, () => {
    console.log("server is runnig")
})