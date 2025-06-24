import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from '../../../context/CartContext'; // ✅ Importamos useCart
import { useAuth } from '../../../context/AuthContext'; // ✅ Importamos useAuth

import HeaderAndNav from "../HeaderAndNav/HeaderAndNav";
import Footer from "../Footer/Footer";

import './Login.css';


const LoginDesk = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();
    const { fetchCart } = useCart(); // ✅ Obtenemos fetchCart
    const { fetchUser } = useAuth(); // ✅ Obtenemos fetchUser

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        try {
            const response = await fetch(`${apiUrl}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al iniciar sesión");
            }

            setSuccess("Inicio de sesión exitoso");

            await fetchCart();
            await fetchUser();

            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <HeaderAndNav />
            <div className="LoginWidth">
                <div className="loginContainer">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="flexInputsLogin">
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Iniciar Sesión</button>
                    </form>
                    <div className="registerHere">

                        <span>¿No tienes una cuenta? </span>


                        <div className="SVGregisterHere">
                            <Link to="/register">Regístrate aquí</Link>
                            <svg className="handLeft" width='24' height='24' viewBox="0 0 512 512">
                                <path d="M64 128l177.6 0c-1 5.2-1.6 10.5-1.6 16l0 16-32 0L64 160c-8.8 0-16-7.2-16-16s7.2-16 16-16zm224 16c0-17.7 14.3-32 32-32c0 0 0 0 0 0l24 0c66.3 0 120 53.7 120 120l0 48c0 52.5-33.7 97.1-80.7 113.4c.5-3.1 .7-6.2 .7-9.4c0-20-9.2-37.9-23.6-49.7c4.9-9 7.6-19.4 7.6-30.3c0-15.1-5.3-29-14-40c8.8-11 14-24.9 14-40l0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-40 0-40zm32-80s0 0 0 0c-18 0-34.6 6-48 16L64 80C28.7 80 0 108.7 0 144s28.7 64 64 64l82 0c-1.3 5.1-2 10.5-2 16c0 25.3 14.7 47.2 36 57.6c-2.6 7-4 14.5-4 22.4c0 20 9.2 37.9 23.6 49.7c-4.9 9-7.6 19.4-7.6 30.3c0 35.3 28.7 64 64 64l64 0 24 0c92.8 0 168-75.2 168-168l0-48c0-92.8-75.2-168-168-168l-24 0zM256 400c-8.8 0-16-7.2-16-16s7.2-16 16-16l48 0 16 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-64 0zM240 224c0 5.5 .7 10.9 2 16l-2 0-32 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l32 0 0 16zm24 64l40 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-48 0-16 0c-8.8 0-16-7.2-16-16s7.2-16 16-16l24 0z" />
                            </svg>
                        </div>
                    </div>

                    {error &&
                        <div className="errorContainer">
                            <svg className="exclamation" width='24' height='24' viewBox="0 0 512 512">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                            </svg>
                            <p className="errorCredential">{error}</p>
                        </div>
                    }
                    {success &&
                        <div className="succesContainer">
                            <svg className="check" width='24' height='24' viewBox="0 0 512 512">
                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                            </svg>
                            <p className="succesCredential">{success}</p>
                        </div>
                    }
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LoginDesk;
