import NavBar from "../componentes/NavBar";
import { Link } from 'react-router-dom';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import FormCliente from '../componentes/FormCliente';
import '../css/login.css'


const agregarRegistro = () => {
  Loading.remove();
  return (
    <>
      <NavBar activo={true} tipo="buscador" />

      <div className="pantalla bg-cyan-100 flex flex-col items-center justify-start pt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Agregar Cliente
        </h1>

        <div className="bg-cyan-700 p-8 rounded-2xl shadow-md w-full max-w-2xl flex flex-col sm:flex-row gap-6 justify-center mt-20 text-white">
          
            <FormCliente />
          
        </div>
      </div>
    </>
  );
};

export default agregarRegistro;
