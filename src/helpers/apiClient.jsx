import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const BEARER_TOKEN = localStorage.getItem("token");

    if (BEARER_TOKEN) {
      config.headers["Authorization"] = `Bearer ${BEARER_TOKEN}`;
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  },

  (error) => Promise.reject(error)
);

export default apiClient;
