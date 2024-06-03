import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar';
// import Loader from './components/Loader';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/test' element={<Navbar/>}/>
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
