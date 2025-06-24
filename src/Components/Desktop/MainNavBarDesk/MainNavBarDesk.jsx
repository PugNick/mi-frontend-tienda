import { Link, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import './MainNavBarDesk.css';
import MenuCateg from './CategoriasMenuDesk/CategoriasMenuDesk';

function MainNavBarDesk() {
    const [showMenu, setShowMenu] = useState(false);
    const hideTimeout = useRef(null);
    const location = useLocation();

    const handleMouseEnter = () => {
        clearTimeout(hideTimeout.current);
        setShowMenu(true);
    };

    const handleMouseLeave = () => {
        // Delay para evitar que desaparezca al mover rápido el mouse entre "Productos" y el menú
        hideTimeout.current = setTimeout(() => {
            setShowMenu(false);
        }, 200);
    };

    return (
        <div className="containerNavWidth">
            <nav className='navContainerDesk'>
                <div className="navContentWrapper">
                    <ul className='mainMenu'>
                        <li className={location.pathname === "/" ? "selected" : ""}>
                            <Link to="/">Inicio</Link>
                        </li>
                        <li
                            className={`linkProductsDesk${location.pathname.startsWith("/productos") ? " selected" : ""}`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Link to="/productos">Productos</Link>
                        </li>
                        <li className={location.pathname === "/contacto" ? "selected" : ""}>
                            <Link to="/contacto">Contacto</Link>
                        </li>
                        <li className={location.pathname === "/comoComprar" ? "selected" : ""}>
                            <Link to="/comoComprar">Cómo Comprar</Link>
                        </li>
                        <li className={location.pathname === "/preguntasFrecuentes" ? "selected" : ""}>
                            <Link to="/preguntasFrecuentes">Preguntas Frecuentes</Link>
                        </li>
                    </ul>

                    <div
                        className={`containerGhostCateg ${showMenu ? 'visible' : 'hidden'}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <MenuCateg />
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default MainNavBarDesk;
