import { useState, useEffect } from "react";
import CardProducto from "../componentes/CardProducto";
import Form from "../componentes/Form";
import NavBar from "../componentes/NavBar";

const ListaReparaciones = () => {
  const [reparaciones, setReparaciones] = useState([]);

  const fetchReparaciones = () => {
    fetch("http://localhost:3000/reparacion")
      .then((res) => res.json())
      .then((data) => setReparaciones(data));
  };

  useEffect(() => {
    fetchReparaciones();
  }, []);

  const onActualizarEstado = (id, nuevoEstado) => {
    const repOriginal = reparaciones.find((r) => r.id === id); // ✅ obtenemos el objeto completo

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
        fechaEntrega: fechaFormateada
      };
    } else {
      actualizado = {
        ...repOriginal,
        estado: nuevoEstado,
      };
    }

    fetch(`http://localhost:3000/reparacion/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualizado), // ✅ enviamos el objeto completo
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar");
        return res.json();
      })
      .then(() => {
        console.log("Estado actualizado");
        fetchReparaciones(); // ✅ recargamos la lista
      })
      .catch((err) => console.error("Error actualizando estado:", err));
  };

  return (
    <>
      <NavBar activo={true} tipo="reparacion" />
      <div className="min-h-screen bg-gray-300 p-6">
        <div className="max-w-4xl mx-auto bg-cyan-700 p-8 rounded-xl shadow space-y-6">
          <Form tipo="reparacion" onAdd={fetchReparaciones} className="mt-5" />
          <div
            className={
              reparaciones.length > 0
                ? "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
                : ""
            }
          >
            {reparaciones.length > 0 ? (
              reparaciones.map((rep) => (
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
        </div>
      </div>
    </>
  );
};

export default ListaReparaciones;
