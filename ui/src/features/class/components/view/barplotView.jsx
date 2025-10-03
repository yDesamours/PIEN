import { BarChart } from "@mui/x-charts/BarChart";
import ErrorBoundary from "../../../../components/errorBoundary/errorBoundary";
import { useMemo } from "react";
import { capitalize } from "../../../../utils/utils";

export default function BarplotView({ data }) {
  const { rows, headers, description, orientation, entete, ligne, unite } =
    data;

  const elements = useMemo(() => {
    return {
      dataset: headers.slice(1).map((header, headerIndex) => {
        return {
          [entete]: header.value,
          ...rows.reduce((acc, row, rowIndex) => {
            return {
              ...acc,
              [row.cells[0].value]: Number(row.cells[headerIndex + 1].value),
            };
          }, {}),
        };
      }),
      series: rows
        .filter((row) => !!row.cells[0].value)
        .map(
          (row) => ({
            dataKey: row.cells[0].value,
            label: capitalize(row.cells[0].value),
            formatter: (v) => `${v} ${unite}`,
          }),
          {}
        ),
      xAxis: [{ dataKey: entete }],
      yAxis: [{ dataKey: entete }],
    };
  }, [rows, headers, unite]);

  return (
    <ErrorBoundary
      fallback={() => <span>Editer les donnees du tableau</span>}
      key={elements}
    >
      <BarChart
        dataset={elements.dataset}
        series={elements.series}
        xAxis={elements.xAxis}
        yAxis={elements.yAxis}
        layout={orientation}
      />
    </ErrorBoundary>
  );
}
