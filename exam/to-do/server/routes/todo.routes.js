const express = require("express")
const { create, tododelete, update, getall,getsingle } = require("../controller/todo.controller")

const todoroutes = express.Router()

todoroutes.post("/create", create)
todoroutes.delete("/delete/:id",tododelete)
todoroutes.put("/update/:id",update)
todoroutes.get("/get",getall)
todoroutes.get("/get/:id",getsingle)


module.exports = todoroutes