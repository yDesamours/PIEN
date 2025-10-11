import { useContext } from "react";
import { dropdownContext } from "./dropdown";
import Icon from "../icon/icon";

export default function DropdownTrigger({ children, className, icon }) {
  const { toggle } = useContext(dropdownContext);
  return (
    <button
      onClick={toggle}
      className={`${className} inline-flex justify-center items-center w-full rounded-md px-1 py-1 text-sm font-medium outline-none`}
    >
      {children}
      {icon ? (
        <Icon name={icon} stroke="#2196f3" />
      ) : (
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 011.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z" />
        </svg>
      )}
    </button>
  );
}
