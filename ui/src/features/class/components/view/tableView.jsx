export default function TableView({ data }) {
  const { headers, rows } = data;
  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <table className="min-w-full divide-y divide-gray-500">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th
                key={header.id}
                className="px-3 py-2 text-left border-1 border-gray-300 text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {header.value}
              </th>
            ))}
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
                  {cell.value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
