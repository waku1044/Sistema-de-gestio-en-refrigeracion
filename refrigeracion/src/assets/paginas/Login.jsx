import { useState } from "react";
import NavBar from "../componentes/NavBar";
import { useNavigate } from "react-router-dom"; // ← importar
import '../css/login.css'

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate(); // ← hook de navegación

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === "walter" && clave === "wakute1044") {
      alert("Bienvenido, Walter 👋");
      // Aquí podrías redirigir o guardar sesión
      navigate("/principal"); // ← redirige a /principal
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <>
      <NavBar />
      <div className="pantalla flex items-center justify-center bg-gray-100">
        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>

          <input
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

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
