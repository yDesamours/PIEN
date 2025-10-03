import { PieChart } from "@mui/x-charts/PieChart";
import ErrorBoundary from "../../../../components/errorBoundary/errorBoundary";
import { useMemo } from "react";

export default function PieChartView({ data }) {
  const { rows, headers, description, entete, ligne, unite } = data;

  const elements = useMemo(() => {
    return {
      series: headers.slice(1).map((_, headerIndex) => ({
        data: rows.map((row) => ({
          value: row.cells[headerIndex + 1].value,
          label: row.cells[0].value,
        })),
      })),
    };
  }, [rows, headers]);

  return (
    <ErrorBoundary
      fallback={() => <span>Editer les donnees du tableau</span>}
      key={elements}
    >
      <PieChart series={elements.series} xAxis={elements.xAxis} />
    </ErrorBoundary>
  );
}
