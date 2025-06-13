import NavBar from "../componentes/NavBar";
import { Link } from 'react-router-dom';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import FormEquipo from '../componentes/FormEquipo';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../css/login.css'


const agregarEquipo = () => {
  Loading.remove();

  const [cliente, setCliente ]= useState('');
  const { id } = useParams();
  
  const clientePorId = (id)=>{
    fetch(`https://backend-refri.vercel.app/api/cliente/${id}`)
    .then(res=>res.json())
    .then(data=>setCliente(data))
    .catch(err=>console.error(err))
  };

  useEffect(()=>{
    clientePorId(id)
  },[id])
  return (
    <>
      <NavBar activo={true} tipo="buscador" />

      <div className="pantalla bg-cyan-100 flex flex-col items-center justify-start pt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-3 text-center capitalize">
          Nuevo Equipo de <br/> {cliente.cliente}
        </h1>

        <div className="bg-cyan-700 p-8 rounded-2xl shadow-md w-full max-w-2xl flex flex-col sm:flex-row gap-6 justify-center mt-3 text-white">
          
            <FormEquipo />
          
        </div>
      </div>
    </>
  );
};

export default agregarEquipo;
