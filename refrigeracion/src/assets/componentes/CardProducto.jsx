import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Report } from 'notiflix/build/notiflix-report-aio';

const CardProducto = ({ rep, onActualizarEstado }) => {
  
  const clientePorId = (id)=>{
    fetch(`http://localhost:5000/api/cliente/${id}`)
    .then((res)=> res.json())
    .then((data)=>{
      let template = `
      <strong>Domicilio:</strong> ${data.domicilio} <br/><br/>
      <strong>Teléfono:</strong> ${data.telefono}`
      Report.info(
        `Cliente: ${data.cliente}`,
        `${template}`
        ,
        'Visto',
        );
    })
    .catch(err=>console.log(err))
  }
  
  
  
  const combinacionDeBotones = () => {
    console.log(rep)
    switch (rep.estado) {
      case "Pendiente":
        return (
          <button
            className="bg-amber-500 py-2 px-5 text-amber-50 rounded-2xl"
            onClick={() => onActualizarEstado(rep._id, "En reparación")}
          >
            En reparación
          </button>
        );

      case "En reparación":
        return (
          <button
            className="bg-blue-600 py-2 px-5 text-amber-50 rounded-2xl"
            onClick={() => onActualizarEstado(rep._id, "Reparado")}
          >
            Reparado
          </button>
        );

      case "Reparado":
        return (
          <button
            className="bg-green-600 py-2 px-5 text-amber-50 rounded-2xl"
            onClick={() => onActualizarEstado(rep._id, "Entregado")}
          >
            Entregar a Cliente
          </button>
        );

      case "Entregado":
        return (
          <Link
            className="bg-emerald-500 py-2 px-5 font-bold text-amber-50 rounded-2xl"
            to={`/info/${rep._id}`}
          >
            Info
          </Link>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-gray-300 shadow-sm ">
      {/* <p className='capitalize'>
        <strong >Cliente:</strong> {cliente?.cliente}
      </p>
      <p className='capitalize'>
        <strong>Domicilio:</strong> {cliente?.domicilio}
      </p>
       */}
       {/* <p>
        <strong>Id:</strong> {rep.idCliente}
      </p> */}
      <p className="capitalize">
        <strong>Equipo:</strong> {rep.equipo}
      </p>
      <p className="capitalize">
        <strong>Tipo:</strong> {rep.tipo}
      </p>
      <p className="capitalize">
        <strong>Marca:</strong> {rep.marca}
      </p>
      <p className="capitalize">
        <strong>Falla:</strong> {rep.falla}
      </p>
      <p>
        <strong className="text-amber-700">Fecha de Ingreso:</strong>{" "}
        {rep.fecha}
      </p>

      <p className="overflow-auto capitalize">
        <strong>Descripcion:</strong> {rep.descripcion}
      </p>

      <p>
        <strong>Estado:</strong>{" "}
        <span
          className={`font-semibold ${
            rep.estado === "Pendiente"
              ? "text-red-400"
              : rep.estado === "En reparación"
              ? "text-blue-600"
              : rep.estado === "Reparado"
              ? "text-green-600"
              : "text-purple-600"
          }`}
        >
          {rep.estado}
        </span>
      </p>
      <p className="mb-2">
        <strong className="text-green-700">Fecha de Entrega:</strong>{" "}
        {rep.fechaEntrega}
      </p>
      <div className="flex gap-3 flex-wrap">
        {combinacionDeBotones()}
        <Link
          className="bg-cyan-500 py-2 px-5 text-amber-50 rounded-2xl"
          to={`/editar/${rep._id}`}
        >
          Editar
        </Link>{" "}
        <button className="bg-indigo-400 py-2 px-5 text-amber-50 rounded-2xl" onClick={()=>clientePorId(rep.idCliente)}>Info Cliente</button>
      </div>
    </div>
  );
};

export default CardProducto;
