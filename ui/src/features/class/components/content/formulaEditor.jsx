import React, { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export default function FormulaEditor({ data, save }) {
  const [inputValue, setInputValue] = useState(data?.formula || "");

  // Utilisation d'un effet avec un timer pour le débouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      save({ formula: inputValue });
    }, 500); // Sauvegarde après 500ms d'inactivité

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, save]);

  const isBlockFormula =
    inputValue.includes("\\begin{") || inputValue.includes("\\begin{align}");

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Formule Mathématique (Éditeur)
      </h3>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label
            htmlFor="formula-input"
            className="text-sm font-medium text-gray-700"
          >
            Écrivez votre formule en LaTeX ici :
          </label>
          <textarea
            id="formula-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 font-mono text-sm"
            rows="5"
            placeholder="Ex: c = \\sqrt{a^2 + b^2}"
          ></textarea>
        </div>

        {/* Aperçu en temps réel */}
        {inputValue.trim() && (
          <div className="mt-4">
            <h4 className="text-md font-semibold text-gray-800 mb-2">Aperçu</h4>
            <div className="p-4 border rounded-md border-gray-200 bg-gray-50">
              {/* Le composant rend InlineMath par défaut, mais si la formule contient des
                  balises de bloc LaTeX, on utilise BlockMath. */}
              {isBlockFormula ? (
                <BlockMath math={inputValue} />
              ) : (
                <InlineMath math={inputValue} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
