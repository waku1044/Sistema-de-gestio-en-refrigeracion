import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Notify } from "notiflix/build/notiflix-notify-aio";

const CardProductoInfo = ({ rep }) => {
  const { id } = useParams();
  const navigate = useNavigate();
    
    const handleEliminar = () => {
    // const confirmar = window.confirm("¿Estás seguro de eliminar este equipo?");
    // if (!confirmar) return;
    
    console.log(rep)
    // Determinar si es reparacion o instalacion
    const tipo = rep.tipo === "instalacion" ? "instalacion" : "reparacion";
  
    // Realizamos la solicitud DELETE
    fetch(`https://backend-refri.vercel.app/api/equipo/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res)
        if (!res.ok) {
          // Si la respuesta no es 2xx, lanzamos un error
          throw new Error("Error al eliminar. Por favor, revisa la conexión o el backend.");
        }
        // Si la respuesta es exitosa, podemos proceder
        return res.json();
      })
      .then((data) => {
        // Si la eliminación fue exitosa, mostramos un mensaje
        console.log(data)
        Notify.success("Equipo eliminado correctamente", data);
        // Redirigimos al listado
        navigate(`/${tipo}`); // O a la ruta donde están los equipos listados
      })
      .catch((err) => {
        // Si ocurrió un error, lo mostramos en consola
        Notify.failure(err);
        
      });
  };
  
  const LaBotonera = () => {
    return (
      <div className="flex gap-3">
        <Link
          className="bg-green-600 py-2 px-5 text-amber-50 rounded-2xl"
          to={`/editar/${id}`}
        >
          Editar{" "}
        </Link>
         <button
          onClick={handleEliminar}
          className="bg-rose-700 py-2 px-5 text-amber-50 rounded-2xl"
        >
          Eliminar
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-gray-300 shadow-sm ">
      <p className='capitalize'>
        <strong>Tipo:</strong> {rep.tipo}
      </p>
      <p className='capitalize'>
        <strong>Equipo:</strong> {rep.equipo}
      </p>
      <p className='capitalize'>
        <strong>Marca:</strong> {rep.marca}
      </p>
      <p className='capitalize'>
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
      <div>{LaBotonera()}</div>
    </div>
  );
};

export default CardProductoInfo;
