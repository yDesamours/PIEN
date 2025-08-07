export default function Table({
  headers = [],
  rows = [],
  handleHeaderChange = () => {},
  handleDeleteColumn,
  handleAddColumn,
  handleCellChange = () => {},
  handleDeleteRow = () => {},
  handleAddRow = () => {},
}) {
  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Tableau (Éditeur)
      </h3>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-500">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-2 text-left border-1 border-gray-300 text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={header.value}
                      onChange={(e) =>
                        handleHeaderChange(header.id, e.target.value)
                      }
                      className="bg-transparent border-none outline-none focus:outline-blue-500 rounded p-1 w-full"
                    />
                    {headers.length > 1 && handleDeleteColumn && (
                      <button
                        onClick={() => handleDeleteColumn(header.id)}
                        className="ml-2 p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                </th>
              ))}
              {handleAddColumn && (
                <th className="px-3 py-2 text-left">
                  <button
                    onClick={handleAddColumn}
                    className="px-2 py-1 text-xs text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    +
                  </button>
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row) => (
              <tr key={row.id}>
                {row.cells.map((cell) => (
                  <td
                    key={cell.id}
                    className="px-3 py-2 whitespace-nowrap border-1 border-gray-300"
                  >
                    <input
                      type="text"
                      value={cell.value || ""}
                      onChange={(e) =>
                        handleCellChange(row.id, cell.column, e.target.value)
                      }
                      className="bg-transparent border-none outline-none focus:outline-blue-500 rounded p-1 w-full"
                    />
                  </td>
                ))}
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleDeleteRow(row.id)}
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
