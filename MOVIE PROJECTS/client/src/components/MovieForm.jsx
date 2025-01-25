import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router"
function MovieForm() {
  const {id}=useParams()
  const [formData, setFormData] = useState({
    Title: "",
    Genre: "",
    Director: "",
    ReleaseYear: "",
    Description: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
const navigate=useNavigate()
if(id){
  const Fetchdata=()=>{
    axios.get(`${import.meta.env.VITE_URL}movie/${id}`,{
      headers:{
        "Content-Type": "application/json",
        token:`Bearer ${localStorage.getItem('Token')}`
      }
    })
    .then((res)=>{
        setFormData(res.data.Movies)
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  useEffect(()=>{
    Fetchdata()
  },[])
}
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.Title || !formData.Genre || !formData.Director || !formData.ReleaseYear || !formData.Description) {
      setError("All fields are required.");
      return;
    }
    
    if(!id){
      axios.post(`${import.meta.env.VITE_URL}movie`,formData,{
        headers:{
          'Content-Type': 'application/json',
          token:`Bearer ${localStorage.getItem('Token')} `
      },
      }
      ).then((res)=>{
        navigate('/')
      })  
      .catch((er)=>{
          console.log(er);
      })
    }
    else{
      axios.put(`${import.meta.env.VITE_URL}movie/${id}`,formData,{
        headers:{
          'Content-Type': 'application/json',
          token:`Bearer ${localStorage.getItem('Token')} `
      },
      }
      ).then((res)=>{
        navigate('/')
      })  
      .catch((er)=>{
          console.log(er);
      })
    }

    setFormData({
      title: "",
      genre: "",
      director: "",
      releaseYear: "",
      description: "",
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Movie Form</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-input-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="Title"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter movie Title"
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="genre" className="form-label">Genre:</label>
          <input
            type="text"
            id="Genre"
            name="Genre"
            value={formData.Genre}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter Genre"
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="director" className="form-label">Director:</label>
          <input
            type="text"
            id="Director"
            name="Director"
            value={formData.Director}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter director's name"
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="releaseYear" className="form-label">Release Year:</label>
          <input
            type="number"
            id="ReleaseYear"
            name="ReleaseYear"
            value={formData.ReleaseYear}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter ReleaseYear"
          />
        </div>

        <div className="form-input-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="Description"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="form-input"
            placeholder="Enter movie Description"
          ></textarea>
        </div>

        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="form-button">Submit</button>
      </form>
    </div>
  );
}

export default MovieForm;
