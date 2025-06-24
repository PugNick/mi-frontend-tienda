import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import HeaderAndNav from "../HeaderAndNav/HeaderAndNav";
import Footer from "../Footer/Footer";

import './CompraDetails.css';

axios.defaults.withCredentials = true;

const PurchaseDetails = () => {
    const { id } = useParams();
    const [compra, setCompra] = useState(null);
    const [loading, setLoading] = useState(true);

    const metodosEnvio = {
        retiro_en_local: "Retiro en el local",
        envio_domicilio: "Envío a domicilio",
        punto_retiro: "Punto de retiro"
    };

    useEffect(() => {
        const obtenerCompra = async () => {
            const apiUrl =
                window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                    ? "http://localhost:5000"
                    : import.meta.env.VITE_API_MOBILE;
            try {
                const response = await axios.get(`${apiUrl}/orders/${id}`, { withCredentials: true });
                if (response.data.status === "pagado") {
                    setCompra(response.data);
                } else {
                    setCompra(null);
                }
            } catch (error) {
                console.error("Error al obtener la compra:", error);
            } finally {
                setLoading(false);
            }
        };

        obtenerCompra();
    }, [id]);

    if (loading) return <p className="mensajeEstadoOrden">Cargando...</p>;
    if (!compra) return <p className="mensajeEstadoOrden error">Compra no encontrada o aún no fue pagada.</p>;

    // Formatear la fecha y la hora por separado
    const fecha = new Date(compra.createdAt).toLocaleDateString();
    const hora = new Date(compra.createdAt).toLocaleTimeString();

    return (
        <div>
            <HeaderAndNav />
            <div className="DetailCompraWidth">
                <div className="detailCompraContainer">
                    <h2>Detalle de la Compra</h2>
                    <p><strong>ID:</strong> {compra._id}</p>
                    <p><strong>Fecha:</strong> {fecha}</p>
                    <p><strong>Hora:</strong> {hora}</p>
                    <p><strong>Método de Envío:</strong> {metodosEnvio[compra.shippingMethod]}</p>

                    {compra.shippingMethod === "punto_retiro" && compra.shippingDetails?.pickupPoint && (
                        <p><strong>Punto de retiro:</strong> {compra.shippingDetails.pickupPoint.name}</p>
                    )}

                    {compra.shippingMethod === "envio_domicilio" && compra.shippingDetails?.address && (
                        <div>
                            <p><strong>Dirección de envío:</strong></p>
                            <p>Barrio: {compra.shippingDetails.address?.barrio || compra.shippingDetails.userInfo?.barrio}</p>
                            <p>Calle: {compra.shippingDetails.address?.street || compra.shippingDetails.userInfo?.street}</p>
                            <p>Número: {compra.shippingDetails.address?.number || compra.shippingDetails.userInfo?.number}</p>
                        </div>
                    )}

                    <h3>Productos</h3>
                    <ul className="listProductDetail">
                        {compra.items.map((item) => (
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

                    <p><strong>Total de la Compra:</strong> ${compra.totalAmount}</p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default PurchaseDetails;
