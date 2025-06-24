import { useEffect, useState } from "react";

const useAuth = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const apiUrl =
                window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
                    ? "http://localhost:5000"
                    : import.meta.env.VITE_API_MOBILE;
            try {
                const response = await fetch(`${apiUrl}/auth/me`, {
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("No autenticado");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                setUser(null);
            }
        };

        fetchUser();
    }, []);

    return user;
};

export default useAuth;