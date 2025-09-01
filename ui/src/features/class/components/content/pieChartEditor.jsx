import { useState, useMemo, useCallback } from "react";

import Modal from "../../../../components/modal/modal";
import Table from "../../../../components/table/table";
import { capitalize, id } from "../../../../utils/utils";
import ErrorBoundary from "../../../../components/errorBoundary/errorBoundary";
import { PieChart } from "@mui/x-charts/PieChart";

export default function PieChartEditor({ data, save }) {
  const [open, setOpen] = useState(false);
  const { rows, headers, description, orientation, entete, ligne, unite } =
    data;

  const elements = useMemo(() => {
    return {
      series: headers.slice(1).map((header, headerIndex) => ({
        data: rows.map((row) => ({
          value: row.cells[headerIndex + 1].value,
          label: row.cells[0].value,
        })),
      })),
    };
  }, [rows, headers]);

  const onEditDiagram = () => {
    setOpen(true);
  };

  const onEditDiagramEnd = () => {
    setOpen(false);
  };

  const handleHeaderChange = (id, value) => {
    const updatedHeader = headers.find((h) => h.id === id);
    if (!updatedHeader) {
      return;
    }
    updatedHeader.value = value;

    save({ headers: headers });
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

  const handleCellChange = (id, header, value) => {
    const updateRow = rows.find((r) => r.id === id);
    if (!updateRow) return;
    const cellUpdate = updateRow.cells.find((c) => c.column === header);
    cellUpdate.value = value;

    save({ rows });
  };

  const onDescriptionChange = (e) => {
    const { value, name } = e.target;
    if (
      name === "orientation" &&
      value !== "vertical" &&
      value !== "horizontal"
    )
      return;
    save({ [name]: e.target.value });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Diagramme en Batons
      </h3>

      <div className="p-6 border rounded-lg shadow bg-white space-y-4">
        <button
          onClick={onEditDiagram}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Editer
        </button>

        <Modal
          isOpen={open}
          onClose={onEditDiagramEnd}
          title="Modifier le diagramme"
        >
          <div className="flex h-full gap-2 overflow-auto">
            <div className="flex-4">
              <Table
                rows={rows}
                headers={headers}
                handleAddRow={handleAddRow}
                handleDeleteRow={handleDeleteRow}
                handleCellChange={handleCellChange}
                handleHeaderChange={handleHeaderChange}
                dataset={true}
              />
            </div>
            <div className="flex-2 flex flex-col">
              <div className="flex-3">
                <ErrorBoundary
                  fallback={() => <span>Editer les donnees du tableau</span>}
                  key={elements}
                >
                  <PieChart series={elements.series} xAxis={elements.xAxis} />
                </ErrorBoundary>
              </div>
              <form className="flex flex-col flex-1 rounded-xl bg-background-1 p-6 m-4 text-lg space-y-5 shadow-md">
                <label className="font-medium text-gray-800 grid grid-cols-4 gap-8 items-end">
                  <span className="mb-1 ">Entête</span>
                  <input
                    name="entete"
                    type="text"
                    value={entete}
                    onChange={onDescriptionChange}
                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white col-span-3"
                    placeholder="Saisir l'entête"
                  />
                </label>

                <label className="font-medium text-gray-800 grid grid-cols-4 gap-8 items-end">
                  <span className="mb-1 ">Ligne</span>
                  <input
                    name="ligne"
                    type="text"
                    value={ligne}
                    onChange={onDescriptionChange}
                    className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white col-span-3"
                    placeholder="Saisir la ligne"
                  />
                </label>
              </form>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
