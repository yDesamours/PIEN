import { useContext } from "react";
import { dropdownContext } from "./dropdown";

export default function DropdownContainer({ children }) {
  const { open } = useContext(dropdownContext);

  return (
    <>
      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          {children}
        </div>
      )}
    </>
  );
}
