import { useState } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const Form = ({ tipo, onAdd }) => {
  const [formData, setFormData] = useState({
    cliente: "",
    domicilio: "",
    tipo: "",
    telefono:'',
    marca: "",
    falla: "",
    fecha: "",
    descripcion: "",
    estado: "Pendiente",
  });

  const [errorData, setErrorData] = useState({}); // Estado para errores

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar el error cuando el campo se complete
    if (value) {
      setErrorData((prev) => ({ ...prev, [name]: "" }));
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de los campos
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "" && key !== "estado") {
        errors[key] = "Debe completar el campo.";
      }
    });

    if (Object.keys(errors).length > 0) {
      setErrorData(errors); // Establecer los errores en el estado
      return;
    }

    // Enviar el formulario si no hay errores
    fetch(`http://localhost:3000/${tipo}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al agregar reparación");
        return res.json();
      })
      .then(() => {
        if (onAdd) onAdd(); // 👈 Actualiza la lista en el padre
        setFormData({
          cliente: "",
          domicilio: "",
          telefono:"",
          tipo: "",
          marca: "",
          falla: "",
          fecha: "",
          descripcion: "",
          estado: "Pendiente",
        });
        Notify.success('Se agrego equipo con Exito');
        setErrorData({}); // Limpiar los errores después del envío
      })
      .catch((err) => console.error("Error al enviar:", err));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto  bg-cyan-100 p-8 rounded-xl shadow space-y-6"
    >
      <h2 className="text-xl font-bold mb-4 text-center">Nuevo equipo para  ({tipo})</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative my-3">
          <input
            name="cliente"
            placeholder="Cliente"
            value={formData.cliente}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500  text-sm absolute bottom-[-18px] left-5 ">
            {errorData.cliente && errorData.cliente}
          </span>
        </div>

        <div className="relative my-3">
          <input
            name="domicilio"
            placeholder="Domicilio"
            value={formData.domicilio}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.domicilio && errorData.domicilio}
          </span>
        </div>

        <div className="relative my-3">
          <input
            type="number"
            name="telefono"
            placeholder="Telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.telefono && errorData.telefono}
          </span>
        </div>

        <div className="relative my-3">
          <input
            name="tipo"
            placeholder="Tipo"
            value={formData.tipo}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.tipo && errorData.tipo}
          </span>
        </div>

        <div className="relative my-3">
          <input
            name="marca"
            placeholder="Marca"
            value={formData.marca}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
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
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.falla && errorData.falla}
          </span>
        </div>

        <div className="relative my-3">
          <input
            name="fecha"
            type="date"
            value={formData.fecha}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200 "
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

export default Form;
