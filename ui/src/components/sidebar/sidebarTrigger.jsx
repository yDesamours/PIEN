import { useContext } from "react";
import { sideBarContext } from "./sidebar";

export default function SideBarTrigger({ children }) {
  const { toggle } = useContext(sideBarContext);

  return (
    <div
      onClick={toggle}
      role="button"
      className=" flex mb-2 text-black cursor-pointer"
    >
      {children}
    </div>
  );
}
