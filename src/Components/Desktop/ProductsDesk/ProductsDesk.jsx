import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useGhostModal } from '../../../hooks/useGhostModal';


import Footer from '../Footer/Footer';
import HeaderAndNav from '../HeaderAndNav/HeaderAndNav';
import ProductGhost from './ProductGhost';
import Toast from '../Toast/Toast';
import useAuth from '../../../hooks/useAuth';


import './ProductsDesk.css';

function ProductsDesk() {
    const { addToCart } = useCart();
    const { ghostProduct, ghostVisible, openGhost, closeGhost } = useGhostModal();
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const user = useAuth();


    const [searchParams, setSearchParams] = useSearchParams();
    const pageFromURL = parseInt(searchParams.get('page')) || 1;
    const [currentPage, setCurrentPage] = useState(pageFromURL);


    //estado para mensaje y tipo de toast
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    //función para mostrar el toast con mensaje y tipo
    const showToast = (msg, type = "success") => {
        setToastMessage(msg);
        setToastType(type);
        setToastVisible(true);
    };

    useEffect(() => {
        const page = parseInt(searchParams.get('page')) || 1;
        setCurrentPage(page);
    }, [searchParams]);

    useEffect(() => {
        setLoading(true);
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        fetch(`${apiUrl}/products/paginated?page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                setProducts(data.products);
                setTotalPages(data.totalPages);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching paginated products:", error);
                setLoading(false);
            });

        // Scroll al top al cambiar de página
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [currentPage]);

    const goToPage = (page) => {
        setSearchParams({ page });
    };

    // Mostrar el modal con animación
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
        <div className='ProductAndNavContainer'>
            <HeaderAndNav />
            <div className="listProductWidth">
                <div className="productListContainer">
                    {loading ? (
                        <p className='loading'>Cargando...</p>
                    ) : (
                        products.map(product => (
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
                    )}
                </div>
            </div>

            {/* PAGINACIÓN */}
            <div className="buttonsWidth">
                <div className="paginationButtons">
                    <button
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="arrowBtn"
                    >
                        <svg className="arrowIcon left" width="24" height="24" viewBox="0 0 448 512">
                            <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
                        </svg>
                    </button>
                    <span>Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className='arrowBtn'
                    >
                        <svg className='arrowIcon' width="24" height="24" viewBox="0 0 448 512">
                            <path d='M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z' />
                        </svg>
                    </button>
                </div>
            </div>

            {/* GHOST MODAL */}
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

export default ProductsDesk;


