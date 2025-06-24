import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

import './Pay.css'

const PaySuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const query = new URLSearchParams(location.search);
    const paymentId = query.get("payment_id");
    const status = query.get("status");
    const merchantOrderId = query.get("merchant_order_id");

    useEffect(() => {
        if (!paymentId || !status || status !== "approved") {
            navigate("/");
            return;
        }

        // ✅ Vacía el carrito solo si el pago fue aprobado
        clearCart();
    }, [paymentId, status, navigate, clearCart]);

    return (
        <div className="paySuccessWidth">
            <div className="paySuccessContainer">
                <h1>¡Gracias por tu compra!</h1>
                <p>Tu pago fue procesado con éxito.</p>

                {paymentId && (
                    <div>
                        <p><strong>ID de pago:</strong> {paymentId}</p>
                        <p><strong>Estado:</strong> {status}</p>
                        <p><strong>ID de orden:</strong> {merchantOrderId}</p>
                    </div>
                )}

                <button onClick={() => navigate("/")}>
                    Volver al inicio
                </button>
            </div>
        </div>
    );
};

export default PaySuccess;
