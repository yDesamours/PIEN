import { useContext } from "react";
import Logout from "../../assets/icons/logout.svg?react";
import { sideBarContext } from "./sidebar";
import User from "../../features/auth/components/user";

export default function SideBarFooter() {
  const { open } = useContext(sideBarContext);
  return (
    <aside className="grid grid-cols-7 fixed bottom-0 gap-1 text-xs pb-1">
      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
        JN
      </div>
      {open && (
        <>
          <User className="col-span-5" />
          <Logout />
        </>
      )}
    </aside>
  );
}
