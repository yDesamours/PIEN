import Nav from "./nav/nav";
import { SideViewer } from "../../components/sideViewer/sideViewer";

import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar/sidebar";
import { createContext, useRef, useState } from "react";
import Icon from "../../components/icon/icon";
import Title from "../../components/title/title";

export const titleContext = createContext({ setTitle: () => {} });

export default function EnseignantLayout({ children }) {
  const sideBarRef = useRef();

  const toggleSideBar = () => {
    sideBarRef.current.toggle();
  };

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
          <Sidebar forwardRef={sideBarRef} />
        </aside>

        <main className="flex-1">
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
