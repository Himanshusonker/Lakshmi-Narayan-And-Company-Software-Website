import axios from "axios";

const API_URL =
    import.meta.env
        .VITE_LAKSHMI_NARAYAN_AND_COMPANY_SW_W_API_URL;

const caAxios = axios.create({
    baseURL: API_URL
});

caAxios.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem("caToken");

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }

        return config;

    }
);

export default caAxios;