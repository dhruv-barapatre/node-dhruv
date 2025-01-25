import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Movies from './components/Movies'
import Navbar from './components/Navbar'
import Routes from './components/Routesdeclare'

function App() {

  return (
    <>
    <Navbar/>
      <Routes/>

    </>
  )
}

export default App
