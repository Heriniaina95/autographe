import axios from "axios";

// Définir une instance Axios pour l'API
const api = axios.create({
    baseURL: "http://localhost:5000", // Remplacez par l'URL de votre API Flask
});

export default api;
