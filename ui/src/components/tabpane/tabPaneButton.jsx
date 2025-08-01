import { useContext } from "react";
import { tabPaneContext } from "./tabpane";

export default function TabPaneButton({
  value,
  children,
  className = "",
  selectedClassName = "",
}) {
  const { setVisible, visible } = useContext(tabPaneContext);

  const onClick = () => {
    setVisible(value);
  };
  return (
    <li
      role="tab"
      className={`cursor-pointer flex items-center p-2 ${className} ${
        visible === value ? selectedClassName : ""
      }`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
