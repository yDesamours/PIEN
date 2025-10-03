import { useContext } from "react";
import { tabContext } from "./tab";

export default function TabContent({ children, value }) {
  const { selected } = useContext(tabContext);

  const isSelected = value === selected;

  return isSelected && <div className="tab-content">{children}</div>;
}
