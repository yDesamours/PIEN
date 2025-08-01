import { memo, useCallback, useContext } from "react";
import { sideBarContext } from "./sidebar";
import Icon from "../icon/icon";

const ActualIcon = memo(({ name, ...props }) => (
  <Icon name={name} {...props} className="shrink-0" />
));

export default function SideBarItem({ onClick, icon, children }) {
  const { open } = useContext(sideBarContext);

  return (
    <li className="flex  space-x-2 h-5 ">
      <Icon onClick={onClick} name={icon} />
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
