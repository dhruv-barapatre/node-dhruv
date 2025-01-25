import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import {Link} from "react-router"

const Movies = () => {
    const [state,setstate]=useState([])

    const Fetchdata=()=>{
        axios.get(`${import.meta.env.VITE_URL}movie`,)
        .then((res)=>{
            setstate(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        Fetchdata()
    },[])
    const ondelete=(id)=>{
        axios.delete(`${import.meta.env.VITE_URL}movie/${id}`,{
            headers:{
                "Content-Type":"application/json",
                token:`Bearer ${localStorage.getItem('Token')}`
            }
        }).then((res)=>{
            Fetchdata()
        }).catch((err)=>{
            console.log(err)
        })
    }
    const Token=localStorage.getItem('Token')
  return (
    <div>
<div className="movie-card">
      {
        state.map((el)=>{
            return(
                <div className="card-content" key={el._id}>
                <Link style={{ textDecoration: "none" }} to={`/MoviesDetails/${el._id}`}>
                  <h3 className="card-title">{el.Title}</h3>
                  <p className="card-genre"><strong>Genre:</strong> {el.Genre}</p>
                  <p className="card-director"><strong>Director:</strong> {el.Director}</p>
                  <p className="card-release-year"><strong>Release Year:</strong> {el.ReleaseYear}</p>
                </Link>
                {
                    Token? <div>
                    <Link to={`/create-movies/${el._id}`} className="card-button update-btn">
                    Update
                  </Link>
                  <button 
                    className="card-button delete-btn"
                    onClick={() => ondelete(el._id)}>
                    Delete
                  </button>
                  </div>
                  :""
                }
              </div>
            )
        })
      }
    </div>
    </div>
  )
}

export default Movies
