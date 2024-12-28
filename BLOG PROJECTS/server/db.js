const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://dhruvbarapatre:bd280126@dhruv2801.ramia.mongodb.net/?retryWrites=true&w=majority&appName=dhruv2801")
module.exports = connection


