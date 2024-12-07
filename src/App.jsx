import React, { useState } from "react";
import axios from "axios";

function App() {
    const [inputText, setInputText] = useState("");
    const [responseData, setResponseData] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Réinitialiser les erreurs
        setResponseData(""); // Réinitialiser le résultat précédent
        setIsLoading(true); // Activer le loader

        try {
            const response = await axios.post("http://127.0.0.1:5000/correction", { text: inputText });
            setResponseData(response.data.correction); // Accéder au champ 'correction'
        } catch (err) {
            console.error("Erreur lors de la requête :", err);
            setError("Une erreur est survenue. Veuillez réessayer.");
        } finally {
            setIsLoading(false); // Désactiver le loader
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Correcteur Automatique AI</h1>
                <p style={styles.subtitle}>
                    Corrigez vos textes de manière fluide et précise grâce à l'intelligence artificielle.
                </p>
            </div>
            <div style={styles.card}>
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
            </div>
            <footer style={styles.footer}>
                <p>© 2024 Correcteur AI | Tous droits réservés</p>
            </footer>
        </div>
    );
}

const styles = {
    container: {
        fontFamily: "'Poppins', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#f8f9fa", // Fond gris très clair et apaisant
        padding: "20px",
    },
    header: {
        textAlign: "center",
        marginBottom: "20px",
    },
    title: {
        fontSize: "36px",
        color: "#2d4059", // Bleu-gris moderne pour une apparence professionnelle
        margin: 0,
    },
    subtitle: {
        fontSize: "18px",
        color: "#4a6572", // Gris légèrement bleuté, complémentaire au titre
    },
    card: {
        width: "100%",
        maxWidth: "700px",
        backgroundColor: "#ffffff", // Fond blanc pur pour le contenu principal
        borderRadius: "12px",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        padding: "30px",
        marginBottom: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    textarea: {
        width: "100%",
        height: "150px",
        marginBottom: "20px",
        padding: "15px",
        fontSize: "16px",
        border: "1px solid #cbd5e0", // Bordure gris clair
        borderRadius: "8px",
        outline: "none",
        resize: "none",
        backgroundColor: "#edf2f7", // Fond gris pastel doux
        color: "#2d4059", // Texte bleu-gris pour une lisibilité optimale
        transition: "border-color 0.3s",
    },
    button: {
        padding: "15px",
        fontSize: "16px",
        fontWeight: "bold",
        color: "#ffffff", // Texte blanc
        backgroundColor: "#00bcd4", // Bleu-cyan apaisant et moderne
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s, transform 0.2s",
    },
    buttonDisabled: {
        backgroundColor: "#b0bec5", // Cyan-gris doux pour désactiver le bouton
        cursor: "not-allowed",
    },
    error: {
        marginTop: "10px",
        color: "#ff6f61", // Rouge corail pour signaler une erreur sans agresser l'œil
        fontSize: "14px",
        textAlign: "center",
    },
    resultContainer: {
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #e0e0e0", // Bordure discrète
        borderRadius: "8px",
        backgroundColor: "#e3f2fd", // Bleu pastel très doux
    },
    resultTitle: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#1e293b", // Bleu marine pour différencier le titre
        marginBottom: "10px",
    },
    resultText: {
        fontSize: "16px",
        lineHeight: "1.5",
        color: "#2d4059", // Texte bleu-gris
        wordBreak: "break-word",
    },
    footer: {
        marginTop: "20px",
        textAlign: "center",
        color: "#607d8b", // Gris bleuté moderne
        fontSize: "14px",
    },
};

export default App;
