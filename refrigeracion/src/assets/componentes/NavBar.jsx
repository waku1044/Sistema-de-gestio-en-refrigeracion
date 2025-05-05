import logo from "../imagenes/logoWaltech.png";
import { useState, useEffect} from "react";
import { Link } from 'react-router-dom';


function NavBar() {
  const [ingreso, setIngreso] = useState(false);

  useEffect(() => {
    const nombre = localStorage.getItem("nombre");
    console.log(nombre);
    if (!nombre == null) {
        setIngreso(true);
      
    } 
   
  });
  
  return (
    <nav className={ ingreso ? "bg-gray-800 py-3 flex items-center justify-between gap-[5rem]" : "bg-gray-800 py-3 flex items-center justify-center" }>
      <div>
        <img className="logo" src={logo} alt="Logo Waltech" />
      </div>
      <div>
        {ingreso ? (
            <ul className={ingreso ? "flex gap-5" : "flex gap-5"}>
                <Link className="text-blue-300 font-bold" to="/">Salir</Link>
                <Link className="text-blue-300 font-bold" to="/TipoTrabajo">Tipo de trabajo</Link>
            <Link ></Link>
            
          </ul>
        ) : (
            ''
        )}
      </div>
    </nav>
  );
}

export default NavBar;
