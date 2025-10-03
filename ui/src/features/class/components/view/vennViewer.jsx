import { extractSets, VennDiagram } from "@upsetjs/react";
import { useMemo } from "react";

export default function VennViewer({ data }) {
  const elems = Object.values(data.sets);

  const sets = useMemo(
    () =>
      extractSets(elems).map((set) => ({
        ...set,
        color: data.sets[set.name].color,
      })),
    [elems]
  );

  return (
    <VennDiagram sets={sets} width={400} height={300} exportButtons={false} />
  );
}
