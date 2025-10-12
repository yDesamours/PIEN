import { useContext } from "react";
import Logout from "../../assets/icons/logout.svg?react";
import { sideBarContext } from "./sidebar";
import User from "../../features/auth/components/user";

export default function SideBarFooter() {
  const { open } = useContext(sideBarContext);
  return (
    <aside className="grid grid-cols-7 fixed bottom-0 gap-1 text-xs pb-1">
      <p>logo</p>
      {open && (
        <>
          <User className="col-span-5" />
          <Logout />
        </>
      )}
    </aside>
  );
}
