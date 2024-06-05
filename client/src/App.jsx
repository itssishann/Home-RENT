import React from 'react'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './pages/AdminDash';
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/admin/login' element={<AdminLogin/>}/>
      <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
      
      <Route path='*' element={<NotFound/>}/>
      
    </Routes>
    </BrowserRouter>
  
  )
}

export default App
