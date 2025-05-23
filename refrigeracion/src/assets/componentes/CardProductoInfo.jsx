import { Link, useParams, useNavigate } from "react-router-dom";

const CardProductoInfo = ({ rep }) => {
  const { id } = useParams();
  const navigate = useNavigate();
    
  const handleEliminar = () => {
    const confirmar = window.confirm("¿Estás seguro de eliminar este equipo?");
    if (!confirmar) return;
  
    // Determinar si es reparacion o instalacion
    const tipo = rep.tipo === "instalacion" ? "instalacion" : "reparacion";
  
    // Realizamos la solicitud DELETE
    fetch(`http://localhost:3000/${tipo}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          // Si la respuesta no es 2xx, lanzamos un error
          throw new Error("Error al eliminar. Por favor, revisa la conexión o el backend.");
        }
        // Si la respuesta es exitosa, podemos proceder
        return res.json();
      })
      .then(() => {
        // Si la eliminación fue exitosa, mostramos un mensaje
        alert("Equipo eliminado correctamente");
        // Redirigimos al listado
        navigate(`/${tipo}`); // O a la ruta donde están los equipos listados
      })
      .catch((err) => {
        // Si ocurrió un error, lo mostramos en consola
        console.error(err);
        alert("Hubo un error al intentar eliminar el equipo.");
      });
  };
  
  const LaBotonera = () => {
    return (
      <div className="flex gap-3">
        <Link
          className="bg-green-600 py-2 px-5 text-amber-50 rounded-2xl"
          to={`/editar/${id}`}
        >
          Editar{" "}
        </Link>
         <button
          onClick={handleEliminar}
          className="bg-rose-700 py-2 px-5 text-amber-50 rounded-2xl"
        >
          Eliminar
        </button>
      </div>
    );
  };

  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-gray-300 shadow-sm ">
      <p>
        <strong>Cliente:</strong> {rep.cliente}
      </p>
      <p>
        <strong>Domicilio:</strong> {rep.domicilio}
      </p>
      <p>
        <strong>Telefono:</strong> {rep.telefono}
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
        <strong className="text-amber-700">Fecha de Ingreso:</strong>{" "}
        {rep.fecha}
      </p>

      <p className="overflow-auto">
        <strong>Descripcion:</strong> {rep.descripcion}
      </p>

      <p>
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
      <p className="mb-2">
        <strong className="text-green-700">Fecha de Entrega:</strong>{" "}
        {rep.fechaEntrega}
      </p>
      <div>{LaBotonera()}</div>
    </div>
  );
};

export default CardProductoInfo;
