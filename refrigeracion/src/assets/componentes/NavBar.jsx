import logo from "../imagenes/logoWaltech.png";
import {  useState, useEffect} from "react";
import { Link } from 'react-router-dom';


function NavBar(props) {
  const [ingreso, setIngreso] = useState(props.activo);

  
  
  return (
    <nav className={ ingreso ? "bg-gray-800 py-3 flex items-center justify-between gap-[5rem]" : "bg-gray-800 py-3 flex items-center justify-center" }>
      <div>
        <img className="logo" src={logo} alt="Logo Waltech" />
      </div>
      <div>
        {ingreso ? (
            <ul className={ingreso ? "flex gap-5" : ""}>
                <li><Link className="text-blue-300 font-bold" to="/">Salir</Link></li>
                <li><Link className="text-blue-300 font-bold" to="/TipoTrabajo">Tipo de trabajo</Link></li>
            
            
          </ul>
        ) : (
            ''
        )}
      </div>
    </nav>
  );
}

export default NavBar;
