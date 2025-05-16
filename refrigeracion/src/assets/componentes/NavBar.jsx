import logo from "../imagenes/logoWaltech.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NavBar(props) {
  const [ingreso, setIngreso] = useState(props.activo);
  const [tipo, setTipo] = useState(props.tipo);

  return (
    <nav
      className={
        ingreso
          ? "bg-gray-800 py-3 flex items-center justify-around gap-[5rem]"
          : "bg-gray-800 py-3 flex items-center justify-center"
      }
    >
      <div>
        <img className="logo" src={logo} alt="Logo Waltech" />
      </div>
      <div>
        {ingreso ? (
          <ul className={ingreso ? "flex gap-3" : ""}>
            <li>
              <Link
                className="text-blue-300 font-bold hover:text-emerald-300"
                to="/"
              >
                Salir
              </Link>
            </li>
            <li>
              {tipo === "reparacion" ? (
                <div className="flex gap-3">
                  <Link
                    className="text-blue-300 font-bold hover:text-emerald-300"
                    to="/instalacion"
                  >
                    Instalacion
                  </Link>

                  <Link
                    className="text-blue-300 font-bold hover:text-emerald-300"
                    to="/buscador"
                  >
                    Buscador
                  </Link>
                </div>
              ) : tipo === "instalacion" ? (
                <div className="flex gap-3">
                  <Link
                    className="text-blue-300 font-bold hover:text-emerald-300"
                    to="/reparacion"
                  >
                    Reparacion
                  </Link>
                  <Link
                    className="text-blue-300 font-bold hover:text-emerald-300"
                    to="/buscador"
                  >
                    Buscador
                  </Link>
                </div>
              ) : tipo === "info" ? (
                <Link
                  className="text-blue-300 font-bold hover:text-emerald-300"
                  to="/principal"
                >
                  Principal
                </Link>
              ) : tipo === "buscador" ? (
                <Link
                  className="text-blue-300 font-bold hover:text-emerald-300"
                  to="/buscador"
                >
                  Buscador
                </Link>
              ) : (
                ""
              )}
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
}

export default NavBar;
