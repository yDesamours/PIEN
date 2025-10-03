import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath, BlockMath } from "react-katex";

export default function FormulaViewer({ data }) {
  const formula = data?.formula || "";

  if (!formula.trim()) {
    return null; // Ne rien afficher si la formule est vide
  }

  const isBlockFormula =
    formula.includes("\\begin{") || formula.includes("\\begin{align}");

  return (
    <div className="my-4 p-4 border rounded-md border-gray-200 bg-gray-50">
      {isBlockFormula ? (
        <BlockMath math={formula} />
      ) : (
        <InlineMath math={formula} />
      )}
    </div>
  );
}
