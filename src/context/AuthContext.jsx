import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Función para obtener el usuario autenticado desde el backend
    const fetchUser = async () => {
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;
        try {
            const response = await fetch(`${apiUrl}/auth/me`, {
                credentials: "include"
            });
            if (!response.ok) throw new Error("No autenticado");
            const data = await response.json();
            setUser(data);
        } catch (error) {
            console.error("Error obteniendo usuario:", error);
            setUser(null);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    // Función para cerrar sesión
    const logout = async () => {
        const apiUrl =
            window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                ? "http://localhost:5000"
                : import.meta.env.VITE_API_MOBILE;
        try {
            const response = await fetch(`${apiUrl}/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
            if (!response.ok) throw new Error("Error al cerrar sesión");

            setUser(null); // Limpiamos el usuario en el frontend
        } catch (error) {
            console.error("Error cerrando sesión:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, fetchUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => {
    return useContext(AuthContext);
};
