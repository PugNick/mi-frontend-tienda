import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Utilidad para obtener la URL base del backend
    const getApiUrl = () =>
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
            ? "http://localhost:5000"
            : import.meta.env.VITE_API_MOBILE;

    // Obtener el carrito del backend
    const fetchCart = async () => {
        try {
            const response = await fetch(`${getApiUrl()}/cart`, {
                credentials: "include",
            });
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error("Error cargando el carrito:", error);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    // Agregar producto al carrito y actualizar estado
    const addToCart = async (productId, quantity = 1, size = null) => {
        try {
            const response = await fetch(`${getApiUrl()}/cart/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, quantity, size }),
            });

            if (!response.ok) throw new Error("Error al agregar al carrito");

            await fetchCart();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // Eliminar producto del carrito y actualizar estado
    const removeFromCart = async (productId, size) => {
        try {
            const response = await fetch(`${getApiUrl()}/cart/remove`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, size }),
            });

            if (!response.ok) throw new Error("Error al eliminar el producto");

            await fetchCart();
        } catch (error) {
            console.error("Error eliminando producto:", error);
        }
    };

    const increaseQuantity = async (productId, size) => {
        try {
            const response = await fetch(`${getApiUrl()}/cart/increase`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, size }),
            });

            if (!response.ok) throw new Error("Error al aumentar la cantidad");

            await fetchCart();
        } catch (error) {
            console.error("Error aumentando cantidad:", error);
        }
    };

    const decreaseQuantity = async (productId, size) => {
        try {
            const response = await fetch(`${getApiUrl()}/cart/decrease`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ productId, size }),
            });

            if (!response.ok) throw new Error("Error al disminuir la cantidad");

            await fetchCart();
        } catch (error) {
            console.error("Error disminuyendo cantidad:", error);
        }
    };

    const clearCart = async () => {
        try {
            const response = await fetch(`${getApiUrl()}/cart/clear`, {
                method: "POST",
                credentials: "include",
            });

            if (!response.ok) throw new Error("Error al vaciar el carrito");

            setCart([]);
        } catch (error) {
            console.error("Error vaciando el carrito:", error);
        }
    };

    return (
        <CartContext.Provider value={{
            cart,
            setCart,
            addToCart,
            removeFromCart,
            fetchCart,
            increaseQuantity,
            decreaseQuantity,
            clearCart,
        }}>
            {children}
        </CartContext.Provider>
    );
};

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Hook personalizado para usar el carrito
export const useCart = () => {
    return useContext(CartContext);
};