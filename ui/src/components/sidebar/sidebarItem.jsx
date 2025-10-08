import { useContext } from "react";
import { sideBarContext } from "./sidebar";
import Icon from "../icon/icon";

export default function SideBarItem({ onClick, icon, children }) {
  const { open } = useContext(sideBarContext);

  return (
    <li className="flex  space-x-2 h-5 cursor-pointer items-center text-black text-sm font-medium">
      {icon && <Icon onClick={onClick} name={icon} className="w-4 h-4" />}
      <span
        className={`transition-all duration-1000 ease-out ${
          open ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        {children}
      </span>
    </li>
  );
}
