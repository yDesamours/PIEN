import { useContext } from "react";
import { sideBarContext } from "./sidebar";
import Icon from "../icon/icon";

export default function SideBarItem({ onClick, icon, label }) {
  const { open } = useContext(sideBarContext);
  return (
    <li
      onClick={onClick}
      className="flex  space-x-2 h-5 transition-all duration-200"
    >
      <Icon name={icon} className="shrink-0" />
      {open && <span>{label}</span>}
    </li>
  );
}
