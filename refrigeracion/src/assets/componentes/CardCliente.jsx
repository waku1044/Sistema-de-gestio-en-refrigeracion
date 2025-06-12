import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Report } from 'notiflix/build/notiflix-report-aio';

const CardCliente = ({props}) => {
  
  const cliente = props;
  return (
    <div className="flex-col p-4 rounded-lg border border-gray-200 bg-gray-300 shadow-sm ">
       <p className='capitalize'>
        <strong >Cliente:</strong> {cliente.cliente}
      </p>
      <p className='capitalize'>
        <strong>Domicilio:</strong> {cliente.domicilio}
      </p>
      <p className='capitalize'>
        <strong>Telefono:</strong> {cliente.telefono}
      </p>
       
      <div className="flex gap-3 flex-wrap mt-3">
        <Link
          className="bg-cyan-500 py-2 px-5 text-amber-50 rounded-2xl"
          to={`/editarcliente/${cliente._id}`}
        >
          Editar
        </Link>{" "}
        <button className="bg-red-500 py-2 px-5 text-amber-50 rounded-2xl" onClick={()=>alert('Eliminaer Cliente')}>Eliminar</button>
        <Link className="bg-emerald-800 py-2 px-5 text-amber-50 rounded-2xl" to={`/agregarequipo/${cliente._id}`}>Agregar Equipo</Link>
      </div>
    </div>
  );
};

export default CardCliente;
