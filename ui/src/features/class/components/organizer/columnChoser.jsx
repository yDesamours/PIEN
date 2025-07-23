import { useCallback } from "react";
import { useResourceChoser } from "./resourceChoser";

export default function ColumnChoser({ index, onChoose }) {
  const { openChoser } = useResourceChoser();

  const chooseComponent = useCallback((component) => {
    onChoose(index, component);
  }, []);

  return <div onClick={() => openChoser(chooseComponent)}>choose</div>;
}
