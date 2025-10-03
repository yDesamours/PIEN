import { Histogram } from "@upsetjs/plots";
import { useState } from "react";

export default function HistogramView({ data }) {
  const [selection, setSelection] = useState(null);

  return (
    <Histogram
      selection={selection}
      onHover={setSelection}
      width={500}
      height={100}
      elems={data.elems}
      attr="a"
      title={data.title}
      label={data.label}
      actions={false}
    />
  );
}
