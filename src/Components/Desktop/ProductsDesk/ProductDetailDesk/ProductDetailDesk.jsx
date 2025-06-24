import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from '../../../../context/CartContext';
import { useGhostModal } from "../../../../hooks/useGhostModal";

import useScreenSize from "../../../../hooks/UseScreenSize";
import ProductDetailMobile from '../../../Mobile/ProductDetail/ProductDetailMobile';

import HeaderAndNav from "../../HeaderAndNav/HeaderAndNav";
import Footer from "../../Footer/Footer";
import ProductGhost from "../ProductGhost";
import Toast from '../../Toast/Toast';
import useAuth from "../../../../hooks/useAuth";

import './ProductDetail.css';

function ProductDetailDesk() {
    const { id } = useParams(); // Obtener el ID del producto desde la URL
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]); // Productos relacionados
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(""); // Imagen principal
    const [visibleStartIndex, setVisibleStartIndex] = useState(0); // Índice inicial visible
    const maxVisibleThumbnails = 4; // Número máximo de miniaturas visibles
    const [selectedSize, setSelectedSize] = useState(""); // Talle seleccionado
    const [quantity, setQuantity] = useState(1); // Cantidad seleccionada
    const { addToCart } = useCart(); // Hook para el carrito
    const { ghostProduct, ghostVisible, openGhost, closeGhost } = useGhostModal();
    const user = useAuth();

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const width = useScreenSize();

    const showToast = (msg, type = "success") => {
        setToastMessage(msg);
        setToastType(type);
        setToastVisible(true);
    };

    useEffect(() => {
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        // Obtener el producto actual
        fetch(`${apiUrl}/products/${id}`)
            .then(response => response.json())
            .then(data => {
                setProduct(data);
                setMainImage(data.image); // Establecer la imagen principal inicial
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product details:', error);
                setLoading(false);
            });

        // Obtener productos relacionados
        fetch(`${apiUrl}/products/${id}/related`)
            .then(response => response.json())
            .then(data => setRelatedProducts(data))
            .catch(error => console.error('Error fetching related products:', error));
    }, [id]);

    if (loading) return <p className="loading">Cargando detalles del producto...</p>;
    if (!product) return <p className="errorProductNotFound">Producto no encontrado</p>;

    // Función para desplazarse hacia arriba o a la izquierda en la galería
    const handleScrollUpOrLeft = () => {
        if (visibleStartIndex > 0) {
            setVisibleStartIndex(visibleStartIndex - 1);
        }
    };

    // Función para desplazarse hacia abajo o a la derecha en la galería
    const handleScrollDownOrRight = () => {
        if (visibleStartIndex + maxVisibleThumbnails < product.additionalImages.length) {
            setVisibleStartIndex(visibleStartIndex + 1);
        }
    };

    // Manejar la selección de un talle
    const handleSizeSelection = (size) => {
        setSelectedSize(size);
    };

    // Manejar la cantidad ingresada
    const handleQuantityChange = (e) => {
        const value = e.target.value;
        // Permite vacío para que el usuario pueda borrar y escribir
        if (value === "") {
            setQuantity("");
        } else {
            // Solo acepta números mayores o iguales a 1
            const num = parseInt(value, 10);
            if (!isNaN(num)) {
                setQuantity(num);
            }
        }
    };

    // Agregar al carrito
    const handleAddToCart = () => {
        if (!user) {
            showToast("Debes iniciar sesión para agregar productos al carrito", "error");
            return;
        }
        if (product.hasSize && !selectedSize) {
            showToast("Por favor, selecciona un talle.", "error");
            return;
        }
        if (!quantity || quantity < 1) {
            showToast("La cantidad debe ser al menos 1.", "error");
            return;
        }
        addToCart(product._id, quantity, selectedSize || null);
        showToast("¡Producto agregado al carrito!", "success");
    };

    const handleAddToCartRelated = (product) => {
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



    if (width < 1300) {
        return (
            <>
                <HeaderAndNav />
                <ProductDetailMobile />
                <Footer />
            </>
        );
    }
    return (
        <div>
            <HeaderAndNav />
            <div className="containerWidthProductDetail">
                <div className="productDetailMain">
                    <div className="productDetailContainer">
                        <div className="imgsDescription">
                            <div className="flexImages">
                                {/* Galería de imágenes adicionales con botones */}
                                {product.additionalImages.length > 0 && (
                                    <div className="imageGalleryWithButtons">
                                        <button
                                            className="scrollButton upThumbnail"
                                            onClick={handleScrollUpOrLeft}
                                            disabled={visibleStartIndex === 0}
                                        >
                                            🢁
                                        </button>
                                        <div
                                            className={`imageGallery ${window.innerWidth <= 768 ? "horizontal" : ""
                                                } translate${window.innerWidth <= 768 ? "X" : "Y"}-${visibleStartIndex}`}
                                        >
                                            {product.additionalImages.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={img}
                                                    alt={`${product.name} ${index + 1}`}
                                                    className={`thumbnail ${mainImage === img ? "selected" : ""}`}
                                                    onClick={() => setMainImage(img)} // Cambiar la imagen principal al hacer clic
                                                />
                                            ))}
                                        </div>
                                        <button
                                            className="scrollButton down"
                                            onClick={handleScrollDownOrRight}
                                            disabled={visibleStartIndex + maxVisibleThumbnails >= product.additionalImages.length}
                                        >
                                            🢃
                                        </button>
                                    </div>
                                )}
                                {/* Imagen principal */}
                                <div className="mainImage">
                                    <img src={mainImage} alt={product.name} />
                                </div>
                            </div>
                            <div className="descriptionContainer">
                                <span className="descriptionProduct">Descripción: {product.description}</span>
                            </div>
                        </div>
                        <div className="productBuy">
                            <h2>{product.name}</h2>
                            <p className="priceDetail">${product.price}</p>

                            {/* Talles (si aplica) */}
                            {product.hasSize && (
                                <div className="talle">
                                    <div className="talleContainer">
                                        <span>Talle: </span>
                                        <span className="importantText">{selectedSize}</span>
                                    </div>
                                    <div className="sizeButtons">
                                        {product.availableSizes.map((size) => (
                                            <button
                                                key={size}
                                                className={`sizeButton ${selectedSize === size ? "selected" : ""}`}
                                                onClick={() => handleSizeSelection(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Cantidad */}
                            <div className="cantidad">
                                <label htmlFor="quantity">Cantidad</label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                />
                            </div>

                            {/* Botón para agregar al carrito */}
                            <div className="addToCart">
                                <button onClick={handleAddToCart}>
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="productosRelacionados">
                        <h2>Productos relacionados</h2>
                        <div className="productListContainer">
                            {relatedProducts.map((relatedProduct) => (
                                <div key={relatedProduct._id} className="productCard">
                                    <Link
                                        to={`/productDetail/${relatedProduct._id}`}
                                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    >
                                        <div className="cardContainer">
                                            <div className="containerImgCard">
                                                <img src={relatedProduct.image} alt={relatedProduct.name} />
                                                <div className="overlay"></div>
                                            </div>
                                            <h3>{relatedProduct.name}</h3>
                                        </div>
                                    </Link>
                                    <p>Precio: ${relatedProduct.price}</p>
                                    <button onClick={() => handleAddToCartRelated(relatedProduct)}>Agregar al carrito</button>
                                </div>
                            ))}
                        </div>
                    </div>
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

export default ProductDetailDesk;
