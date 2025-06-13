import { useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useParams } from 'react-router-dom';


const FormEquipo = () => {
  const [formData, setFormData] = useState({
    idCliente:'',
    equipo: "",
    marca: "",
    falla: "",
    tipo:'reparacion',
    fecha: "",
    descripcion: "",
    estado: "Pendiente",
  });

  const [errorData, setErrorData] = useState({}); // Estado para errores
  const { id } = useParams();
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar el error cuando el campo se complete
    if (value) {
      setErrorData((prev) => ({ ...prev, [name]: "" }));
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
    // setFormData(...formData,{[name]:value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData((prev)=>({...prev,idCliente:id}))
    // Validación de los campos
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" && key !== "estado") {
        errors[key] = "Debe completar el campo.";
      }
    });
    console.log(errors)
    if (Object.keys(errors).length > 0) {
      setErrorData(errors); // Establecer los errores en el estado
      return;
    }
    console.log(formData)
    // Enviar el formulario si no hay errores
    fetch(`https://backend-refri-gm5vy0kda-waku1044s-projects.vercel.app/api/agregarequipo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al agregar reparación");
        return res.json();
      })
      .then(() => {
        // if (onAdd) onAdd(); 
        setFormData({
          equipo: "",
          marca: "",
          falla: "",
          fecha: "",
          tipo:'',
          descripcion: "",
          fechaEntrega: "",
          estado: "Pendiente",
        });
        Notify.success("Se agrego equipo con Exito");
        setErrorData({}); // Limpiar los errores después del envío
      })
      .catch((err) => console.error("Error al enviar:", err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto  bg-cyan-100 p-8 rounded-xl shadow space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <label htmlFor="tipo" className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200">Selecciona el servicio:</label>
        <select 
        id="tipo" 
        name="tipo" 
        value={formData.tipo}
        onChange={handleChange}
        className="bg-red-300 text-emerald-950">
          <option value="reparacion" >Reparación</option>
          <option value="instalacion" >Instalación</option>
        </select>

        <div className="relative my-3">
          <input
            name="equipo"
            placeholder="Equipo"
            value={formData.equipo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.equipo && errorData.equipo}
          </span>
        </div>

        <div className="relative my-3">
          <input
            name="marca"
            placeholder="Marca"
            value={formData.marca}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.marca && errorData.marca}
          </span>
        </div>

        <div className="relative my-3">
          <input
            name="falla"
            placeholder="Falla"
            value={formData.falla}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.falla && errorData.falla}
          </span>
        </div>

        <div className="relative my-3">
          <input
            name="fecha"
            type="Date"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.fecha && errorData.fecha}
          </span>
        </div>
      </div>

      <div className="relative my-3">
        <textarea
          name="descripcion"
          placeholder="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-amber-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200 "
          rows={3}
        />
        <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
          {errorData.descripcion && errorData.descripcion}
        </span>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white mt-5 py-2 px-6 rounded hover:bg-blue-700 transition"
        >
          Agregar equipo
        </button>
      </div>
    </form>
  );
};

export default FormEquipo;
