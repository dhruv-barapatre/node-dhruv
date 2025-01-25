import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from "react-router"
const Movieddetails = () => {
    const [movie ,setmovie]=useState({})
    const {id}=useParams()
    const FetchData=()=>{
        axios.get(`${import.meta.env.VITE_URL}movie/${id}`,{
            headers:{
                "Content-Type":"application/json",
                token:`Bearer ${localStorage.getItem('Token')}`
            }
        }).then((res)=>{
            setmovie(res.data.Movies)
            console.log(res.data.Movies)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        FetchData()
    },[])
  return (
    <div>
       <div className="movie-container">
      <h1 className="movie-title">{movie.Title}</h1>
      <p className="movie-description">
        <strong>Description:</strong> {movie.Description}
      </p>
      <p className="movie-director">
        <strong>Director:</strong> {movie.Director}
      </p>
      <p className="movie-genre">
        <strong>Genre:</strong> {movie.Genre}
      </p>
      <p className="movie-release-year">
        <strong>Release Year:</strong> {movie.ReleaseYear}
      </p>
    </div>
    </div>
  )
}

export default Movieddetails
