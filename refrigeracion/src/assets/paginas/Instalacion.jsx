import { useState } from "react";
import CardProducto from "../componentes/CardProducto";

const Instalacion = () => {
  const [form, setForm] = useState({
    cliente: "",
    modelo: "",
    telefono: "",
    marca: "",
    domicilio: "",
    descripcion: "",
    fechaInicio: "",
  });

  const [error, setError] = useState({});

  const [equipos, setEquipos] = useState([]);

  const cambiosInput = (e) => {
    const {name, value} = e.target;
    if (value.trim() === "") {
      setError({ ...error, [name]: "Debe completar el campo" });
    } else {
      setError({ ...error, [name]: "" });
    }
    setForm({ ...form, [name]: value });
  };
  // const cambiosInput = (e) => {
  //   const { name, value } = e.target;
  
  //   // Si el campo está vacío, mostrar el error; si no, limpiar el error
  //   if (value.trim() === "") {
  //     setError((prevError) => ({ ...prevError, [name]: "Debe completar el campo" }));
  //   } else {
  //     setError((prevError) => ({ ...prevError, [name]: "" }));
  //   }
  
  //   setForm({ ...form, [name]: value });
  // };

  const registrarlo = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
        <h1 className="text-center text-blue-700 font-bold  text-3xl">
          Instalación de Aire Acondicionado
        </h1>

        <form
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          onSubmit={registrarlo}
        >
          {[
            "cliente",
            "domicilio",
            "telefono",
            "marca",
            "modelo",
            "fechaInicio",
            "descripcion",
          ].map((dato) =>
            dato === "descripcion" ? (
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
              <div className="flex flex-col space-y-2">
                <input
                  key={dato}
                  type={dato === "fechaInicio" ? "date" : "text"}
                  placeholder={dato.charAt(0).toUpperCase() + dato.slice(1)}
                  name={dato}
                  value={form[dato]}
                  onChange={cambiosInput}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {error[dato] && (
                  <span className="text-red-500 text-sm">{error[dato]}</span>
                )}
              </div>
            )
          )}

          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
          >
            Registrar equipo
          </button>
        </form>
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
