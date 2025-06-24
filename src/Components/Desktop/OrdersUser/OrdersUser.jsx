import { useEffect, useState } from "react";
import { fetchUserOrders } from "../../../api/orderService";
import { Link } from "react-router-dom";

import './OrdersUser.css';

const OrdersUser = () => {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = async () => {
            const data = await fetchUserOrders();
            const pendientes = data.filter((orden) => orden.status === "pendiente");
            setOrdenes(pendientes);
        };

        obtenerOrdenes();
    }, []);

    const mostrarOrdenes = ordenes.slice(0, 4);

    return (
        <div className="historialComprasContainer">
            <h2>Órdenes Pendientes</h2>
            {ordenes.length === 0 ? (
                <div className="containerNoOrders">
                    <p>No tenés órdenes pendientes.</p>
                </div>
            ) : (
                <ul>
                    {mostrarOrdenes.map((orden) => (
                        <li key={orden._id}>

                            <div className="containerText">
                                <span>Fecha:</span>
                                <span className="importantText"> {new Date(orden.createdAt).toLocaleDateString()}</span>
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
                                <Link to={`/ordenes/${orden._id}`}>Ver Detalles</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            {ordenes.length > 4 && (
                <Link className="morePurchase" to="/lista-ordenes">
                    <span>Ver más</span>
                </Link>
            )}
        </div>
    );
};

export default OrdersUser;
