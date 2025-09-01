import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  SideBar,
  SideBarContent,
  SideBarItem,
} from "../../../components/sidebar";
import { titleContext } from "../enseignantMainLayout";

export default function EnseignantSidebar({ forwardRef }) {
  const { setTitle } = useContext(titleContext);
  const onItemClicked = () => {
    if (forwardRef.current) {
      forwardRef.current.open();
    }
  };

  return (
    <SideBar ref={forwardRef}>
      <SideBarContent>
        <SideBarItem label="Dashboard" icon="home" onClick={onItemClicked}>
          <NavLink
            to="dashboard"
            onClick={() => setTitle("dashboard")}
            className="p-2"
          >
            Dashboard
          </NavLink>
        </SideBarItem>
        <SideBarItem label="item 1" icon="book" onClick={onItemClicked}>
          <NavLink
            to="classes"
            onClick={() => setTitle("Mes classes")}
            className="p-2"
          >
            Classes
          </NavLink>
        </SideBarItem>
        <SideBarItem label="item 1" icon="book" onClick={onItemClicked}>
          <NavLink
            to="classes"
            onClick={() => setTitle("Mes classes")}
            className="p-2"
          >
            Conversations
          </NavLink>
        </SideBarItem>
        <SideBarItem label="item 1" icon="book" onClick={onItemClicked}>
          <NavLink
            to="classes"
            onClick={() => setTitle("Mes classes")}
            className="p-2"
          >
            Forums
          </NavLink>
        </SideBarItem>
      </SideBarContent>
    </SideBar>
  );
}
