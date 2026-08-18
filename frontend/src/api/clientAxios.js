import axios from "axios";

const API_URL=import.meta.env.VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

const clientAxios = axios.create({baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// ======================================================
// CLIENT TOKEN
// ======================================================

clientAxios.interceptors.request.use((config) => {

        const token=localStorage.getItem("clientToken");

        if (token) {

            config.headers.Authorization=`Bearer ${token}`;

        }

        return config;

    },

    (error) => {

        return Promise.reject(error);

    }

);
export default clientAxios;