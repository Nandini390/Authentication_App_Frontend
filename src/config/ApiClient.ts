import axios from "axios";
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL || "http://localhost:8080/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, 
    timeout: 10000 // Include cookies in requests
});

export default apiClient;