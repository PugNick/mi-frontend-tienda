import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useCart } from '../../../context/CartContext'; // 🔄 Corrección de importación


import useAuth from "../../../hooks/useAuth";
import HeaderAndNav from "../HeaderAndNav/HeaderAndNav";
import Historial from '../HistorialCompras/HistorialCompras';
import Orders from '../OrdersUser/OrdersUser';
import Footer from '../Footer/Footer';

//estilos
import './ProfileUser.css';

function ProfileDesk() {
    const user = useAuth();
    const navigate = useNavigate();
    const { setCart, fetchCart } = useCart(); // ✅ Ahora obtenemos `fetchCart` también

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        }
    }, [user]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        try {
            const response = await fetch(`${apiUrl}/auth/update`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ name, email }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al actualizar el perfil");
            }

            setSuccess("Perfil actualizado correctamente");

        } catch (err) {
            setError(err.message);
        }
    };

    const handleLogout = async () => {
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        await fetch(`${apiUrl}/auth/logout`, {
            method: "POST",
            credentials: "include",
        });

        setCart([]); // ✅ Limpiar carrito localmente
        await fetchCart(); // ✅ Volver a cargar el carrito vacío después del logout

        navigate("/");
    };

    if (!user) {
        return <p className="loading">Cargando perfil...</p>;
    }

    return (
        <div>
            <HeaderAndNav />
            <div className="profileWidth">
                <div className="flexContainerProfile">
                    <div className="userData">
                        <h2 className="myData">Mis datos</h2>
                        <div className="data">
                            <div className="nameContainer">
                                <span>Nombre:</span>
                                <span className="nameUser">{user.name}</span>
                            </div>
                            <div className="emailContainer">
                                <span>Email:</span>
                                <span className="emailUser">{user.email}</span>
                            </div>
                        </div>

                        <div className="userDataEdit">
                            <div className="dataEdit">
                                <div className="containerPen">
                                    <svg className="pen" width='100%' height='100%' viewBox="0 0 512 512">
                                        <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                    </svg>
                                </div>
                                <h3>Editar Perfil</h3>
                            </div>
                        </div>
                        <form onSubmit={handleUpdateProfile}>
                            <div className="inputsContainer">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Nuevo nombre"
                                    required
                                    className="inputName"
                                />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nuevo email"
                                    required
                                    className="inputEmail"
                                />
                            </div>
                            <button type="submit">Guardar Cambios</button>
                        </form>
                        {error && <p className="errorProfile">{error}</p>}
                        {success && <p className="successProfile">{success}</p>}

                        <div className="closeAccount">
                            <button onClick={handleLogout}>Cerrar Sesión</button>
                        </div>
                    </div>
                    <div className="historialCompras">
                        <Historial />
                    </div>
                    <div className="ordenesUser">
                        <Orders />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default ProfileDesk;
