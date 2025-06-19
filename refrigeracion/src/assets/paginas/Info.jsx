import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardProductoInfo from "../componentes/CardProductoInfo";
import NavBar from "../componentes/NavBar";

const Info = () => {
  const { id } = useParams(); // Obtenemos el "id" desde la URL
  const [equipo, setEquipo] = useState({}); // Estado para almacenar los datos obtenidos
  const [error, setError] = useState(null); // Estado para manejar errores
  const [cliente, setCliente] = useState("");

  const clientePorId = (id) => {
    fetch(`https://backend-refri.vercel.app/api/clientes/cliente/${id}`)
      .then((res) => res.json())
      .then((data) => setCliente(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (id) {
      // Intentamos obtener los datos de "reparacion"
      fetch(`https://backend-refri.vercel.app/api/equipos/reparacion/${id}`)
        .then((res) => {
          if (!res.ok) {
            // Si no conseguimos los datos de "reparacion", lanzamos un error
            throw new Error("No encontrado en reparacion");
          }
          return res.json(); // Convertimos la respuesta en JSON si la solicitud es exitosa
        })
        .then((data) => {
          clientePorId(data.idCliente)
          setEquipo(data)}) // Si la petición es exitosa, actualizamos el estado
        
        .catch((err) => {
          console.log(err.message); // Logueamos el error

          // Si hubo un error en la búsqueda de "reparacion", intentamos con "instalacion"
          if (err.message === "No encontrado en reparacion") {
            fetch(`http://localhost:5000/api/instalacion/${id}`)
              .then((res) => {
                if (!res.ok) {
                  throw new Error("No encontrado en instalacion");
                }
                return res.json();
              })
              .then((data) => setEquipo(data)) // Si la segunda petición es exitosa, actualizamos el estado
              .catch((err) => {
                // Si ambas peticiones fallan, mostramos un error
                setError("Error al cargar el equipo.");
                console.error("Error al cargar el equipo:", err);
              });
          } else {
            // Si la petición falla por algún otro motivo (como problemas de red)
            setError("Hubo un problema al cargar la información.");
          }
        });
    }
  }, [id]); // Dependemos de "id" para volver a ejecutar la búsqueda si cambia

  // useEffect(() => {
  //   clientePorId(equipo.idCliente);
  // }, []);

  // Si hay un error, mostramos un mensaje
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <>
      <NavBar activo={true} tipo="info" />
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
          <div className="flex justify-between">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 hidden sm:block">
              Detalles del Cliente
            </h2>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 hidden sm:block">
              Detalles del Equipo
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 block sm:hidden  ">
                Detalles del Cliente
              </h2>
              <p className="text-gray-700 capitalize ">
                Cliente: <span className="font-bold">{cliente.cliente}</span>
              </p>
              <p className="text-gray-700 capitalize">
                Domicilio:{" "}
                <span className="font-bold">{cliente.domicilio}</span>
              </p>
              <p className="text-gray-700 ">
                Telefono: <span className="font-bold">{cliente.telefono}</span>
              </p>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2 mt-4 block sm:hidden">
              Detalles del Equipo
            </h2>
            <p className="text-gray-700 mb-4">
              Id Equipo: <span className="font-bold">{id}</span>
            </p>
          </div>

          {/* Si el equipo se encuentra, renderizamos la tarjeta con los detalles */}
          {equipo && Object.keys(equipo).length > 0 ? (
            <CardProductoInfo rep={equipo} />
          ) : (
            <p className="text-gray-500">Cargando los detalles...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Info;
