import axios from "axios";

const API_URL =
    import.meta.env.VITE_AI_WEBSITE_API_URL ||
    "http://localhost:7070";

const aiAxios = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});

export default aiAxios;