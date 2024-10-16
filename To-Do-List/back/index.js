const express = require("express")
const app = express()

// server
app.use((req, res, next) => {
    next()
})

app.get("/", (req, res) => {
    res.end("ok")
})

app.listen(8000, () => {
    console.log("Server Is Running At 8000")
})