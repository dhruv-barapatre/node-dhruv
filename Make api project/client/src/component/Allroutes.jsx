import React from 'react'
import { Route, Router, Routes } from 'react-router'
import About from './About'
import SignUp from './Signup'
import LoginPage from './Login'
import Home from './Home'
import User from './User'
import Private from './private'

const Allroutes = () => {
  return (
    <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/users" element={
              <Private>
              <User />
              </Private>
              } />
              <Route path="/Signup/:id" element={<SignUp />} />
            
    </Routes>
  )
}

export default Allroutes
