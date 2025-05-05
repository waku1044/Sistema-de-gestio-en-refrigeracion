import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './assets/paginas/Login';
import Principal from './assets/paginas/Principal';
import Reparacion from './assets/paginas/Reparacion';
import Instalacion from './assets/paginas/Instalacion';
import './App.css'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/reparacion" element={<Reparacion />} />
        <Route path="/instalacion" element={<Instalacion />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
