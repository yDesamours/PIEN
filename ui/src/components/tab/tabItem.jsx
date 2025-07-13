import { useContext } from "react";
import { tabContext } from "./tab";

export default function TabItem({ children, value }) {
  const { setSelected, selected } = useContext(tabContext);

  const isSelected = selected === value;

  return (
    <li
      className="font-bold text-lg cursor-pointer flex flex-col justify-start"
      onClick={() => setSelected(value)}
    >
      {children}
      <span
        className={`bg-blue-500 transition-all duration-200 ease-in ${
          isSelected ? "h-1" : "h-0"
        } `}
      ></span>
    </li>
  );
}
