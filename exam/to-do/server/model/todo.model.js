const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    }
}, {
    versionKey: false,
    timestamps: true
})

const todoModel = mongoose.model("todomodel", todoSchema)

module.exports = todoModel