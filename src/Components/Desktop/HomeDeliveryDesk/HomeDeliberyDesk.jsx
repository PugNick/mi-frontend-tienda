import { useEffect, useState } from "react";
import "./HomeDeliberyDesk.css";
import { useCart } from "../../../context/CartContext";
import { Link } from "react-router-dom";

import HeaderNav from '../HeaderAndNav/HeaderAndNav';
import Footer from '../Footer/Footer';
import Toast from '../Toast/Toast';

function HomeDeliveryDesk() {

    const { cart } = useCart();
    const [noNumber, setNoNumber] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        lastName: "",
        phone: "",
        street: "",
        number: "",
        dpto: "",
        barrio: "",
        city: "",
        cp: "",
        province: "",
    });

    // Verificar si hay datos en sessionStorage al cargar
    useEffect(() => {
        const wasFromTestCount = sessionStorage.getItem("fromTestCount") === "true";

        if (wasFromTestCount) {
            const savedData = sessionStorage.getItem("homeDeliveryForm");
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setFormData(parsedData);
                if (parsedData.number === "S/N") setNoNumber(true);
            }
        }

        // Limpieza después de cargar
        sessionStorage.removeItem("fromTestCount");
    }, []);


    // TOASTS
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const showToast = (msg, type = "success") => {
        setToastMessage(msg);
        setToastType(type);
        setToastVisible(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value;
        if (!value.startsWith("+54")) {
            value = "+54" + value.replace(/[^0-9]/g, "");
        }
        setFormData({ ...formData, phone: value });
    };

    const handleNoNumberChange = () => {
        setNoNumber(!noNumber);
        setFormData({ ...formData, number: noNumber ? "" : "S/N" });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cart || !Array.isArray(cart.items)) {
            console.error("❌ Error: cart.items no es un array", cart);
            return;
        }

        const totalAmount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

        const orderData = {
            user: cart.user,
            shippingMethod: "envio_domicilio",
            shippingAddress: formData,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                size: item.size || null,
            })),
            totalAmount,
        };

        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        try {
            const createOrderResponse = await fetch(`${apiUrl}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(orderData),
            });

            if (!createOrderResponse.ok) {
                const errorData = await createOrderResponse.text();
                throw new Error(errorData || "Error al crear la orden");
            }

            const { order } = await createOrderResponse.json();

            const paymentResponse = await fetch(`${apiUrl}/orders/${order._id}/pagar`, {
                method: "POST",
                credentials: "include",
            });

            if (!paymentResponse.ok) {
                const errorData = await paymentResponse.text();
                throw new Error(errorData || "Error al generar la preferencia de pago");
            }

            const paymentData = await paymentResponse.json();

            window.location.href = paymentData.init_point;

        } catch (error) {
            console.error("❌ Error en el proceso de compra:", error.message);
            showToast("Hubo un problema al procesar tu compra. Inténtalo de nuevo.", "error");
        }
    };

    return (
        <div>
            <HeaderNav />
            <div className="formWidth">
                <div className="formContainer">
                    <form onSubmit={handleSubmit}>
                        <h3>Datos de Facturación</h3>
                        <div className="containerInputs">
                            <div className="input-container">
                                <input type="text" name="name" placeholder="Nombre" onChange={handleChange} value={formData.name} required />
                            </div>
                            <div className="input-container">
                                <input type="text" name="lastName" placeholder="Apellido" onChange={handleChange} value={formData.lastName} required />
                            </div>
                            <div className="input-container">
                                <input type="tel" name="phone" placeholder="Teléfono" onChange={handlePhoneChange} value={formData.phone} required />
                            </div>
                            <div className="input-container">
                                <input type="text" name="street" placeholder="Calle" onChange={handleChange} value={formData.street} required />
                            </div>
                            <div className="payerNumberDpto">
                                <div className="numberNoNumber">
                                    <div className="input-container">
                                        <input
                                            className="numberInput"
                                            type="text"
                                            name="number"
                                            placeholder="Número"
                                            value={noNumber ? "S/N" : formData.number}
                                            onChange={handleChange}
                                            disabled={noNumber}
                                            required={!noNumber}
                                        />
                                    </div>
                                    <div className="checkbox-container">
                                        <input type="checkbox" id="noNumber" checked={noNumber} onChange={handleNoNumberChange} />
                                        <label className="NoNumber" htmlFor="noNumber">Sin número</label>
                                    </div>
                                </div>
                                <div className="input-container">
                                    <input type="text" name="dpto" placeholder="Departamento (opcional)" onChange={handleChange} value={formData.dpto} />
                                </div>
                            </div>
                            <div className="input-container">
                                <input type="text" name="barrio" placeholder="Barrio" onChange={handleChange} value={formData.barrio} required />
                            </div>
                            <div className="input-container">
                                <input type="text" name="city" placeholder="Ciudad" onChange={handleChange} value={formData.city} required />
                            </div>
                            <div className="input-container">
                                <input type="text" name="cp" placeholder="Código Postal" onChange={handleChange} value={formData.cp} required />
                            </div>
                            <div className="input-container">
                                <input type="text" name="province" placeholder="Provincia" onChange={handleChange} value={formData.province} required />
                            </div>
                        </div>

                        <div className="buyH3">
                            <div className="firstHere">
                                <h3>Antes de continuar</h3>
                                <Link
                                    to='/cuentaPrueba'
                                    onClick={() => {
                                        sessionStorage.setItem("homeDeliveryForm", JSON.stringify(formData));
                                        sessionStorage.setItem("fromTestCount", "true");
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }}
                                >
                                    Presiona Aquí
                                </Link>
                            </div>
                            <button type="submit" className="submit-button">Continuar al Pago</button>
                        </div>
                    </form>
                </div>
            </div>
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

export default HomeDeliveryDesk;
