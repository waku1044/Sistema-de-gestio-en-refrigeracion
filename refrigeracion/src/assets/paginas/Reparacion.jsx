import { useState, useEffect } from "react";
import CardProducto from "../componentes/CardProducto";
import Form from "../componentes/FormEquipo";
import NavBar from "../componentes/NavBar";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";

const ListaReparaciones = () => {
  const [reparaciones, setReparaciones] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const itemsPerPage = 10; // Número de items por página

  // Función para obtener los reparaciones de la API

  const fetchReparaciones = () => {
    fetch("https://backend-refri.vercel.app/api/equipos/reparacion", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(localStorage.getItem("token"));
        Notify.success("Listado Actualizado");
        return setReparaciones(data);
      });
    // .catch((err) => {
    //   Loading.remove();
    //   Notify.failure("Ocurrió un error: " + (err.message || err));;
    // });
  };

  useEffect(() => {
    fetchReparaciones();
    Loading.remove();
  }, []);

  const onActualizarEstado = (id, nuevoEstado) => {
    const repOriginal = reparaciones.find((r) => r._id === id); // ✅ obtenemos el objeto completo
    console.log(repOriginal);
    if (!repOriginal) return console.error("Reparación no encontrada");

    let actualizado = {};

    if (nuevoEstado === "Entregado") {
      const fecha = new Date();
      const año = fecha.getFullYear();
      const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Suma 1 porque enero es 0
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

    fetch(`https://backend-refri.vercel.app/api/equipos/reparacion/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(actualizado), // ✅ enviamos el objeto completo
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar");
        return res.json();
      })
      .then(() => {
        fetchReparaciones(); // ✅ recargamos la lista
      })
      .catch((err) => {
        Notify.failure("Error actualizando estado:", err);
      });
  };

  // Lógica de paginación
  const totalPages = Math.ceil(reparaciones.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(reparaciones)
    ? reparaciones.slice(indexOfFirstItem, indexOfLastItem)
    : setReparaciones([]);

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
      <NavBar activo={true} tipo="reparacion" />
      <div className="min-h-screen bg-gray-300 p-6">
        <h1 className="text-4xl font-bold text-center text-cyan-700 mb-4">
          Reparación
        </h1>

        <div className="max-w-4xl mx-auto bg-cyan-700 p-8 rounded-xl shadow space-y-6">
          <div
            className={
              reparaciones.length > 0
                ? "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
                : ""
            }
          >
            {currentItems.length > 0 ? (
              currentItems.map((rep) => (
                <CardProducto
                  key={rep.id} // Aquí usamos 'rep.id' como clave única
                  rep={rep}
                  onActualizarEstado={onActualizarEstado}
                />
              ))
            ) : (
              <div>
                <p className="mx-auto text-center font-bold text-yellow-400 text-xl">
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

export default ListaReparaciones;
