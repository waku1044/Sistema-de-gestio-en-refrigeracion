import { useState, useEffect } from "react";
import CardProducto from "../componentes/CardProducto";
import Form from "../componentes/Form";
import NavBar from "../componentes/NavBar";

const Instalacion = () => {
  const [instalaciones, setInstalaciones] = useState([]);

  const fetchinstalaciones = () => {
    fetch("http://localhost:3000/instalacion")
      .then((res) => res.json())
      .then((data) => setInstalaciones(data));
  };

  useEffect(() => {
    fetchinstalaciones();
  }, []);

  const onActualizarEstado = (id, nuevoEstado) => {
    const repOriginal = instalaciones.find((r) => r.id === id); // ✅ obtenemos el objeto completo

    if (!repOriginal) return console.error("Reparación no encontrada");

    const actualizado = { ...repOriginal, estado: nuevoEstado };

    fetch(`http://localhost:3000/instalacion/${id}`, {
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
        fetchinstalaciones(); // ✅ recargamos la lista
      })
      .catch((err) => console.error("Error actualizando estado:", err));
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
          <div className={instalaciones.length > 0 ? "grid grid-cols-1 md:grid-cols-2 gap-6 mt-8": ''}>
            {instalaciones.length > 0 ? (
              instalaciones.map((rep) => (
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

export default Instalacion;
