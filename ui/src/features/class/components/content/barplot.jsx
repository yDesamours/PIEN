import { useState, useMemo } from "react";
import { BarChart } from "@upsetjs/plots";
import Modal from "../../../../components/modal/modal";
import Table from "../../../../components/table/table";
import { id } from "../../../../utils/utils";

export default function BarplotEditor({ data, save }) {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(null);
  const { rows, headers } = data;
  const elems = useMemo(
    () =>
      Array(100)
        .fill(0)
        .map((_, i) => ({
          n: i.toString(),
          a: Math.random(),
        })),
    []
  );

  const onEditDiagram = () => {
    setOpen(true);
  };

  const onEditDiagramEnd = () => {
    setOpen(false);
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

  const handleAdd = () =>
    setElems((prev) => [
      ...prev,
      { name: `${prev.length + 1}`, sets: [], score: 0 },
    ]);

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
          <div className="flex h-full overflow-auto">
            <div className="flex-4">
              <Table
                rows={rows}
                headers={headers}
                handleAddRow={handleAddRow}
                handleDeleteRow={handleDeleteRow}
              />
            </div>
            <div className="flex-1">
              <BarChart
                width={500}
                height={100}
                selection={selection}
                onHover={setSelection}
                elems={elems}
                vAttr="a"
                iAttr="n"
              />
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
