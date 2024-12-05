import React, { useState } from "react";
import api from "./api";

function App() {
    const [inputText, setInputText] = useState("");
    const [responseData, setResponseData] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Exemple : Envoi d'une requête POST à l'API
            const response = await api.post("/", { text: inputText });
            setResponseData(response.data.result); // Changez 'result' selon la réponse de votre API
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
            setResponseData("Une erreur est survenue !");
        }
    };

    return (
        <div style={{ fontFamily: "Arial", margin: "20px" }}>
            <h1>TEXTE CORRECTION</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Entrez du texte"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{ padding: "10px", width: "300px", marginBottom: "10px" }}
                />
                <br />
                <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Envoyer
                </button>
            </form>
            <div>
                <h2>Réponse de l'API :</h2>
                <p>{responseData}</p>
            </div>
        </div>
    );
}

export default App;
