import NavBar from "../componentes/NavBar";
import { Link } from 'react-router-dom';
import '../css/login.css'
const Principal = () => {
  return (
    <>
      <NavBar activo={true} tipo="buscador" />

      <div className="pantalla bg-cyan-100 flex flex-col items-center justify-start pt-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          ¿Qué tipo de trabajo es?
        </h1>

        <div className="bg-cyan-700 p-8 rounded-2xl shadow-md w-full max-w-2xl flex flex-col sm:flex-row gap-6 justify-center mt-20 text-white">
          
            <Link to='/reparacion' className="text-lg font-semibold bg-cyan-600 hover:bg-cyan-500 transition p-6 rounded-xl text-center cursor-pointer w-full sm:w-1/2">Reparación en taller / domicilio</Link>
          
            <Link to='/instalacion' className="text-lg font-semibold bg-cyan-600 hover:bg-cyan-500 transition p-6 rounded-xl text-center cursor-pointer w-full sm:w-1/2">Instalación de Aire Acondicionado</Link>
          
        </div>
      </div>
    </>
  );
};

export default Principal;
