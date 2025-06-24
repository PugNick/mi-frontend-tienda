import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

import Vestire from '/imagenes/logos/LogosVestire/logotipo Vestire png.png';
import SearchBar from "../SearchBar/SearchBar";
import useAuth from "../../../hooks/useAuth";


import "./HeaderDesk.css";


function HeaderDesk() {
    const user = useAuth();
    const { cart } = useCart();

    const cartCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <div className="headerWidth">
            <div className="HeaderContainer">
                <div className="absolutePosition">
                    <Link to="/">
                        <div className="containerImgLogo">
                            <img src={Vestire} alt="Logo" />
                        </div>
                    </Link>
                </div>

                <div className="relativeSearchList">
                    <div className="searchBar">
                        <SearchBar />
                    </div>

                    <div className="linkLogin">
                        {user ? (
                            <Link to="/perfil">{user.name}</Link>
                        ) : (
                            <Link to="/login">Iniciar Sesión</Link>
                        )}
                    </div>

                    <div className="linkCart">
                        <Link to="/cart">
                            <div className="iconCartContainer">
                                <svg
                                    className="cartIcon"
                                    width='30'
                                    height='30'
                                    viewBox='0 0 576 512'
                                >
                                    <path d="M0 24C0 10.7 10.7 0 24 0L69.5 0c22 0 41.5 12.8 50.6 32l411 0c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3l-288.5 0 5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5L488 336c13.3 0 24 10.7 24 24s-10.7 24-24 24l-288.3 0c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5L24 48C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
                                </svg>
                            </div>
                            <div className={`amountCart${cartCount > 0 ? " show" : ""}`}>
                                {cartCount > 0 && (
                                    <span className="cartBadge">{cartCount}</span>
                                )}
                            </div>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    );
}

export default HeaderDesk;
