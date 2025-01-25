const express=require("express");
const { GetMovies, CreateMovies, GetMovieById, DeleteMovies, Updatebyid } = require("../controler/movieController");
const Auth = require("../middleware/Authication");
const MovieRoute=express.Router()
MovieRoute.get("/",GetMovies);
MovieRoute.post("/", Auth,CreateMovies);
MovieRoute.get("/:id",GetMovieById);
MovieRoute.put("/:id",Auth,Updatebyid);
MovieRoute.delete("/:id",Auth,DeleteMovies);
module.exports=MovieRoute