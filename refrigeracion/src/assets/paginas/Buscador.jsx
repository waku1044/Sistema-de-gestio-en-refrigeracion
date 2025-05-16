import { useState, useEffect } from "react";
import NavBar from "../componentes/NavBar";

const Buscador = () => {
  const [input, setInput] = useState();
  const [buscarPor, setBuscarPor] = useState(true);

  useEffect(() => {
    if (input) {
      // Intentamos obtener los datos de "reparacion"
      fetch(`http://localhost:3000/reparacion/${input}`)
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
            fetch(`http://localhost:3000/instalacion/${input}`)
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
  }, [input]);

  return (
    <>
      <NavBar activo={true} tipo="info" />

      <div className="flex flex-col items-center justify-center space-y-3 my-1 p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800">
          Buscar Cliente por
        </h2>

        <button
          className="font-semibold bg-blue-500 text-white rounded-full py-3 px-8 transition-all duration-300 ease-in-out transform hover:bg-blue-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => setBuscarPor(!buscarPor)}
        >
          {buscarPor ? "Dirección" : "Teléfono"}
        </button>
      </div>

      <div className="relative w-full max-w-xl mx-auto mt-6">
        <input
          type="search"
          placeholder={`Ingresa ${!buscarPor ? "Dirección" : "Teléfono"}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-4 pl-12 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
        />

        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 18l6-6-6-6M10 18l-6-6 6-6"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default Buscador;
