import Nav from "./nav/nav";
import { SideViewer } from "../../components/sideViewer/sideViewer";

import { Outlet } from "react-router";
import Sidebar from "./sidebar/sidebar";
import { useEffect, useRef } from "react";
import Icon from "../../components/icon/icon";
import { useLocation } from "react-router";

export default function EnseignantLayout({ children }) {
  const sideBarRef = useRef();

  const toggleSideBar = () => {
    sideBarRef.current.toggle();
  };

  const location = useLocation();

  useEffect(() => {
    console.log("EnseignantLayout: location changed", location.pathname);
  }, [location]);

  return (
    <>
      <header className="flex ">
        <button onClick={toggleSideBar} className="h-full p-3">
          <Icon name="drawer" />
        </button>
        <Nav />
      </header>
      <div className="flex h-full">
        <aside>
          <Sidebar ref={sideBarRef} />
        </aside>

        <main className="flex-1  p-4">
          <Outlet />
        </main>

        <aside>
          <SideViewer name="notification" title="Dernieres Notifications">
            <p>Liste Notifications</p>
          </SideViewer>
          <SideViewer name="message" title="Derniers Messages">
            <p>Liste Messages</p>
          </SideViewer>
        </aside>
      </div>
    </>
  );
}
