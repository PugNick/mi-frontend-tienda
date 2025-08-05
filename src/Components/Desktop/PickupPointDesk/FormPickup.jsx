import { useState, useEffect } from "react";
import { useCart } from "../../../context/CartContext";
import { Link } from 'react-router-dom';

import pickupStore from '../../../store/PickupStore';
import Mapa from './PickupPointDesk';
import HeaderNav from '../HeaderAndNav/HeaderAndNav';
import Footer from '../Footer/Footer';
import Toast from '../Toast/Toast';

import './FormPickup.css';

function FormPickup() {
    const { cart } = useCart();
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

    const [noNumber, setNoNumber] = useState(false); // Estado para "Sin número"
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    // Restaurar datos sólo si viene de /cuentaPrueba
    useEffect(() => {
        const wasFromTestCount = sessionStorage.getItem("fromTestCount") === "true";

        if (wasFromTestCount) {
            const savedData = sessionStorage.getItem("formPickupData");
            if (savedData) {
                const parsedData = JSON.parse(savedData);
                setFormData(parsedData);
                if (parsedData.number === "S/N") setNoNumber(true);
            }
        }

        // Limpiar flag
        sessionStorage.removeItem("fromTestCount");
    }, []);

    const showToast = (msg, type = "success") => {
        setToastMessage(msg);
        setToastType(type);
        setToastVisible(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePhoneChange = (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Solo números
        if (!value.startsWith("54")) value = "54" + value;
        setFormData((prev) => ({ ...prev, phone: "+" + value }));
    };

    const handleNoNumberChange = () => {
        setNoNumber((prev) => !prev);
        setFormData((prev) => ({ ...prev, number: !noNumber ? "S/N" : "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cart || !Array.isArray(cart.items)) {
            console.error("❌ Error: cart.items no es un array", cart);
            return;
        }

        const totalAmount = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

        const selectedPickup = pickupStore.selectedPickup;

        if (!selectedPickup) {
            showToast("Debes seleccionar un punto de retiro antes de continuar.", "error");
            return;
        }

        const orderData = {
            user: cart.user,
            shippingMethod: "punto_retiro",
            shippingAddress: formData,
            pickupPoint: {
                name: selectedPickup.name,
                address: selectedPickup.address,
                lat: selectedPickup.lat,
                lng: selectedPickup.lng,
            },
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                size: item.size || null, // Incluir el talle (si aplica)
            })),
            totalAmount,
        };

        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        try {
            // 1️⃣ Crear la orden
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

            // 2️⃣ Generar la preferencia de pago
            const paymentResponse = await fetch(`${apiUrl}/orders/${order._id}/pagar`, {
                method: "POST",
                credentials: "include",
            });

            if (!paymentResponse.ok) {
                const errorData = await paymentResponse.text();
                throw new Error(errorData || "Error al generar la preferencia de pago");
            }

            const paymentData = await paymentResponse.json();

            // 3️⃣ Redirigir a Mercado Pago
            window.location.href = paymentData.init_point;

        } catch (error) {
            console.error("❌ Error en el proceso de compra:", error.message);
            showToast("Hubo un problema al procesar tu compra. Inténtalo de nuevo.", "error");
        }
    };

    // Guardar datos solo antes de navegar por link "Presiona Aqui"
    const handleLinkClick = () => {
        sessionStorage.setItem("formPickupData", JSON.stringify(formData));
        sessionStorage.setItem("fromTestCount", "true");
        window.scrollTo({ top: 0, behavior: "smooth" });
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
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Nombre"
                                    onChange={handleChange}
                                    value={formData.name}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Apellido"
                                    onChange={handleChange}
                                    value={formData.lastName}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Teléfono"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="street"
                                    name="street"
                                    placeholder="Calle"
                                    onChange={handleChange}
                                    value={formData.street}
                                    required
                                />
                            </div>
                            <div className="payerNumberDpto">
                                <div className="numberNoNumber">
                                    <div className="input-container">
                                        <input
                                            className="numberInput"
                                            type="text"
                                            name="number"
                                            placeholder="Número"
                                            value={noNumber ? "S/N" : formData.number} // Mostrar "S/N" si está deshabilitado
                                            onChange={handleChange}
                                            disabled={noNumber} // Deshabilitar si la casilla está marcada
                                            required={!noNumber} // No requerirlo si es "Sin número"
                                        />
                                    </div>

                                    <div className="checkbox-container">
                                        <input
                                            type="checkbox"
                                            id="noNumber"
                                            checked={noNumber}
                                            onChange={handleNoNumberChange}
                                        />
                                        <label className="NoNumber" htmlFor="noNumber">Sin número</label>
                                    </div>
                                </div>
                                <div className="input-container">
                                    <input
                                        type="text"
                                        id="dpto"
                                        name="dpto"
                                        placeholder="Departamento (opcional)"
                                        onChange={handleChange}
                                        value={formData.dpto}
                                    />

                                </div>
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="barrio"
                                    name="barrio"
                                    placeholder="Barrio"
                                    onChange={handleChange}
                                    value={formData.barrio}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    placeholder="Ciudad"
                                    onChange={handleChange}
                                    value={formData.city}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="cp"
                                    name="cp"
                                    placeholder="Código Postal"
                                    onChange={handleChange}
                                    value={formData.cp}
                                    required
                                />
                            </div>
                            <div className="input-container">
                                <input
                                    type="text"
                                    id="province"
                                    name="province"
                                    placeholder="Provincia"
                                    onChange={handleChange}
                                    value={formData.province}
                                    required
                                />
                            </div>
                        </div>
                        <div className="buyH3">
                            <div className="firstHere">
                                <h3>Antes de continuar</h3>
                                <Link
                                    to='/cuentaPrueba'
                                    onClick={handleLinkClick}
                                >
                                    Presiona Aqui
                                </Link>
                            </div>
                            <button type="submit" className="submit-button">Continuar al Pago</button>
                        </div>
                    </form>
                    <div className="mapaContainer">
                        <Mapa />
                    </div>
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

export default FormPickup;
