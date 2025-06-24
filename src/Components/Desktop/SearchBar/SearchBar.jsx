import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import { Link } from "react-router-dom";

import './SearchBar.css';

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [isListVisible, setIsListVisible] = useState(false); // Controlar la visibilidad del listado
    const searchBarRef = useRef(null); // Referencia al contenedor de la barra de búsqueda

    const buscarProductos = async (texto) => {
        if (texto.trim() === "") {
            setResults([]);
            return;
        }

        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        try {
            const res = await fetch(`${apiUrl}/products/search?query=${encodeURIComponent(texto)}`);
            const data = await res.json();
            setResults(data);
            setIsListVisible(true); // Mostrar el listado cuando hay resultados
        } catch (err) {
            console.error("Error al buscar productos:", err);
        }
    };

    const debouncedBuscar = useCallback(debounce(buscarProductos, 400), []);

    useEffect(() => {
        debouncedBuscar(query);
    }, [query, debouncedBuscar]);

    // Manejar clics fuera del componente
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBarRef.current && !searchBarRef.current.contains(event.target)) {
                setIsListVisible(false); // Ocultar el listado si se hace clic fuera
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Manejar selección de un producto
    const handleProductClick = () => {
        setIsListVisible(false); // Ocultar el listado al seleccionar un producto
        setQuery(""); // Opcional: limpiar el campo de búsqueda
    };

    return (
        // ...existing code...
        <div className="searchContainer" ref={searchBarRef}>
            <input
                className="searchInput"
                type="text"
                placeholder="Buscar"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsListVisible(true)}
            />

            <div className={`listSearch${isListVisible && query.trim() ? " visible" : ""}`}>
                {isListVisible && query.trim() && (
                    <>
                        <ul>
                            {results.map((producto) => (
                                <li key={producto._id}>
                                    <Link
                                        to={`/productDetail/${producto._id}`}
                                        onClick={handleProductClick}
                                        className="linkProduct"
                                    >
                                        <div className="linkContent">
                                            <div className="containerImgList">
                                                <img src={producto.image} alt="" loading="lazy" />
                                            </div>
                                            <div className="infoProduct">
                                                <p className="nameList">{producto.name}</p>
                                                <p className="priceList">${producto.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <Link
                            to={`/search?query=${encodeURIComponent(query)}`}
                            onClick={() => setIsListVisible(false)}
                            className="linkSeeAllResults"
                        >
                            <p className="allProducts">Ver todos los resultados</p>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchBar;