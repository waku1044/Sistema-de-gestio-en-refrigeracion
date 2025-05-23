import { Link } from 'react-router-dom';
import useState from 'react';


const CardProducto = ({ rep, onActualizarEstado }) => {

  
  
  const combinacionDeBotones = () => {
    switch (rep.estado) {
      case "Pendiente":
        return (
          <button
            className="bg-amber-500 py-2 px-5 text-amber-50 rounded-2xl"
            onClick={() => onActualizarEstado(rep.id, "En reparación")}
          >
            En reparación
          </button>
        );

      case "En reparación":
        return (
          
            <button
              className="bg-blue-600 py-2 px-5 text-amber-50 rounded-2xl"
              onClick={() => onActualizarEstado(rep.id, "Reparado")}
            >
              Reparado
            </button>
            
          
        );

      case "Reparado":
        return (
          <button
            className="bg-green-600 py-2 px-5 text-amber-50 rounded-2xl"
            onClick={() => onActualizarEstado(rep.id, "Entregado")}
          >
            Entregar a Cliente
          </button>
        );

      case "Entregado":
        return (<Link
        className="bg-emerald-500 py-2 px-5 font-bold text-amber-50 rounded-2xl"
        to={`/info/${rep.id}`}
      >
        Info
      </Link>
    );

      default:
        return null;
    }
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
        <strong className='text-amber-700'>Fecha de Ingreso:</strong> {rep.fecha}
      </p>

      <p className="overflow-auto">
        <strong>Descripcion:</strong> {rep.descripcion}
      </p>

      <p >
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
        <strong className='text-green-700'>Fecha de Entrega:</strong> {rep.fechaEntrega}
      </p>
      <div className="flex gap-3 flex-wrap">{combinacionDeBotones()}</div>
    </div>
  );
};

export default CardProducto;
