import axios from 'axios';

const getApiUrl = () =>
    window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
        ? "http://localhost:5000"
        : import.meta.env.VITE_API_MOBILE;

const instance = axios.create({
    baseURL: getApiUrl(),
    withCredentials: true,
});

export default instance;