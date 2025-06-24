import { useEffect, useState } from "react";
import { fetchUserOrders } from "../../../api/orderService";
import { Link } from "react-router-dom";

import HeaderAndNav from "../HeaderAndNav/HeaderAndNav";
import Footer from '../Footer/Footer';

import "./ListaCompras.css";

function ListaCompras() {
    const [ordenes, setOrdenes] = useState([]);

    useEffect(() => {
        const obtenerOrdenes = async () => {
            const data = await fetchUserOrders();
            const comprasPagadas = data.filter((orden) => orden.status === "pagado");
            setOrdenes(comprasPagadas);
        };

        obtenerOrdenes();
    }, []);

    return (
        <div>
            <HeaderAndNav />
            <div className="listaComprasWidth">
                <div className="listComprasContainer">
                    <h2>Todas tus compras</h2>
                    {ordenes.length === 0 ? (
                        <div className="containerNoCompras">
                            <p>No tenés compras registradas.</p>
                            <Link to="/productos"><p>IR A LA TIENDA</p></Link>
                        </div>
                    ) : (
                        <ul>
                            {ordenes.map((orden) => (
                                <li className="compra" key={orden._id}>
                                    <p><strong>Fecha:</strong> {new Date(orden.createdAt).toLocaleDateString()}</p>
                                    <p><strong>ID de Compra:</strong> {orden._id}</p>
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
                                    <div className="linkContainer">
                                        <Link to={`/compras/${orden._id}`}>Ver detalles</Link>
                                    </div>

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

export default ListaCompras;