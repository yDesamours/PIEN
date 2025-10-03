import { LineChart } from "@mui/x-charts/LineChart";
import { useMemo } from "react";
import ErrorBoundary from "../../../../components/errorBoundary/errorBoundary";

export default function LinePlotView({ data }) {
  const { rows, headers, description, entete, ligne, unite } = data;

  const elements = useMemo(() => {
    return {
      series: rows
        .filter((row) => !!row.cells[0].value)
        .map(
          (row) => ({
            data: row.cells.slice(1).map((cell) => cell.value),
          }),
          {}
        ),
      xAxis: [
        {
          data: headers.slice(1).map((header) => header.value),
          scaleType: "point",
        },
      ],
    };
  }, [rows, headers]);

  return (
    <ErrorBoundary
      fallback={() => <span>Editer les donnees du tableau</span>}
      key={elements}
    >
      <LineChart series={elements.series} xAxis={elements.xAxis} />
    </ErrorBoundary>
  );
}
