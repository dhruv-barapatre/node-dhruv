import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavigationBar from './component/Navbar.jsx'
import Routes from './component/Allroutes.jsx'
import { Router } from 'react-router'
import Allroutes from './component/Allroutes.jsx'

function App() {
  return (
    <>
      <NavigationBar/>
      <Allroutes/>
    </>
  )
}

export default App
