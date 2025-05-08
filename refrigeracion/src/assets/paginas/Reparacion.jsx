import { useState, useEffect } from "react";
import CardProducto from "../componentes/CardProducto";

const ReparacionesTaller = () => {
  const [form, setForm] = useState({
    cliente: "",
    tipo: "",
    domicilio: "",
    marca: "",
    falla: "",
    fecha: "",
  });

  const [reparaciones, setReparaciones] = useState([]);
  const btnClass = "px-4 py-2 text-white rounded-xl transition";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetch("http://localhost:3000/reparacion")
      .then((res) => res.json())
      .then((data) => setReparaciones(data))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const nueva = {
      ...form,
      estado: "Pendiente",
      id: Date.now(),
    };
    setReparaciones([...reparaciones, nueva]);
    console.log("Reparaciones: " + reparaciones);
    setForm({
      cliente: "",
      tipo: "",
      marca: "",
      falla: "",
      domicilio: "",
      fecha: "",
    });

    // nueva se enviaria a la base de datos
    fetch("http://localhost:3000/reparacion", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nueva),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al enviar los datos");
        }
        return response.json();
      })
      .then((data) => {
        
        console.log("Datos enviados con éxito:", data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };


  return (
    <div className="min-h-screen bg-gray-300 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-700">
          Reparación en Taller / Domicilio
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {["cliente", "domicilio", "tipo", "marca", "falla", "fecha"].map(
            (f) =>
              f === "fecha" ? (
                <input
                  key={f}
                  name={f}
                  type="date"
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              ) : (
                <input
                  key={f}
                  name={f}
                  placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                  value={form[f]}
                  onChange={handleChange}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              )
          )}
          <button
            type="submit"
            className="col-span-1 sm:col-span-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl"
          >
            Registrar equipo
          </button>
        </form>

        <div className="space-y-4">
          <div className="flex items-center justify-around">
            <h2 className="text-xl font-semibold text-gray-800">
              Equipos registrados
            </h2>
            <div className="flex gap-3">
              <button type="button" className= ' bg-red-400 py-2 px-5 text-amber-50 rounded-2xl'>Pendientes</button>
              <button type="button"  className= 'bg-amber-500 py-2 px-5 text-amber-50 rounded-2xl'>En reparacion</button>
              <button type="button" className= 'bg-blue-400 py-2 px-5 text-amber-50 rounded-2xl'>Reparado</button>
              <button type="button" className= 'bg-green-600 py-2 px-5 text-amber-50 rounded-2xl'>Entregados</button>
            </div>
          </div>
          
          <CardProducto tipo='reparacion' />
         
        </div>
      </div>
    </div>
  );
};

export default ReparacionesTaller;
