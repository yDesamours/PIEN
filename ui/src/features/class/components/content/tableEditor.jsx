import React, { useState, useEffect } from "react";
import { id } from "../../../../utils/utils";
import Table from "../../../../components/table/table";

export default function TableEditor({ data, save }) {
  // Initialisation avec des données par défaut si l'objet de données est vide.
  const headers = data.headers;
  const rows = data.rows;

  // Gestion des en-têtes
  const handleHeaderChange = (id, value) => {
    const updatedHeader = headers.find((h) => h.id === id);
    if (!updatedHeader) {
      return;
    }
    updatedHeader.value = value;

    save({ headers: headers });
  };

  const handleAddColumn = () => {
    const headerId = id();
    const newHeaders = [...headers, { id: headerId, name: "Nouvelle Colonne" }];

    // Ajouter une nouvelle colonne vide à chaque ligne
    const updatedRows = rows.map((row) => ({
      id: row.id,
      cells: [...row.cells, { column: headerId, value: "", id: headerId }],
    }));

    save({ headers: newHeaders, rows: updatedRows });
  };

  const handleDeleteColumn = (id) => {
    const headerToDelete = headers.find((h) => h.id === id);
    if (!headerToDelete) return;

    const updatedHeaders = headers.filter((h) => h.id !== id);

    // Supprimer la colonne correspondante de chaque ligne
    const updatedRows = rows.map((row) => {
      const newRow = {
        id: row.id,
        cells: row.cells.filter((col) => col.column !== headerToDelete.id),
      };
      return newRow;
    });
    save({ headers: updatedHeaders, rows: updatedRows });
  };

  // Gestion des lignes
  const handleCellChange = (id, header, value) => {
    const updateRow = rows.find((r) => r.id === id);
    if (!updateRow) return;
    const cellUpdate = updateRow.cells.find((c) => c.column === header);
    cellUpdate.value = value;

    save({ rows });
  };

  const handleAddRow = () => {
    const newCells = headers.reduce(
      (acc, header) => acc.concat({ column: header.id, value: "", id: id() }),
      []
    );
    const newRow = { id: id(), cells: newCells };
    save({ rows: [...rows, newRow] });
  };

  const handleDeleteRow = (rowId) => {
    const updatedRows = rows.filter((r) => r.id !== rowId);
    save({ rows: updatedRows });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Tableau (Éditeur)
      </h3>

      <Table
        headers={headers}
        rows={rows}
        handleAddColumn={handleAddColumn}
        handleAddRow={handleAddRow}
        handleCellChange={handleCellChange}
        handleDeleteColumn={handleDeleteColumn}
        handleDeleteRow={handleDeleteRow}
        handleHeaderChange={handleHeaderChange}
      />
    </div>
  );
}
