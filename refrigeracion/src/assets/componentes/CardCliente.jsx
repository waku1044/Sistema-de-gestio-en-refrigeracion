import { Link, useNavigate } from "react-router-dom"; // Cambié useHistory por useNavigate
import { useState } from "react";
import { Report } from "notiflix/build/notiflix-report-aio"; // Asegúrate de tener este import
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { Confirm } from "notiflix";

const CardCliente = ({ props }) => {
  const cliente = props;
  const navigate = useNavigate(); // Usamos useNavigate para la navegación
  const [trabajos, setTrabajos ] = useState('');
  const id = cliente._id;
  const eliminarCliente = () => {
    console.log("ID a eliminar:", id);  // Verifica que este ID sea el correcto
    // Confirmación de eliminación con Notiflix
    Confirm.show(
      'Confirmar eliminación', 
      '¿Estás seguro de que deseas eliminar a este cliente?', 
      'Sí', 
      'No',
      () => {
        // Acción si el usuario confirma 
        
        fetch(`https://backend-refri.vercel.app/api/clientes/cliente/${id}`, {
          method: "DELETE",
        })
        .then((res) => {
          console.log('seccion 1: ',res);
          if (!res.ok) {
            // Si la respuesta no es 2xx, lanzamos un error
            throw new Error(
              "Error al eliminar. Por favor, revisa la conexión o el backend."
            );
          }
          // Si la respuesta es exitosa, podemos proceder
          return res.json();
        })
          .then((data) => {
            console.log('esta es la data: ',data)
            return 
            // if (data.success) {
            //  Report.success('Cliente eliminado', 'El cliente ha sido eliminado correctamente');
            //   // Redirige a la lista de clientes
            //   return navigate('/clientes'); // Usamos navigate para redirigir
            // } else {
            //  return  Report.failure('Error', 'Hubo un problema al eliminar el cliente!');
            // }
          })
          .catch((err) => {
            console.log(err);
            Report.failure('Error', 'Hubo un problema al eliminar el cliente.....');
          });
      },
      () => {} // Acción si el usuario cancela
    );
  };

  return (
    <div className="flex-col p-4 rounded-lg border border-gray-200 bg-gray-300 shadow-sm ">
      <div className="flex justify-between">
        <p className="capitalize">
          <strong>Cliente:</strong> {cliente.cliente}
        </p>
        <Link to={`/editarcliente/${cliente._id}`}>
          <FaEdit className="" /> {trabajos}
        </Link>
      </div>
      <p className="capitalize">
        <strong>Domicilio:</strong> {cliente.domicilio}
      </p>
      <p className="capitalize">
        <strong>Telefono:</strong> {cliente.telefono}
      </p>

      <div className="flex gap-3 flex-wrap mt-3">
        <Link
          className="bg-cyan-500 py-2 px-5 text-amber-50 rounded-2xl"
          to={`/editarcliente/${cliente._id}`}
        >
          <FaEdit className="" />
        </Link>{" "}
        <button
          className="bg-red-500 py-2 px-5 text-amber-50 rounded-2xl"
          onClick={eliminarCliente}
        >
          <FaTrash className="" />
        </button>
        <Link
          className="bg-emerald-800 py-2 px-5 text-amber-50 rounded-2xl"
          to={`/agregarequipo/${cliente._id}`}
        >
          <FaPlus className="" />
        </Link>
      </div>
    </div>
  );
};

export default CardCliente;
