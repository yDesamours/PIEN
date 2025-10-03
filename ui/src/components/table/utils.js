export function tableRowsToColumns(matrix) {
  if (!Array.isArray(matrix) || matrix.length === 0) return [];

  const maxCols = Math.max(...matrix.map((row) => row.cells?.length));
  return Array.from({ length: maxCols }, (_, colIndex) =>
    matrix.map((row) => row.cells[colIndex] ?? null)
  );
}
