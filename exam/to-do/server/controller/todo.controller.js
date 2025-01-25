const todoModel = require("../model/todo.model")

const create = async (req, res) => {
    const { title } = req.body
    if (!req.body) {
        return res.status(400).json({ message: "Please fill all fields" })
    }
    try {
        await todoModel.create({ title })
        res.status(201).json({ message: "Todo created successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const tododelete = async (req, res) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ message: "Id must be nedded to delete todo...." })
    }
    try {
        const data = await todoModel.findById({ _id: id })
        if (!data) {
            res.status(400).json({ message: "Todo not found..." })
        }
        await todoModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ message: "Todo Deleted Succesfully........." })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const update = async (req, res) => {
    const { id } = req.params
    const { title } = req.body
    if (!title) {
        res.status(400).json({ message: "Title must be nedded to update todo...." })
    }
    if (!id) {
        res.status(400).json({ message: "Id must be nedded to update todo...." })
    }
    try {
        const data = await todoModel.findById({ _id: id })
        if (!data) {
            res.status(400).json({ message: "Todo not found..." })
        }
        await todoModel.findByIdAndUpdate({ _id: id }, { title })
        res.status(200).json({ message: "Todo Updated Succesfully........." })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getall = async (req, res) => {
    try {
        const data = await todoModel.find()
        if (!data) {
            res.status(400).json({ message: "No Todo Found...." })
        }
        res.status(200).json({ message: "to Do Get Succesfully", data })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

const getsingle = async (req, res) => {
    const { id } = req.params
    if (!id) {
        res.status(400).json({ message: "Id must be nedded to get single todo...." })
    }
    try {
        const data = await todoModel.findById({ _id: id })
        if (!data) {
            res.status(400).json({ message: "Todo not found..." })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}



module.exports = { create, tododelete, update, getall, getsingle }