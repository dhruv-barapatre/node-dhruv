const moviemodel = require("../model/movie");

const GetMovies = async (req, res) => {
    try {
        const User = await moviemodel.find();
        res.json(User);
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
const CreateMovies = async (req, res) => {
    const { Title, Genre, Director, ReleaseYear, Description } = req.body;
    if (!Title, !Genre, !Director, !ReleaseYear, !Description) {
        return res.status(400).json({ message: "Please fill in all fields" });
    }
    try {
        const movies = await moviemodel.create(req.body);
        res.status(200).json({ message: "Movies Added to Database" })
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
const GetMovieById = async (req, res) => {
    const id = req.params.id;
    const Movies = await moviemodel.findById(id);
    if (!Movies) {
        return res.status(404).json({ message: "Movie not found" });
    }
    try {
        res.status(200).json({ Movies })
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
}
const DeleteMovies = async (req, res) => {
    const {id} = req.params;
    const MoviesExist = await moviemodel.findById(id);
    if (!MoviesExist) {
        return res.status(404).json({ message: "Movie not found" });
    }
    try {
        const MovieDelete = await moviemodel.findByIdAndDelete(id);
        res.status(200).json({ message: "Movie Deleted" })
    } catch (error) {
        return res.status(500).json({ message: error?.message });

    }
}

const Updatebyid=async(req,res)=>{
    const {id}=req.params;
    const MoviesExist=await moviemodel.findById(id)
    if(!MoviesExist){
        return res.status(404).json({ message: "Movie not found" });
    }
    try{
       const Movies=await moviemodel.findByIdAndUpdate(id,req.body);
       res.status(200).json({ message: "Movie Updated" })
    }
    catch(err){
        return res.status(500).json({ message: err?.message });
    }
}

module.exports = { GetMovies, CreateMovies, GetMovieById, DeleteMovies,Updatebyid }