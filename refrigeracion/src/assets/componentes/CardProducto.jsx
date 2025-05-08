import { useState, useEffect } from 'react';

const CardProducto = (props) => {
  const [producto, setProducto] = useState([]);
  const tipo = props.tipo;
  const btnClass = "px-4 py-2 text-white rounded-xl transition";

  useEffect(() => {
    if (!tipo) return;  // Si no hay tipo, no hace la petición

    const dataFetch = async () => {
      try {
        const result = await fetch(`http://localhost:3000/${tipo}`);
        if (!result.ok) {
          throw new Error(`Error: ${result.statusText}`);
        }
        const resuelto = await result.json();
        setProducto(resuelto);
        console.log(resuelto);
      } catch (error) {
        console.log(error);  // Solo logueamos el error directamente
      }
    };

    dataFetch();
  }, [tipo]);

  const actualizarEstado = (id, nuevoEstado) => {
    const reparacionActualizada = producto.find((item) => item.id === id);
    if (!reparacionActualizada) return;

    const actualizado = { ...reparacionActualizada, estado: nuevoEstado };

    fetch(`http://localhost:3000/reparacion/${id}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(actualizado),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al actualizar");
        return res.json();
      })
      .then((data) => {
        // Actualiza el estado local después del éxito del servidor
        setProducto((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, estado: nuevoEstado } : item
          )
        );
      })
      .catch((err) => console.error("Error actualizando estado:", err));
  };

  const getAcciones = (estado, id) => {
    switch (estado) {
      case "Pendiente":
        return (
          <button
            type="button"
            onClick={() => actualizarEstado(id, "En reparación")}
            className={`${btnClass} bg-amber-500`}
          >
            Marcar como En reparación
          </button>
        );
      case "En reparación":
        return (
          <div className="flex gap-2 flex-wrap">
            <button
              type="button"
              onClick={() => actualizarEstado(id, "Reparado")}
              className={`${btnClass} bg-blue-400`}
            >
              Reparado
            </button>
            <button
              type="button"
              onClick={() => alert("Continuar reparación...")}
              className={`${btnClass} bg-red-400`}
            >
              Aún no reparado
            </button>
          </div>
        );
      case "Reparado":
        return (
          <button
            type="button"
            onClick={() => actualizarEstado(id, "Entregado")}
            className={`${btnClass} bg-green-600`}
          >
            Marcar como Entregado
          </button>
        );
      case "Entregado":
        return (
          <span className="text-green-700 font-bold">
            Entregado al cliente ✅
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {Array.isArray(producto) && producto.length > 0 ? (
        producto.map((rep) => (
            <div
              key={rep.id}
              className="p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm"
            >
              <p>
                <strong>Cliente:</strong> {rep.cliente}
              </p>
              <p>
                <strong>Domicilio:</strong> {rep.domicilio}
              </p>
              <p>
                <strong>Tipo:</strong> {rep.tipo}
              </p>
              <p>
                <strong>Marca:</strong> {rep.marca}
              </p>
              <p>
                <strong>Falla:</strong> {rep.falla}
              </p>
              <p>
                <strong>Fecha:</strong> {rep.fecha}
              </p>
              <p className="mb-2">
                <strong>Estado:</strong>{" "}
                <span
                  className={`font-semibold ${
                    rep.estado === "Pendiente"
                      ? "text-red-400"
                      : rep.estado === "En reparación"
                      ? "text-blue-600"
                      : rep.estado === "Reparado"
                      ? "text-green-600"
                      : "text-purple-600"
                  }`}
                >
                  {rep.estado}
                </span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {getAcciones(rep.estado, rep.id)}
              </div>
            </div>
          ))
      ) : (
        <p>No hay Equipos registrados.</p>
      )}
    </div>
  );
};

export default CardProducto;
