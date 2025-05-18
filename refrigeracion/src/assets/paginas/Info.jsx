import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CardProductoInfo from "../componentes/CardProductoInfo";
import NavBar from '../componentes/NavBar';

const Info = () => {
  const { id } = useParams(); // Obtenemos el "id" desde la URL
  const [equipo, setEquipo] = useState({}); // Estado para almacenar los datos obtenidos
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    if (id) {
      // Intentamos obtener los datos de "reparacion"
      fetch(`http://localhost:3000/reparacion/${id}`)
        .then((res) => {
          if (!res.ok) {
            // Si no conseguimos los datos de "reparacion", lanzamos un error
            throw new Error("No encontrado en reparacion");
          }
          return res.json(); // Convertimos la respuesta en JSON si la solicitud es exitosa
        })
        .then((data) => setEquipo(data)) // Si la petición es exitosa, actualizamos el estado
        .catch((err) => {
          console.log(err.message); // Logueamos el error

          // Si hubo un error en la búsqueda de "reparacion", intentamos con "instalacion"
          if (err.message === "No encontrado en reparacion") {
            fetch(`http://localhost:3000/instalacion/${id}`)
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
    <NavBar activo={true} tipo='info'/>
      <div className="flex items-center justify-center min-h-screen bg-gray-200">
        <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Detalles del Equipo
          </h2>

          <p className="text-gray-700 mb-4">
            Id: <span className="font-bold">{id}</span>
          </p>

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
