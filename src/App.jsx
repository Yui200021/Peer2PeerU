import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Navbar from './pages/Navbar/Navbar'
import Home from './pages/Home/Home'
import Profile from './pages/Profile/Profile'
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path= "/" element= {<Login />}/>
          <Route path= "/register" element= {<Register />}/>
          <Route path= "/home" element= {<Home />}/>
          <Route path= "/profile" element= {<Profile />}/>
        </Routes>

      </Router>
    </>
  )
}

export default App
