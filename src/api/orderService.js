import axios from './axios';

export const fetchUserOrders = async () => {
    try {
        const response = await axios.get("/orders");
        return response.data;
    } catch (error) {
        console.error("Error al obtener el historial de compras:", error);
        return [];
    }
};