import React from 'react'
import Movies from './Movies'
import { Route,Routes } from 'react-router'
import Login from './Login'
import Signup from './Signup'
import Movieddetails from './Movieddetails'
import MovieForm from './MovieForm'
import PrivatePage from './PrivatePage'
const Routesdeclare = () => {
  return (
    <Routes>
        <Route  path="/" element={<Movies/>} />
        <Route  path="/create-movies" element={
          <PrivatePage>
        <MovieForm/>
        </PrivatePage>} />
        <Route  path="/create-movies/:id" element={
          <PrivatePage>
        <MovieForm/>
        </PrivatePage>} />
        <Route  path="/Login" element={
          <Login/>
          } />
        <Route  path="/signup" element={
          <Signup/>
          } />
        <Route  path="/MoviesDetails/:id" element={
          <Movieddetails/>
          } />
    </Routes>
  )
}

export default Routesdeclare
