import { useState } from "react";

const Instalacion = () => {
  const [form, setForm] = useState({
    cliente: "",
    modelo: "",
    marca: "",
    domicilio:'',
    descripcion:'',
    fechaInicio: "",
  });

  const [equipos, setEquipos] = useState([]); 

  const cambiosInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
            <h1 className='text-center text-blue-700 font-bold  text-3xl'>Instalación de Aire Acondicionado</h1>

            <form className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
            {['cliente','domicilio','marca', 'modelo','fechaInicio','descripcion'].map((dato) => (
  dato === 'descripcion' ? (
    <textarea
      key={dato}
      placeholder={dato.charAt(0).toUpperCase() + dato.slice(1)}
      name={dato}
      value={form[dato]}
      onChange={cambiosInput}
      className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 sm:col-span-2"
      required
    />
  ) : (
    <input
      key={dato}
      type={dato === 'fechaInicio' ? 'date' : 'text'}
      placeholder={dato.charAt(0).toUpperCase() + dato.slice(1)}
      name={dato}
      value={form[dato]}
      onChange={cambiosInput}
      className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  )
))}

                 <button 
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
          >
            Registrar equipo
          </button>
            </form>

        </div>
    </div>
  );
};

export default Instalacion;
