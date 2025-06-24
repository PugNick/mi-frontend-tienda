import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

import ProductGhost from "../../Desktop/ProductsDesk/ProductGhost";
import Toast from "../../Desktop/Toast/Toast";
import useAuth from "../../../hooks/useAuth";

import './ProductDetailMobile.css';
import '../../Desktop/ProductsDesk/ProductGhost.css'

function ProductDetailMobile() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { addToCart } = useCart();
    const touchStartX = useRef(null);
    const user = useAuth();

    const [ghostProduct, setGhostProduct] = useState(null);
    const [ghostVisible, setGhostVisible] = useState(false);

    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

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

        fetch(`${apiUrl}/products/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
            .catch(() => setProduct(null));

        // Obtener productos relacionados
        fetch(`${apiUrl}/products/${id}/related`)
            .then(res => res.json())
            .then(data => setRelatedProducts(data))
            .catch(() => setRelatedProducts([]));
    }, [id]);

    if (!product) return <p className="loading">Cargando detalles del producto...</p>;

    const images = [product.image, ...(product.additionalImages || [])].filter(
        (img, idx, arr) => arr.indexOf(img) === idx
    );

    // Swipe handlers en bucle
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        if (touchEndX - touchStartX.current > 50) {
            setCurrentIndex(i => (i === 0 ? images.length - 1 : i - 1));
        } else if (touchStartX.current - touchEndX > 50) {
            setCurrentIndex(i => (i === images.length - 1 ? 0 : i + 1));
        }
        touchStartX.current = null;
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        if (value === "") {
            setQuantity("");
        } else {
            const num = parseInt(value, 10);
            if (!isNaN(num)) {
                setQuantity(num);
            }
        }
    };

    // Agregar al carrito producto principal
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

    // Agregar al carrito producto relacionado
    const handleAddToCartRelated = (relatedProduct) => {
        if (!user) {
            showToast("Debes iniciar sesión para agregar productos al carrito", "error");
            return;
        }
        if (relatedProduct.hasSize) {
            setGhostProduct(relatedProduct);
            setGhostVisible(true);
        } else {
            addToCart(relatedProduct._id, 1, null);
            showToast("¡Producto agregado al carrito!", "success");
        }
    };

    const closeGhost = () => {
        setGhostVisible(false);
        setGhostProduct(null);
    };

    return (
        <div className="productDetailMobileContainer">
            {/* Carrusel de imagen grande */}
            <div
                className="mainImageMobile"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
            >
                <img
                    src={images[currentIndex]}
                    alt={product.name}
                    className="mainImageMobileImg"
                />
            </div>
            <div className="carouselIndicators">
                {images.map((_, idx) => (
                    <span
                        key={idx}
                        className={`carouselDot${currentIndex === idx ? " active" : ""}`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>

            {/* Info y acciones */}
            <div className="infoMobile">
                <h2>{product.name}</h2>
                <p className="priceMobile">${product.price}</p>
                {product.hasSize && (
                    <div className="sizesMobile">
                        <div className="talleContianer">
                            <span>Talle: </span>
                            <span className="importantText">{selectedSize}</span>
                        </div>
                        <div className="buttonSizeMobile">
                            {product.availableSizes.map(size => (
                                <button
                                    key={size}
                                    className={`sizeButtonMobile${selectedSize === size ? " selected" : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="quantityMobile">
                    <label htmlFor="quantityMobile">Cantidad</label>
                    <input
                        id="quantityMobile"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={handleQuantityChange}
                    />
                </div>
                <button
                    className="addToCartMobile"
                    onClick={handleAddToCart}
                >
                    Agregar al carrito
                </button>
                <div className="descriptionMobile">
                    <span className="descriptionTitleMobile">Descripción:</span>
                    <p>{product.description}</p>
                </div>
            </div>

            {/* Productos relacionados */}
            <div className="productosRelacionados">
                <h2 className="titleMobileRelatedProducts">Productos relacionados</h2>
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
                            <button onClick={() => handleAddToCartRelated(relatedProduct)}>
                                Agregar al carrito
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            {ghostProduct && (
                <div className="ghostOverlay">
                    <ProductGhost
                        product={ghostProduct}
                        onClose={closeGhost}
                        showToast={showToast}
                        visible={ghostVisible}
                    />
                </div>
            )}
            <Toast
                message={toastMessage}
                visible={toastVisible}
                onClose={() => setToastVisible(false)}
                type={toastType}
            />
        </div>
    );
}

export default ProductDetailMobile;