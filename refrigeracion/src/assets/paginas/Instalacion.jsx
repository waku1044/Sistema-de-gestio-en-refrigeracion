import { useState } from "react";
import CardProducto from "../componentes/CardProducto";
import Form from '../componentes/Form';

const Instalacion = () => {
  

  const [equipos, setEquipos] = useState([]);

  

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
        <h1 className="text-center text-blue-700 font-bold  text-3xl">
          Instalación de Aire Acondicionado
        </h1>
        
        <Form tipo='instalacion' />
       
        <div className="space-y-4">
          <div className="flex items-center justify-around flex-wrap">
            <h2 className="text-xl font-semibold text-gray-800 me-5 mb-3">
              Equipos registrados
            </h2>
          </div>
          <CardProducto tipo="instalacion" />
        </div>
      </div>
    </div>
  );
};

export default Instalacion;
