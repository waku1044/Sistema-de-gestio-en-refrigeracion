import NavBar from "../componentes/NavBar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import CardCliente from "../componentes/CardCliente";

import "../css/login.css";

const Clientes = () => {
  Loading.remove();

  const [clientes, setClientes] = useState([]);

  const listaClientes = () => {
    
    fetch("http://localhost:5000/api/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    listaClientes();
  }, []);

  return (
    <>
      <NavBar activo={true} tipo="info" />

      <div className="pantalla bg-cyan-100 flex flex-col items-center justify-start pt-10 ">
        <div className="flex items-center gap-22">
          <h1 className="text-3xl font-bold text-gray-800  text-center">
            Clientes
          </h1>
          <Link className="bg-emerald-400 py-2 px-5 text-indigo-800 font-medium rounded-2xl" to="/agregarcliente">Agregar Cliente</Link>
        </div>

        <div className="bg-cyan-700 p-8 rounded-2xl shadow-md max-w-4xl   flex flex-col sm:flex-row gap-6 justify-center mt-3 text-black flex-wrap mb-4">
          {clientes.map((cliente) => {
            return <CardCliente 
            props={cliente} 
            key={cliente.id} 
            />;
          })}
        </div>
      </div>
    </>
  );
};

export default Clientes;
