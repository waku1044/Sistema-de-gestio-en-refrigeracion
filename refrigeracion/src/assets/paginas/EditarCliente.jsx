import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import NavBar from "../componentes/NavBar";
import { useNavigate } from "react-router-dom";

const EditarCliente = () => {
  const [cliente, setCliente] = useState({});
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  
  // const [cliente, setCliente] = useState('');
  
  useEffect(() => {
      if(id) {
          const clientePorId =(id)=>{
            fetch(`https://backend-refri.vercel.app/api/clientes/cliente/${id}`,{
              headers:{
                "Authorization": `Bearer ${localStorage.getItem('token')}`
              }
            })
            .then(res=>res.json())
            .then(data=>setCliente(data))
            .catch(err=>console.error(err))
          }
          clientePorId(id)
  }}, [id]);

 

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar el error cuando el campo se complete
    if (value) {
      setErrorData((prev) => ({ ...prev, [name]: "" }));
    }
    setCliente((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    const errores = {};
    if (!cliente.cliente.trim()) errores.cliente = "El nombre es obligatorio";
    if (!cliente.domicilio.trim()) errores.domicilio = "El domicilio es obligatorio";
    if (!cliente.telefono) errores.telefono = "El telefono es obligatorio";
    return errores;
  };

  

  const actualizarCliente = (id)=>{
    fetch(`https://backend-refri.vercel.app/api/clientes/cliente/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(cliente), // Asegúrate de que "equipo" contenga los datos correctos
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar");
        }
        return res.json(); // Devuelves los datos JSON de la respuesta
      })
      .then((data) => {
        Notify.success("Cliente actualizado correctamente");
        navigate(`/clientes`); // Corregir "navegate" a "navigate"
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error("Error en la actualización:", error);
        Notify.failure("Hubo un problema al actualizar");
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de los campos del formulario
    const errores = validarCampos();
    setErrorData(errores);

    // Si hay errores, mostramos una notificación de error y detenemos el proceso
    if (Object.keys(errores).length > 0) {
      Notify.failure("Hay errores en el formulario");
      return;
    }
    actualizarCliente(id);
    // Si no hay errores, hacer una petición PUT
    Notify.success("Formulario válido. Puedes enviar los cambios.");
    console.log(cliente);
    
  };


  return (
    <>
      <NavBar activo={true} tipo="info" />
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto  bg-cyan-100 p-8 rounded-xl shadow space-y-6 mt-20"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Editar Cliente
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div className="relative my-3">
            <input
              name="cliente"
              placeholder="Cliente"
              value={cliente.cliente}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.cliente && errorData.cliente}
            </span>
          </div>

          <div className="relative my-3">
            <input
              name="domicilio"
              placeholder="Domicilio"
              value={cliente.domicilio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.domicilio && errorData.domicilio}
            </span>
          </div>

        </div>

        <div className="relative my-3">
          <input
            name="telefono"
            type="number"
            placeholder="Telefono"
            value={cliente.telefono}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200 "
            
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.telefono && errorData.telefono}
          </span>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white mt-5 py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </>
  );
};

export default EditarCliente;
