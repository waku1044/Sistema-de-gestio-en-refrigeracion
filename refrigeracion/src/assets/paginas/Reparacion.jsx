import { useState } from "react";

const ReparacionesTaller = () => {
  const [form, setForm] = useState({
    cliente: "",
    tipo: "",
    marca: "",
    falla: "",
  });

  const [reparaciones, setReparaciones] = useState([]);
  const btnClass = "px-4 py-2 text-white rounded-xl transition";



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nueva = {
      ...form,
      estado: "Pendiente",
      id: Date.now(),
    };
    setReparaciones([...reparaciones, nueva]);
    setForm({ cliente: "", tipo: "", marca: "", falla: "" });
  };

  const actualizarEstado = (id, nuevoEstado) => {
    setReparaciones((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, estado: nuevoEstado } : item
      )
    );
  };

  const getAcciones = (estado, id) => {
    switch (estado) {
      case "Pendiente":
        return (
          <button
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
              onClick={() => actualizarEstado(id, "Reparado")}
              className={`${btnClass} bg-blue-400`}

            >
              Reparado
            </button>
            <button
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
            onClick={() => actualizarEstado(id, "Entregado")}
            className={`${btnClass} bg-green-600`}

          >
            Marcar como Entregado
          </button>
        );
      case "Entregado":
        return <span className="text-green-700 font-bold">Entregado al cliente ✅</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Reparación en Taller / Domicilio
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {["cliente", "tipo", "marca", "falla"].map((f) => (
            <input
              key={f}
              name={f}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={form[f]}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          ))}
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
          >
            Registrar equipo
          </button>
        </form>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Equipos registrados
          </h2>
          {reparaciones.map((rep) => (
            <div
              key={rep.id}
              className="p-4 rounded-lg border border-gray-200 bg-gray-50 shadow-sm"
            >
              <p><strong>Cliente:</strong> {rep.cliente}</p>
              <p><strong>Tipo:</strong> {rep.tipo}</p>
              <p><strong>Marca:</strong> {rep.marca}</p>
              <p><strong>Falla:</strong> {rep.falla}</p>
              <p className="mb-2">
                <strong>Estado:</strong>{" "}
                <span className={`font-semibold ${rep.estado === "Pendiente"
                  ? "text-yellow-600"
                  : rep.estado === "En reparación"
                  ? "text-blue-600"
                  : rep.estado === "Reparado"
                  ? "text-green-600"
                  : "text-purple-600"}`}>
                  {rep.estado}
                </span>
              </p>
              <div className="flex gap-3 flex-wrap">
                {getAcciones(rep.estado, rep.id)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReparacionesTaller;
