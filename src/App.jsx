import React, { useState } from "react";
import axios from "axios";

function App() {
    const [inputText, setInputText] = useState("");
    const [responseData, setResponseData] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setResponseData("");
        setIsLoading(true);

        try {
            const response = await axios.post("http://127.0.0.1:5000/correction", { text: inputText });
            setResponseData(response.data.correction);
        } catch (err) {
            console.error("Erreur lors de la requête :", err);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <header style={styles.header}>
                    <h1 style={styles.title}>Correcteur AI Pro</h1>
                    <p style={styles.subtitle}>
                        La solution intelligente pour perfectionner votre écriture.
                    </p>
                </header>
                <main style={styles.main}>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <textarea
                            placeholder="Entrez votre texte ici..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            style={styles.textarea}
                        />
                        <button
                            type="submit"
                            style={inputText ? styles.button : { ...styles.button, ...styles.buttonDisabled }}
                            disabled={!inputText || isLoading}
                        >
                            {isLoading ? "Correction en cours..." : "Corriger"}
                        </button>
                    </form>
                    {error && <p style={styles.error}>{error}</p>}
                    {responseData && (
                        <div style={styles.resultContainer}>
                            <h2 style={styles.resultTitle}>Texte corrigé :</h2>
                            <p style={styles.resultText}>{responseData}</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f8fa", // Fond apaisant
        padding: "20px",
    },
    card: {
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        maxWidth: "600px",
        width: "100%",
        textAlign: "center",
    },
    header: {
        marginBottom: "20px",
    },
    title: {
        fontSize: "32px",
        fontWeight: "bold",
        color: "#2c3e50",
        marginBottom: "10px",
    },
    subtitle: {
        fontSize: "16px",
        color: "#7f8c8d",
    },
    main: {
        marginTop: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    textarea: {
        width: "100%",
        height: "200px", // Augmenter la hauteur pour plus d'espace
        padding: "15px",
        fontSize: "18px", // Augmenter la taille de la police pour plus de visibilité
        border: "2px solid #3498db", // Ajouter une bordure bleue pour mieux distinguer le champ
        borderRadius: "5px",
        resize: "none",
        color: "#2c3e50",
        backgroundColor: "#ecf0f1", // Fond clair pour plus de contraste
        outline: "none", // Supprimer le contour par défaut
    },
    button: {
        padding: "15px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff",
        backgroundColor: "#3498db",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s ease",
    },
    buttonDisabled: {
        backgroundColor: "#bdc3c7",
        cursor: "not-allowed",
    },
    error: {
        color: "#e74c3c",
        marginTop: "10px",
    },
    resultContainer: {
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#ecf0f1",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        border: "2px solid #3498db",
    },
    resultTitle: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#3498db",
        marginBottom: "10px",
        backgroundColor: "#ecf0f1",
        padding: "5px",
        borderRadius: "5px",
    },
    resultText: {
        fontSize: "18px",
        lineHeight: "1.6",
        color: "#34495e",
        paddingTop: "10px",
        fontWeight: "500",
    },
};

export default App;
