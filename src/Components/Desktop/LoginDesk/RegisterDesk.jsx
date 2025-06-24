import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAndNav from "../HeaderAndNav/HeaderAndNav";
import Footer from "../Footer/Footer";

import './Register.css';

const RegisterDesk = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;

        try {
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Error al registrar usuario");
            }

            setSuccess("Registro exitoso, redirigiendo...");
            setTimeout(() => navigate("/login"), 2000);

        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <HeaderAndNav />
            <div className="RegisterWidth">
                <div className="registerContainer">
                    <h2>Crear Cuenta</h2>
                    <form onSubmit={handleRegister}>
                        <div className="inputsContaioner">
                            <input
                                type="text"
                                placeholder="Nombre completo"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
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
                        <button type="submit">Registrarse</button>
                    </form>
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

export default RegisterDesk;
