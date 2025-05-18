import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import NavBar from "../componentes/NavBar";

const Editar = () => {
  const [equipo, setEquipo] = useState({});
  const [errorData, setErrorData] = useState({});
  const { id } = useParams();
  const [tipo, setTipo] = useState();

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
        .then((data) => {
          setEquipo(data);
          setTipo("reparacion");
        }) // Si la petición es exitosa, actualizamos el estado
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
              .then((data) => {
                setTipo("instalacion");
                setEquipo(data);
              }) // Si la segunda petición es exitosa, actualizamos el estado
              .catch((err) => {
                // Si ambas peticiones fallan, mostramos un error
                setError("Error al cargar el equipo.");
                console.error("Error al cargar el equipo:", err);
              });
          } else {
            // Si la petición falla por algún otro motivo
            setError("Hubo un problema al cargar la información.");
          }
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Limpiar el error cuando el campo se complete
    if (value) {
      setErrorData((prev) => ({ ...prev, [name]: "" }));
    }

    setEquipo((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    const errores = {};

    if (!equipo.cliente?.trim()) errores.cliente = "El cliente es obligatorio";
    if (!equipo.domicilio?.trim())
      errores.domicilio = "El domicilio es obligatorio";
    if (!equipo.telefono?.toString().trim())
      errores.telefono = "El teléfono es obligatorio";
    if (!equipo.tipo?.trim()) errores.tipo = "El tipo es obligatorio";
    if (!equipo.marca?.trim()) errores.marca = "La marca es obligatoria";
    if (!equipo.falla?.trim()) errores.falla = "La falla es obligatoria";
    if (!equipo.fecha?.trim()) errores.fecha = "La fecha es obligatoria";
    if (!equipo.descripcion?.trim())
      errores.descripcion = "La descripción es obligatoria";
    if (!equipo.fechaEntrega?.trim())
      errores.fechaEntrega = "La fecha de entrega es obligatoria";

    return errores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errores = validarCampos();
    setErrorData(errores);

    if (Object.keys(errores).length > 0) {
      Notify.failure("Hay errores en el formulario");
      return;
    }

    // Si no hay errores, hacer una petición PUT
    Notify.success("Formulario válido. Puedes enviar los cambios.");
    fetch(`http://localhost:3000/${tipo}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(equipo),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error al actualizar");
        }
        return res.json();
      })
      .then((data) => {
        Notify.success("Equipo actualizado correctamente");
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error("Error en la actualización:", error);
        Notify.failure("Hubo un problema al actualizar");
      });
  };

  return (
    <>
    <NavBar activo={true} tipo="info" />
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto  bg-cyan-100 p-8 rounded-xl shadow space-y-6"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Equipo para Editar
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative my-3">
            <input
              name="cliente"
              placeholder="Cliente"
              value={equipo.cliente}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500  text-sm absolute bottom-[-18px] left-5 ">
              {errorData.cliente && errorData.cliente}
            </span>
          </div>

          <div className="relative my-3">
            <input
              name="domicilio"
              placeholder="Domicilio"
              value={equipo.domicilio}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.domicilio && errorData.domicilio}
            </span>
          </div>

          <div className="relative my-3">
            <input
              type="number"
              name="telefono"
              placeholder="Telefono"
              value={equipo.telefono}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.telefono && errorData.telefono}
            </span>
          </div>

          <div className="relative my-3">
            <input
              name="tipo"
              placeholder="Tipo"
              value={equipo.tipo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.tipo && errorData.tipo}
            </span>
          </div>

          <div className="relative my-3">
            <input
              name="marca"
              placeholder="Marca"
              value={equipo.marca}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.marca && errorData.marca}
            </span>
          </div>

          <div className="relative my-3">
            <input
              name="falla"
              placeholder="Falla"
              value={equipo.falla}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.falla && errorData.falla}
            </span>
          </div>

          <div className="relative my-3">
            <input
              name="fecha"
              type="date"
              value={equipo.fecha}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.fecha && errorData.fecha}
            </span>
          </div>
          <div className="relative my-3">
            <input
              name="fechaEntrega"
              type="date"
              value={equipo.fechaEntrega}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200"
            />
            <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
              {errorData.fechaEntrega && errorData.fechaEntrega}
            </span>
          </div>
        </div>

        <div className="relative my-3">
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={equipo.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition duration-200 "
            rows={3}
          />
          <span className="text-red-500 text-sm absolute bottom-[-18px] left-5">
            {errorData.descripcion && errorData.descripcion}
          </span>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white mt-5 py-2 px-6 rounded hover:bg-blue-700 transition"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </>
  );
};

export default Editar;
