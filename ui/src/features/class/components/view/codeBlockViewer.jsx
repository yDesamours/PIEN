import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  dracula,
  oneLight,
  atomDark,
  twilight,
  coy,
  coldarkCold,
} from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlockViewer({ data }) {
  const [isCopied, setIsCopied] = useState(false);
  const codeToDisplay = data?.content || "";
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
      <div className="flex justify-between bg-[#E3EAF2] p-4 rounded-t-xl">
        <p>{data.language}</p>
        <button
          onClick={handleCopy}
          className="px-3 py-1 text-xs text-white bg-gray-600 rounded-md hover:bg-gray-700 transition-colors duration-200"
        >
          {isCopied ? "Copié !" : "Copier"}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={coldarkCold}
        showLineNumbers
        className="rounded-b-xl"
      >
        {codeToDisplay}
      </SyntaxHighlighter>
    </div>
  );
}
