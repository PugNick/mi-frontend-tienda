import { useEffect, useState } from "react";
import { fetchUserOrders } from "../../../api/orderService";
import { Link } from "react-router-dom";

import HeaderNav from '../HeaderAndNav/HeaderAndNav';
import Footer from '../Footer/Footer';

function OrdersList() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = async () => {
            const data = await fetchUserOrders();
            const pendientes = data.filter((orden) => orden.status === "pendiente");
            setOrdenes(pendientes);
        };

        obtenerOrdenes();
    }, []);

    return (
        <div>
            <HeaderNav />
            <div className="listaComprasWidth">
                <div className="listComprasContainer">
                    <h2>Todas tus órdenes pendientes</h2>
                    {ordenes.length === 0 ? (
                        <p>No tenés órdenes pendientes.</p>
                    ) : (
                        <ul>
                            {ordenes.map((orden) => (
                                <li className="compra" key={orden._id}>
                                    <p><strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleDateString()}</p>
                                    <p><strong>ID de Orden:</strong> {orden._id}</p>
                                    <div className="containerTextList">
                                        <div className="productsTitleList">
                                            <span><strong>Productos:</strong></span>
                                        </div>
                                        <div className="productsNameContainerList">
                                            {orden.items.map(i => (
                                                <span key={i.product._id}>{i.product.name}</span>
                                            ))}
                                        </div>
                                    </div>
                                    <Link to={`/ordenes/${orden._id}`}>Ver Detalles</Link>

                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default OrdersList;