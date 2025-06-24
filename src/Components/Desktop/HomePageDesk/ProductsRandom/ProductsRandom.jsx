import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../../context/CartContext";
import { useGhostModal } from "../../../../hooks/useGhostModal";
import ProductGhost from "../../ProductsDesk/ProductGhost";
import Toast from "../../Toast/Toast";
import useAuth from "../../../../hooks/useAuth";

import './ProductsRandom.css';



function ProductsRandom() {
    const { addToCart } = useCart();
    const { ghostProduct, ghostVisible, openGhost, closeGhost } = useGhostModal();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = useAuth();

    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

    const showToast = (message, type = "success") => {
        setToast({ visible: true, message, type });
    };

    const handleToastClose = () => {
        setToast((prev) => ({ ...prev, visible: false }));
    };

    useEffect(() => {
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        fetch(`${apiUrl}/products/random`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleAddToCart = (product) => {
        if (!user) {
            showToast("Debes iniciar sesión para agregar productos al carrito", "error");
            return;
        }
        if (product.hasSize) {
            openGhost(product);
        } else {
            addToCart(product._id, 1, null);
            showToast("Producto agregado al carrito", "success");
        }
    };

    return (
        <div className="listProductWidth">
            <div className="productsContainer">
                <h2>Algunos de nuestros Productos</h2>
                <div className="productListContainer">
                    {loading ? (
                        <p className="loadingProducts">Cargando...</p>
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

                <div className="seeMoreContainer">
                    <Link to={"/productos"} className="seeMoreLink">
                        Ver más productos
                    </Link>
                </div>

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
                    message={toast.message}
                    visible={toast.visible}
                    onClose={handleToastClose}
                    type={toast.type}
                />
            </div>
        </div>
    );
}

export default ProductsRandom;
