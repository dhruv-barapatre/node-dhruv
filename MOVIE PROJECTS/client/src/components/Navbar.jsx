import React from 'react'
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
const Navbar = () => {
  return (
      <div>
         <nav className="navbar">
        <ul className="nav-links">
          <li>
            <NavLink to="/" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/create-movies" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Create Movies
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? "active-link" : "")}>
              Signup
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
  )
}

export default Navbar
