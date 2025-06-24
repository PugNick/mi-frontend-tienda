import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import HeaderAndNav from "../HeaderAndNav/HeaderAndNav";
import Footer from "../Footer/Footer";
import ModalConfirmacion from "../Modal/ModalConfirmacion";
import Toast from "../Toast/Toast";

import './OrderDetails.css';

axios.defaults.withCredentials = true;

const OrderDetails = () => {
    const { id } = useParams();
    const [orden, setOrden] = useState(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    // Estados para el toast
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    const showToast = (msg, type = "success") => {
        setToastMessage(msg);
        setToastType(type);
        setToastVisible(true);
    };

    const metodosEnvio = {
        retiro_en_local: "Retiro en el local",
        envio_domicilio: "Envío a domicilio",
        punto_retiro: "Punto de retiro"
    };

    // 👇 Utilidad para elegir la URL correcta
    const getApiUrl = () =>
        window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
            ? "http://localhost:5000"
            : import.meta.env.VITE_API_MOBILE;

    useEffect(() => {
        const obtenerDetalleOrden = async () => {
            try {
                const response = await axios.get(`${getApiUrl()}/orders/${id}`, { withCredentials: true });
                setOrden(response.data);
            } catch (error) {
                console.error("Error al obtener los detalles de la orden:", error);
                console.log(error.response);
            } finally {
                setLoading(false);
            }
        };

        obtenerDetalleOrden();
    }, [id]);

    const navigate = useNavigate();

    const eliminarOrden = async () => {
        setModalVisible(true);
    };

    const confirmarEliminarOrden = async () => {
        try {
            await axios.delete(`${getApiUrl()}/orders/${id}`, { withCredentials: true });
            showToast("Orden eliminada correctamente.", "success");
            setTimeout(() => navigate("/perfil"), 1200);
        } catch (error) {
            console.error("Error al eliminar la orden:", error);
            showToast("Hubo un error al eliminar la orden.", "error");
        }
    };

    const pagarOrden = async () => {
        try {
            const response = await axios.post(`${getApiUrl()}/orders/${id}/pagar`, {}, { withCredentials: true });

            const paymentData = response.data;

            if (paymentData.init_point) {
                window.location.href = paymentData.init_point;
            } else {
                showToast("No se pudo obtener el enlace de pago.", "error");
            }
        } catch (error) {
            console.error("Error al generar el pago:", error);
            showToast("Hubo un problema al iniciar el pago.", "error");
        }
    };

    if (loading) return <p className="mensajeEstadoOrden">Cargando...</p>;
    if (!orden || !orden.items) return <p className="mensajeEstadoOrden error">No se encontró la orden.</p>;

    // Formatear la fecha y la hora por separado
    const fecha = new Date(orden.createdAt).toLocaleDateString();
    const hora = new Date(orden.createdAt).toLocaleTimeString();

    return (
        <div>
            <HeaderAndNav />
            <div className="DetailCompraWidth">
                <div className="detailCompraContainer">
                    <h2>Detalle de la Orden</h2>
                    <p><strong>ID:</strong> {orden._id}</p>
                    <p><strong>Fecha:</strong> {fecha}</p>
                    <p><strong>Hora:</strong> {hora}</p>
                    <p><strong>Método de Envío:</strong> {metodosEnvio[orden.shippingMethod]}</p>

                    {orden.shippingMethod === "punto_retiro" && orden.shippingDetails?.pickupPoint && (
                        <p><strong>Punto de retiro:</strong> {orden.shippingDetails.pickupPoint.name}</p>
                    )}

                    {orden.shippingMethod === "envio_domicilio" && orden.shippingDetails?.address && (
                        <div>
                            <p><strong>Dirección de envío:</strong></p>
                            <p>Barrio: {orden.shippingDetails.address?.barrio || orden.shippingDetails.userInfo?.barrio}</p>
                            <p>Calle: {orden.shippingDetails.address?.street || orden.shippingDetails.userInfo?.street}</p>
                            <p>Número: {orden.shippingDetails.address?.number || orden.shippingDetails.userInfo?.number}</p>
                        </div>
                    )}

                    <h3>Productos</h3>
                    <ul className="listProductDetail">
                        {orden.items.map((item) => (
                            <li className="productDetailContainerCompra" key={item._id || item.product._id}>
                                <div className="imgDetailContainer">
                                    <img src={item.product?.image} alt={item.product?.name} />
                                </div>
                                <div className="detailProductContainer">
                                    <p>{item.product?.name}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <p><strong>Total de la Orden:</strong> ${orden.totalAmount}</p>
                    <div className="orderButtons">
                        <button className="buyOrder" onClick={pagarOrden}>Comprar</button>
                        <button className="deletOrder" onClick={eliminarOrden}>Eliminar orden</button>
                    </div>
                </div>
            </div>
            <ModalConfirmacion
                visible={modalVisible}
                mensaje="¿Seguro que quieres eliminar ésta orden?"
                onCancel={() => setModalVisible(false)}
                onConfirm={() => {
                    setModalVisible(false);
                    confirmarEliminarOrden();
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
};

export default OrderDetails;