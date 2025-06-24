import { useEffect, useState } from "react";
import { fetchUserOrders } from "../../../api/orderService";
import { Link } from "react-router-dom";

import './HistorialCompras.css'; // Asegúrate de tener este archivo CSS para estilos

const HistorialCompras = () => {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = async () => {
            const data = await fetchUserOrders();
            const comprasPagadas = data.filter((orden) => orden.status === "pagado");
            setOrdenes(comprasPagadas);
        };

        obtenerOrdenes();
    }, []);

    const mostrarOrdenes = ordenes.slice(0, 4);

    return (
        <div className="historialComprasContainer">
            <h2>Historial de Compras</h2>
            {ordenes.length === 0 ? (
                <div className="containerNoCompras">
                    <p>No tenés compras registradas.</p>
                    <Link to="/productos"><p>IR A LA TIENDA</p></Link>
                </div>
            ) : (
                <ul>
                    {mostrarOrdenes.map((orden) => (
                        <li key={orden._id}>
                            <div className="containerText">
                                <span>Fecha:</span>
                                <span className="importantText">{new Date(orden.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="containerText">
                                <span>ID:</span>
                                <span className="importantText">{orden._id}</span>
                            </div>
                            <div className="containerText">
                                <div className="productsTitle">
                                    <span>Productos:</span>
                                </div>
                                <div className="productsNameContainer">
                                    {orden.items.map(i => (
                                        <span className="importantText" key={i.product._id}>{i.product.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className="linContainerDetail">
                                <Link to={`/compras/${orden._id}`}>Ver detalles</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {ordenes.length > 4 && (
                <Link
                    className="morePurchase"
                    to="/lista-compras"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <span>Ver más</span>
                </Link>
            )}
        </div>
    );
};

export default HistorialCompras;
