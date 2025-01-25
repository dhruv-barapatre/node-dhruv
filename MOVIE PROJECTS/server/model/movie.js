const mongoose=require("mongoose");
const movieshema=new mongoose.Schema({
    Title:String,
    Genre:String,
    Director:String,
    ReleaseYear: Number,
    Description: String
})

const moviemodel=mongoose.model("MoviesData",movieshema)

module.exports=moviemodel