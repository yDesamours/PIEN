import React, { useState, useEffect } from "react";

export default function TableEditor({ data, save }) {
  // Initialisation avec des données par défaut si l'objet de données est vide.
  const initialHeaders = data?.headers || ["Colonne 1", "Colonne 2"];
  const initialRows = data?.rows || [{ "Colonne 1": "", "Colonne 2": "" }];

  const [headers, setHeaders] = useState(initialHeaders);
  const [rows, setRows] = useState(initialRows);

  // Débouncing pour la sauvegarde
  useEffect(() => {
    const handler = setTimeout(() => {
      save({ headers, rows });
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [headers, rows, save]);

  // Gestion des en-têtes
  const handleHeaderChange = (index, value) => {
    const updatedHeaders = [...headers];
    updatedHeaders[index] = value;
    setHeaders(updatedHeaders);

    // Mettre à jour les clés des lignes
    const oldHeader = headers[index];
    const updatedRows = rows.map((row) => {
      const newRow = {};
      for (const key in row) {
        if (key === oldHeader) {
          newRow[value] = row[key];
        } else {
          newRow[key] = row[key];
        }
      }
      return newRow;
    });
    setRows(updatedRows);
  };

  const handleAddColumn = () => {
    const newHeader = `Nouvelle colonne`;
    setHeaders([...headers, newHeader]);

    // Ajouter une nouvelle colonne vide à chaque ligne
    const updatedRows = rows.map((row) => ({ ...row, [newHeader]: "" }));
    setRows(updatedRows);
  };

  const handleDeleteColumn = (index) => {
    const updatedHeaders = headers.filter((_, i) => i !== index);
    setHeaders(updatedHeaders);

    // Supprimer la colonne correspondante de chaque ligne
    const headerToDelete = headers[index];
    const updatedRows = rows.map((row) => {
      const newRow = { ...row };
      delete newRow[headerToDelete];
      return newRow;
    });
    setRows(updatedRows);
  };

  // Gestion des lignes
  const handleCellChange = (rowIndex, header, value) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][header] = value;
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = headers.reduce(
      (acc, header) => ({ ...acc, [header]: "" }),
      {}
    );
    setRows([...rows, newRow]);
  };

  const handleDeleteRow = (rowIndex) => {
    const updatedRows = rows.filter((_, i) => i !== rowIndex);
    setRows(updatedRows);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Tableau (Éditeur)
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={header}
                      onChange={(e) =>
                        handleHeaderChange(index, e.target.value)
                      }
                      className="bg-transparent border-none outline-none focus:outline-blue-500 rounded p-1 w-full"
                    />
                    {headers.length > 1 && (
                      <button
                        onClick={() => handleDeleteColumn(index)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </th>
              ))}
              <th className="px-3 py-2 text-left">
                <button
                  onClick={handleAddColumn}
                  className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md hover:bg-blue-600"
                >
                  +
                </button>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-3 py-2 whitespace-nowrap">
                    <input
                      type="text"
                      value={row[header] || ""}
                      onChange={(e) =>
                        handleCellChange(rowIndex, header, e.target.value)
                      }
                      className="bg-transparent border-none outline-none focus:outline-blue-500 rounded p-1 w-full"
                    />
                  </td>
                ))}
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleDeleteRow(rowIndex)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    &times;
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleAddRow}
        className="mt-4 px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
      >
        Ajouter une ligne
      </button>
    </div>
  );
}
