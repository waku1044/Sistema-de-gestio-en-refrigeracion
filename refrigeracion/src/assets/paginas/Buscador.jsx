import { useState } from "react";
import NavBar from "../componentes/NavBar";

const Buscador = () => {
  const [datoInput, setDatoInput] = useState("");
  const [buscarPor, setBuscarPor] = useState(true); // true = Domicilio, false = Teléfono
  const [buscado, setBuscado] = useState(null);
  const [mensaje, setMensaje] = useState(""); // para mostrar errores o estado

  const manejarBusqueda = () => {
    if (!datoInput.trim()) {
      setMensaje("Por favor ingresa un dato para buscar.");
      setBuscado(null);
      return;
    }

    setMensaje("Buscando...");
    setBuscado(null);

    if (buscarPor) {
      // Buscar por Domicilio
      // Buscar primero en reparación
      fetch(`http://localhost:5000/api/clientes/`)
        .then((res) => {
          if (!res.ok) throw new Error("No encontrado en reparación");
          return res.json();
        })
        .then((data) => {
          let resultado = data.filter(
            (item) =>
            item.domicilio.trim().toLowerCase().includes(datoInput.trim().toLowerCase())
          );

          if (resultado.length === 0) {
            throw new Error("No se encontraron resultados");
          }
          console.log(resultado)
          setBuscado(resultado); // Guardamos el arreglo de resultados
          setMensaje(""); // limpiar mensaje si encontró algo
        })
        .catch(() => {
          // Si no está en reparación, buscar en instalación
          fetch(`http://localhost:5000/api/clientes/`)
            .then((res) => {
              if (!res.ok) throw new Error("No encontrado en instalación");
              return res.json();
            })
            .then((data) => {
              let resultado = data.filter(
                (item) =>
                  item.domicilio.trim().toLowerCase() ===
                  datoInput.trim().toLowerCase()
              );

              if (resultado.length === 0) {
                throw new Error("No se encontraron resultados");
              }
              console.log(resultado)
              setBuscado(resultado); // Guardamos el arreglo de resultados
              setMensaje(""); // encontrado en instalación
            })
            .catch(() => {
              setMensaje("No se encontró ningún cliente con ese dato.");
            });
        });
    } else {
      // Buscar por Teléfono
      fetch(`http://localhost:5000/api/clientes/`)
        .then((res) => {
          if (!res.ok) throw new Error("No encontrado en reparación");
          return res.json();
        })
        .then((data) => {
          const numero = parseInt(datoInput.trim(), 10)
          
          const resultado = data.filter(
            (item) =>
            item.telefono === numero
            );
            console.log(resultado)
            
            if(resultado.length === 0) {
              throw new Error("No se encontraron resultados");
            }
            console.log(resultado)
          setBuscado(resultado); // Guardamos el arreglo de resultados
          setMensaje(""); // limpiar mensaje si encontró algo
        })
        .catch(() => {
          // Si no está en reparación, buscar en instalación
          fetch(`http://localhost:5000/api/clientes/`)
            .then((res) => {
              if (!res.ok) throw new Error("No encontrado en instalación");
              return res.json();
            })
            .then((data) => {
              const numero = parseInt(datoInput.trim(), 10)
              let resultado = data.filter(
                (item) => item.telefono === numero
                );
                
                if (resultado.length === 0) {
                  throw new Error("No se encontraron resultados");
                }
                console.log(resultado)
              setBuscado(resultado); // Guardamos el arreglo de resultados
              setMensaje(""); // encontrado en instalación
            })
            .catch(() => {
              setMensaje("No se encontró ningún cliente con ese dato.");
            });
        });
    }
  };

  return (
    <>
      <NavBar activo={true} tipo="info" />

      <div className="flex flex-col items-center justify-center space-y-3 my-4 p-4 bg-white rounded-lg shadow-lg">
        <button
          className="font-semibold bg-blue-500 text-white rounded-full py-2 px-6 hover:bg-blue-600"
          onClick={() => setBuscarPor(!buscarPor)}
        >
          Buscar por: {buscarPor ? "Teléfono" : "Domicilio"}
        </button>

        <div className="w-full max-w-xl">
          <input
            type="search"
            placeholder={`Ingresa ${buscarPor ? "Domicilio" : "Teléfono"}`}
            value={datoInput}
            onChange={(e) => setDatoInput(e.target.value)}
            className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="mt-2 bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
          onClick={manejarBusqueda}
        >
          Buscar
        </button>

        {mensaje && <p className="text-red-600 font-medium mt-2">{mensaje}</p>}

        {buscado && Array.isArray(buscado) && buscado.length > 0 ? (
          <div className="mt-4 p-4 bg-gray-100 rounded w-full max-w-xl">
            <h3 className="font-bold text-lg text-gray-800">Resultados:</h3>
            <div className="space-y-3 mt-2">
              {buscado.map((item, index) => (
                
                <div key={index} className="p-4 bg-amber-200 rounded-lg shadow-md">
                  <div className="flex justify-around mb-5">
                    <h3 className="font-bold ">
                      Cliente Numero: <i className="text-emerald-600">{item._id}</i> 
                    </h3>
                    
                  </div>
                  <p className="capitalize">
                    <strong>Nombre: </strong>
                    {item.cliente}
                  </p>
                  <p>
                    <strong>Teléfono: </strong>
                    {item.telefono}
                  </p>
                  <p className="capitalize">
                    <strong>Domicilio: </strong>
                    {item.domicilio}
                  </p>
                </div>
))}
            </div>
          </div>
        ) : (
          <p className="text-gray-600">No se encontraron resultados.</p>
        )}
      </div>
    </>
  );
};

export default Buscador;
