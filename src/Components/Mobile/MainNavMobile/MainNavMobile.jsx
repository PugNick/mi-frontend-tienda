import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import CategoriasMenuMobile from "./CategoriasMenuMobile/CategoriasMenuMobile";

import Burguer from '../../Desktop/Iconos/Hamburguesa';
import Close from '../../Desktop/Iconos/Close';
import Desplegar from '../../Desktop/Iconos/Desplegar';
import Ocultar from '../../Desktop/Iconos/Ocultar';

import './MainNavMobile.css';

function MainNavMobile() {
    const user = useAuth();
    const [mostrar, setMostrar] = useState(false);
    const [mostrarCategorias, setMostrarCategorias] = useState(false); // Nuevo estado

    useEffect(() => {
        if (mostrar) {
            document.body.classList.add('menu-open');
            document.documentElement.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
            document.documentElement.classList.remove('menu-open');
        }
        return () => {
            document.body.classList.remove('menu-open');
            document.documentElement.classList.remove('menu-open');
        };
    }, [mostrar]);

    return (
        <div className="NavContainerM">
            <div className="burguerB">
                <button onClick={() => setMostrar(true)}><Burguer /></button>
            </div>
            <div className={`menuContainerM ${mostrar ? "open" : ""}`}>
                <div className="flexColumnM">
                    <div className="buttonAndItems">
                        <div className="buttonCloseContM">
                            <button onClick={() => setMostrar(false)}><Close /></button>
                        </div>
                        <div className="itemsMenuContainerM">
                            <span>
                                <Link to="/" onClick={() => setMostrar(false)}>Inicio</Link>
                            </span>
                            <span style={{ display: "flex", alignItems: "center" }}>
                                <Link to="/productos" onClick={() => setMostrar(false)}>Productos</Link>
                                <button
                                    className="btnCategoriasMobile"
                                    style={{ marginLeft: 8 }}
                                    onClick={e => {
                                        e.preventDefault();
                                        setMostrarCategorias(!mostrarCategorias);
                                    }}
                                >
                                    {mostrarCategorias ? <Ocultar /> : <Desplegar />}
                                </button>
                            </span>
                            {mostrarCategorias && (
                                <div style={{ marginLeft: 20 }}>
                                    <CategoriasMenuMobile onClose={() => setMostrar(false)} />
                                </div>
                            )}
                            <span>
                                <Link to="/contacto" onClick={() => setMostrar(false)}>Contacto</Link>
                            </span>
                            <span>
                                <Link to="/comoComprar" onClick={() => setMostrar(false)}>Cómo Comprar</Link>
                            </span>
                            <span>
                                <Link to="/preguntasFrecuentes" onClick={() => setMostrar(false)}>Preguntas Frecuentes</Link>
                            </span>
                        </div>
                    </div>
                    <div className="linkLoginM">
                        {user ? (
                            <Link to="/perfil" onClick={() => setMostrar(false)}>{user.name}</Link>
                        ) : (
                            <Link to="/login" onClick={() => setMostrar(false)}>Iniciar Sesión</Link>
                        )}
                    </div>
                </div>
            </div>
            {/* Fondo oscuro opcional */}
            {mostrar && <div className="backdropM" onClick={() => setMostrar(false)}></div>}
        </div>
    );
}

export default MainNavMobile;