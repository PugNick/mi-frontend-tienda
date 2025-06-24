import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { useNavigate, Link } from "react-router-dom";

import HeaderAndNav from "../HeaderAndNav/HeaderAndNav";
import Footer from "../Footer/Footer";
import ModalConfirmacion from "../Modal/ModalConfirmacion";
import Toast from "../Toast/Toast";

import Minus from '../Iconos/Minus';
import Plus from '../Iconos/Plus';

import './Cart.css';

function CartDesk() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    const navigate = useNavigate();

    // Cargar el método de envío desde localStorage si existe
    const [shippingMethod, setShippingMethod] = useState(localStorage.getItem("shippingMethod") || "");
    const [modalVisible, setModalVisible] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    // Estado para el toast
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const showToast = (msg, type = "success") => {
        setToastMessage(msg);
        setToastType(type);
        setToastVisible(true);
    };


    const totalPrice = cart?.items?.reduce((acc, item) => acc + (item.product?.price || 0) * item.quantity, 0) || 0;

    useEffect(() => {
        // Guardar el método de envío en localStorage cuando cambie
        localStorage.setItem("shippingMethod", shippingMethod);
    }, [shippingMethod]);

    const handleCheckout = () => {
        if (!cart?.items?.length) {
            showToast("Tu carrito está vacío.", "error");
            return;
        }
        if (!shippingMethod) {
            showToast("Selecciona un método de envío.", "error");
            return;
        }

        // Scroll al top antes de navegar
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Redirige al usuario según la opción seleccionada
        const routes = {
            domicilio: "/checkout/domicilio",
            "punto-retiro": "/checkout/puntoRetiro",
            local: "/checkout/local",
        };

        navigate(routes[shippingMethod]);
    };

    return (
        <div>
            <HeaderAndNav />
            <div className="cartContainerWidth">
                <div className="cartContainer">
                    <h2>Carrito</h2>
                    {cart?.items?.length > 0 ? (
                        cart.items.map((item, index) => (
                            <div key={item.product?._id || index} className="itemsContainer">
                                <div className="cartItem">
                                    <div className="itemFlex">
                                        <div className="productImgContainer">
                                            <img src={item.product?.image} alt={item.product?.name} />
                                        </div>
                                        <div className="detailButton">
                                            <div className="cartDetails">
                                                <h4>{item.product?.name}</h4>
                                                <p>Precio: ${item.product?.price}</p>
                                                {item.size && <p>Talle: {item.size}</p>} {/* Mostrar el talle si existe */}
                                                <div className="amountContainer">

                                                    <span>Cantidad:</span>
                                                    <div className="buttonsContainer">
                                                        <button
                                                            className="minusButton"
                                                            onClick={() => decreaseQuantity(item.product._id, item.size)} // Pasar también el size
                                                            disabled={item.quantity === 1}
                                                        >
                                                            <Minus />
                                                        </button>
                                                        <span>{item.quantity}</span>
                                                        <button
                                                            className="plusButton"
                                                            onClick={() => increaseQuantity(item.product._id, item.size)} // Pasar también el size
                                                        >
                                                            <Plus />
                                                        </button>
                                                    </div>

                                                </div>
                                            </div>
                                            <button
                                                className="removeButton"
                                                onClick={() => {
                                                    setItemToDelete({ id: item.product._id, size: item.size });
                                                    setModalVisible(true);
                                                }}
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="carritoVacio">El carrito está vacío</p>
                    )}
                    <div className="cartTotal">
                        <h3>Total: ${totalPrice.toFixed(2)}</h3>
                    </div>

                    {/* Método de envío */}
                    <div className="selectorShipp">
                        <h3>Seleccioná un Método</h3>

                        <label className="radio-label">
                            <input
                                type="radio"
                                name="shipping"
                                value="domicilio"
                                checked={shippingMethod === "domicilio"}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                className="radio-domicilio"
                            />
                            Envío a domicilio
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                name="shipping"
                                value="punto-retiro"
                                checked={shippingMethod === "punto-retiro"}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                className="radio-punto"
                            />
                            Punto de Retiro
                        </label>

                        <label className="radio-label">
                            <input
                                type="radio"
                                name="shipping"
                                value="local"
                                checked={shippingMethod === "local"}
                                onChange={(e) => setShippingMethod(e.target.value)}
                                className="radio-local"
                            />
                            Retiro en Local
                        </label>
                    </div>


                    <div className="buttonsBuyKeep">
                        <button className="buyCart" onClick={handleCheckout}>Iniciar Compra</button>
                        <Link to="/productos">Agregar más productos</Link>
                    </div>
                </div>
            </div>
            {/* MODAL DE CONFIRMACIÓN */}
            <ModalConfirmacion
                visible={modalVisible}
                mensaje={`¿Seguro que quieres eliminar éste producto del carrito?`}
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    removeFromCart(itemToDelete.id, itemToDelete.size);
                    setModalVisible(false);
                }}
            />
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

export default CartDesk;
