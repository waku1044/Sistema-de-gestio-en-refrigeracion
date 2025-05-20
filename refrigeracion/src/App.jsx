import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './assets/paginas/Login';
import Principal from './assets/paginas/Principal';
import Reparacion from './assets/paginas/Reparacion';
import Instalacion from './assets/paginas/Instalacion';
import Info from './assets/paginas/Info';
import Buscador from './assets/paginas/Buscador';
import Editar from './assets/paginas/Editar'
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
        <Route path="/info/:id" element={<Info />} />
        <Route path="/buscador" element={<Buscador />} />
        <Route path="/buscador/:telefono" element={<Buscador />} />
        <Route path="/editar/:id" element={<Editar />} />
        

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
