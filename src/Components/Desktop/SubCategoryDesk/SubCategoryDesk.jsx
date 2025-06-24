import { useEffect, useState } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useGhostModal } from "../../../hooks/useGhostModal";

import './SubCategoryDesk.css';

import HeaderAndNav from "../HeaderAndNav/HeaderAndNav";
import ProductGhost from '../ProductsDesk/ProductGhost';
import Footer from '../Footer/Footer';
import Toast from '../Toast/Toast';
import useAuth from "../../../hooks/useAuth";

function SubCategoryView() {
    const { category, subcategory } = useParams();
    const { ghostProduct, ghostVisible, openGhost, closeGhost } = useGhostModal();
    const { addToCart } = useCart();
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const user = useAuth();

    // Estado para el toast
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");


    // Paginación con search params
    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromURL = parseInt(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);

    useEffect(() => {
        const page = parseInt(searchParams.get('page')) || 1;
        setCurrentPage(page);
    }, [searchParams]);

    // Obtener productos de la subcategoría con paginación
    useEffect(() => {
        setLoading(true);
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        fetch(`${apiUrl}/products/category/${category}/subcategory/${subcategory}?page=${currentPage}&limit=20`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data.products);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error al obtener productos por subcategoría:", error);
                setLoading(false);
            });
    }, [category, subcategory, currentPage]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    // Cambiar de página
    const goToPage = (page) => {
        setSearchParams({ page });
    };

    // Función para mostrar el toast
    const showToast = (msg, type = "success") => {
        setToastMessage(msg);
        setToastType(type);
        setToastVisible(true);

    };

    // Manejar la acción de agregar al carrito
    const handleAddToCart = (product) => {
        if (!user) {
            showToast("Debes iniciar sesión para agregar productos al carrito", "error");
            return;
        }
        if (product.hasSize) {
            openGhost(product);
        } else {
            addToCart(product._id, 1, null);
            showToast("¡Producto agregado al carrito!", "success");
        }
    };

    return (
        <div className="ProductAndNavContainer">
            <HeaderAndNav />

            <div className="listProductWidth">
                <div className="productListContainer">
                    {loading ? (
                        <p className="loading">Cargando...</p>
                    ) : (
                        products.length > 0 ? (
                            products.map((product) => (
                                <div key={product._id} className="productCard">
                                    <Link to={`/productDetail/${product._id}`}>
                                        <div className="cardContainer">
                                            <div className="containerImgCard">
                                                <img src={product.image} alt={product.name} />
                                                <div className="overlay"></div>
                                            </div>
                                            <h3>{product.name}</h3>
                                        </div>
                                    </Link>
                                    <p>${product.price}</p>
                                    <button onClick={() => handleAddToCart(product)}>Agregar al carrito</button>
                                </div>
                            ))
                        ) : (
                            <div className="notFound">
                                <p>No hay productos disponibles en esta subcategoría.</p>
                            </div>
                        )
                    )}
                </div>
            </div>

            {/* Paginación */}
            <div className="buttonsWidth">
                <div className="paginationButtons">
                    <button
                        className="arrowBtn"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <svg className="arrowIcon left" width="24" height="24" viewBox="0 0 448 512">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        className="arrowBtn"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <svg className='arrowIcon' width="24" height="24" viewBox="0 0 448 512">
                            <path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z' />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Modal para productos con tallas */}
            {ghostProduct && (
                <div className={`ghostOverlay ${ghostVisible ? "slideDown" : "slideUp"}`}>
                    <ProductGhost
                        product={ghostProduct}
                        onClose={closeGhost}
                        showToast={showToast}
                    />
                </div>
            )}
            <Toast
                message={toastMessage}
                visible={toastVisible}
                onClose={() => setToastVisible(false)}
                type={toastType}
            />
            <Footer />
        </div>
    );
}

export default SubCategoryView;