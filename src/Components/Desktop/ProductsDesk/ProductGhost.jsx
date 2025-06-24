import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import PropTypes from "prop-types";

import "./ProductGhost.css";

function ProductGhost({ product, onClose, showToast, visible = true }) {
    const [selectedSize, setSelectedSize] = useState('');
    const [hiding, setHiding] = useState(false);
    const [showing, setShowing] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        if (visible) {
            setHiding(false);
            setShowing(false);
            // Espera un tick para activar la animación de entrada
            setTimeout(() => setShowing(true), 10);
        }
    }, [visible]);

    // Cierra con animación
    const handleClose = () => {
        setHiding(true);
        setShowing(false);
        setTimeout(() => {
            setHiding(false);
            onClose();
        }, 400);
    };

    if (!visible && !hiding) return null;

    if (!visible && !hiding) return null;

    // Manejar la cantidad ingresada
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

    const handleConfirm = () => {
        if (product.hasSize && !selectedSize) {
            if (showToast) showToast("Seleccioná un talle antes de continuar", "error");
            return;
        }
        if (!quantity || quantity < 1) {
            if (showToast) showToast("La cantidad debe ser al menos 1", "error");
            return;
        }
        addToCart(product._id, quantity, product.hasSize ? selectedSize : null);
        if (showToast) showToast("¡Producto agregado al carrito!", "success");
        handleClose(); // Usar animación al cerrar
    };

    return (
        <div className={`productGhostContainer${hiding ? " slideUp" : showing ? " slideDown" : ""}`}>
            <div className="containerCloseButton">
                <button className="closeButton" onClick={handleClose}>
                    <svg
                        className="xClose"
                        height='24px'
                        width='24px'
                        viewBox="0 0 384 512"
                    >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                </button>
            </div>
            <div className="centerImgContainer">
                <div className="imgContainerGhost">
                    <img src={product.image} alt={product.name} />
                </div>
            </div>
            <div className="descriptionContainerGhost">
                <div className="namePriceGhost">
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                </div>
                {product.hasSize && (
                    <div className="talleModal">
                        <label>Seleccioná un talle</label>
                        <div className="sizeButtonsModal">
                            {product.availableSizes.map((size) => (
                                <button
                                    key={size}
                                    className={`sizeButtonModal ${selectedSize === size ? "selected" : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                    type="button"
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <div className="amountCart">
                    <div className="amountInput">
                        <span>Cantidad:</span>
                        <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={handleQuantityChange}
                        />
                    </div>
                    <button onClick={handleConfirm}>Agregar al carrito</button>
                </div>
                <div className="detailsContainerA">
                    <Link
                        to={`/productDetail/${product._id}`}
                        onClick={() => {
                            handleClose();
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                    >
                        Ver detalles
                    </Link>
                </div>
            </div>
        </div>
    );
}

ProductGhost.propTypes = {
    product: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        availableSizes: PropTypes.arrayOf(PropTypes.string).isRequired,
        hasSize: PropTypes.bool.isRequired,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    showToast: PropTypes.func,
    visible: PropTypes.bool,
};

export default ProductGhost;