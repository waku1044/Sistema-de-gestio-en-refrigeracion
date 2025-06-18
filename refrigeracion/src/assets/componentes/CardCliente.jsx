import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Report } from "notiflix/build/notiflix-report-aio";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

const CardCliente = ({ props }) => {
  const cliente = props;
  console.log(cliente._id);
  const eliminarCliente = (id) => {
    fetch(`https://backend-refri.vercel.app/api/cliente/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex-col p-4 rounded-lg border border-gray-200 bg-gray-300 shadow-sm ">
      <p className="capitalize">
        <strong>Cliente:</strong> {cliente.cliente}
      </p>
      <p className="capitalize">
        <strong>Domicilio:</strong> {cliente.domicilio}
      </p>
      <p className="capitalize">
        <strong>Telefono:</strong> {cliente.telefono}
      </p>

      <div className="flex gap-3 flex-wrap mt-3">
        <Link
          className="bg-cyan-500 py-2 px-5 text-amber-50 rounded-2xl"
          to={`/editarcliente/${cliente._id}`}
        >
          <FaEdit className="" />
        </Link>{" "}
        <button
          className="bg-red-500 py-2 px-5 text-amber-50 rounded-2xl"
          onClick={() => eliminarCliente(cliente._id)}
        >
          <FaTrash className="" />
        </button>
        <Link
          className="bg-emerald-800 py-2 px-5 text-amber-50 rounded-2xl"
          to={`/agregarequipo/${cliente._id}`}
        >
          
            <FaPlus className="" />
          
        </Link>
      </div>
    </div>
  );
};

export default CardCliente;
