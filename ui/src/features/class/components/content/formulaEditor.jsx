import React, { useState, useEffect } from "react";
import "katex/dist/katex.min.css";
import Info from "../../../../assets/icons/info.svg?react";

export default function FormulaEditor({ data, save, id }) {
  const [inputValue, setInputValue] = useState(data?.formula || "");
  const idComponent = "formula-input-".concat(id);

  // Utilisation d'un effet avec un timer pour le débouncing
  useEffect(() => {
    const handler = setTimeout(() => {
      save({ formula: inputValue });
    }, 500); // Sauvegarde après 500ms d'inactivité

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, save]);

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-1">
        <span>Formule Mathématique </span>
        <div title="Écrivez votre formule en LaTeX ici">
          <Info className="w-4 h-4" />
        </div>
      </h3>

      <div className="flex flex-col gap-4">
        <form className="flex flex-col">
          <label
            htmlFor={idComponent}
            className="text-sm font-medium text-gray-700 sr-only"
          >
            Écrivez votre formule en LaTeX ici
          </label>
          <textarea
            id={idComponent}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none font-mono text-sm"
            rows="1"
            placeholder="Ex: c = \\sqrt{a^2 + b^2}"
          ></textarea>
        </form>
      </div>
    </div>
  );
}
