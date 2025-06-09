import { useState } from "react";
import NavBar from "../componentes/NavBar";
import { useNavigate } from "react-router-dom";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import "../css/login.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [mostrarClave, setMostrarClave] = useState(false);
  const [respuesta, setRespuesta] = useState();

  const navigate = useNavigate(); // ← hook de navegación

  const handleLogin = (e) => {
    e.preventDefault();
    Loading.dots(); // Muestra el loading

    fetch("http://localhost:5000/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: usuario, password: clave }),
    })
      .then((res) => {
        console.log(res); // Verifica la respuesta completa

        // Verificar si la respuesta fue exitosa
        if (!res.ok) {
          throw new Error("Error en la solicitud: " + res.statusText);
        }

        return res.json(); // Procesar la respuesta como JSON
      })
      .then((data) => {
        // Remover el loading al obtener la respuesta
        Notify.success(data.message);
        setTimeout(() => {
          navigate("/principal");
        }, 2000); // Verifica la respuesta JSON
        // Aquí puedes manejar la data como necesites (por ejemplo, guardar el token o redirigir)
      })
      .catch((err) => {
        setTimeout(() => {
          Loading.remove(); // Remover el loading en caso de error
          console.error("Ocurrió un error:", err); // Mostrar el error completo

          // Puedes mostrar un mensaje al usuario, por ejemplo:
          Notify.failure(
            "Hubo un problema al iniciar sesión. Inténtalo de nuevo."
          );
        },2000);
      });
  };

  return (
    <>
      <NavBar />
      <div className="pantalla flex items-center justify-center bg-gray-100 min-h-screen">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-emerald-300 shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">
            Iniciar Sesión
          </h2>

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative w-full mb-4">
            <input
              type={mostrarClave ? "text" : "password"}
              placeholder="Contraseña"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setMostrarClave(!mostrarClave)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 focus:outline-none"
              title={mostrarClave ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              {mostrarClave ? (
                // Ojo abierto (mostrar contraseña)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 3C5.454 3 1.73 6.42.458 10.26a.75.75 0 000 .48C1.73 13.58 5.455 17 10 17s8.27-3.42 9.542-7.26a.75.75 0 000-.48C18.27 6.42 14.546 3 10 3zm0 12c-3.184 0-6.024-2.407-7.177-5.25C3.976 7.407 6.816 5 10 5s6.024 2.407 7.177 5.25C16.024 12.593 13.184 15 10 15z" />
                  <path d="M10 7a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
              ) : (
                // Ojo cerrado (ocultar contraseña)
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5c-7 0-11 7-11 7s4 7 11 7 11-7 11-7-4-7-11-7zm0 10a3 3 0 110-6 3 3 0 010 6z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18"
                  />
                </svg>
              )}
            </button>
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
