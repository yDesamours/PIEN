import { useContext } from "react";
import { sideBarContext } from "./sidebar";

export default function SidebarHeader({ children, logo }) {
  const { open } = useContext(sideBarContext);

  return (
    <div className="flex justify-center items-center h-15">
      {logo} {open && children}
    </div>
  );
}
