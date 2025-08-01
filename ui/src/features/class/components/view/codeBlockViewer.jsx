import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeViewer({ data }) {
  const [isCopied, setIsCopied] = useState(false);
  const codeToDisplay = data?.code || "";
  const language = data?.language || "javascript";

  const handleCopy = () => {
    navigator.clipboard
      .writeText(codeToDisplay)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Réinitialiser le message après 2 secondes
      })
      .catch((err) => {
        console.error("Erreur lors de la copie du code:", err);
      });
  };

  if (!codeToDisplay) {
    return null; // Ne rien afficher si le code est vide
  }

  return (
    <div className="relative my-4">
      <SyntaxHighlighter
        language={language}
        style={dracula}
        showLineNumbers
        className="rounded-md"
      >
        {codeToDisplay}
      </SyntaxHighlighter>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 px-3 py-1 text-xs text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors duration-200"
      >
        {isCopied ? "Copié !" : "Copier"}
      </button>
    </div>
  );
}
