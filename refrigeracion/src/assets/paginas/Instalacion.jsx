import { useState, useEffect } from "react";
import CardProducto from "../componentes/CardProducto";
import Form from "../componentes/Form";
import NavBar from "../componentes/NavBar";
import { Notify } from "notiflix";

const Instalacion = () => {
  const [instalaciones, setInstalaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Número de elementos por página

  // Función para obtener instalaciones de la API
  const fetchinstalaciones = () => {
    fetch("http://localhost:5000/api/instalacion")
      .then((res) => res.json())
      .then((data) => {
        Notify.success('Listado Actualizado')
        setInstalaciones(data)});
  };

  useEffect(() => {
    fetchinstalaciones();
  }, []);

  const onActualizarEstado = (id, nuevoEstado) => {
    console.log(instalaciones)
    const repOriginal = instalaciones.find((r) => r._id === id);
    if (!repOriginal) return console.error("Instalación no encontrada");

    let actualizado = {};

    if (nuevoEstado === "Entregado") {
      const fecha = new Date();
      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, "0"); 
      const dia = String(fecha.getDate()).padStart(2, "0");

      const fechaFormateada = `${año}-${mes}-${dia}`;

      actualizado = {
        ...repOriginal,
        estado: nuevoEstado,
        fechaEntrega: fechaFormateada,
      };
    } else {
      actualizado = {
        ...repOriginal,
        estado: nuevoEstado,
      };
    }

    fetch(`http://localhost:5000/api/instalacion/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizado), 
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar");
        return res.json();
      })
      .then(() => {
        console.log("Estado actualizado");
        fetchinstalaciones(); // Recargamos la lista
      })
      .catch((err) => console.error("Error actualizando estado:", err));
  };

  // Lógica de paginación
  const totalPages = Math.ceil(instalaciones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = instalaciones.slice(indexOfFirstItem, indexOfLastItem);

  // Cambiar de página
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <NavBar activo={true} tipo="instalacion" />
      <div className="min-h-screen bg-gray-300 p-6">
        <div className="max-w-4xl mx-auto bg-cyan-700 p-8 rounded-xl shadow space-y-6">
          <Form
            tipo="instalacion"
            onAdd={fetchinstalaciones}
            className="mt-5"
          />
          <div
            className={
              instalaciones.length > 0
                ? "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
                : ""
            }
          >
            {currentItems.length > 0 ? (
              currentItems.map((rep) => (
                <CardProducto
                  key={rep.id}
                  rep={rep}
                  onActualizarEstado={onActualizarEstado}
                />
              ))
            ) : (
              <div>
                <p className="mx-auto text-center font-bold text-yellow-400 text-xl ">
                  No Hay Equipos Registrados..
                </p>
              </div>
            )}
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              >
                Anterior
              </button>
              <span className="self-center">{`Página ${currentPage} de ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Instalacion;
