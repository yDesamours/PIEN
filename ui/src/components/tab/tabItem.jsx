import { useContext } from "react";
import { tabContext } from "./tab";
import Icon from "../icon/icon";

export default function TabItem({ children, value, icon }) {
  const { setSelected, selected } = useContext(tabContext);

  const isSelected = selected === value;

  return (
    <li
      className="font-bold cursor-pointer flex flex-col gap-1 justify-start"
      onClick={() => setSelected(value)}
    >
      {icon && <Icon name={icon} className="w-4 h-4" />}
      {children}
      <span
        className={`bg-blue-500 transition-all duration-200 ease-in mt-2 ${
          isSelected ? "h-0.5" : "h-0"
        } `}
      ></span>
    </li>
  );
}
