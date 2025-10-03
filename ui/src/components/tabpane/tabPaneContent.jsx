import { useContext } from "react";
import { tabPaneContext } from "./tabpane";

export default function TabPaneContent({ value, children }) {
  const { visible } = useContext(tabPaneContext);

  return visible === value ? <>{children}</> : null;
}
