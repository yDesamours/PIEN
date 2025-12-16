import { NavLink } from "react-router-dom";
import {
  SideBar,
  SideBarContent,
  SideBarItem,
  SideBarTrigger,
} from "../../../components/sidebar";
import SidebarHeader from "../../../components/sidebar/sidebarHeader";
import Divider from "../../../components/divider/divider";
import SideBarFooter from "../../../components/sidebar/sidebarFooter";

export default function EnseignantSidebar() {
  return (
    <SideBar>
      <SideBarTrigger>
        <SidebarHeader logo={<img alt="logo" src="/logo.png" width="40" />}>
          <p>PIEN</p>
        </SidebarHeader>
      </SideBarTrigger>
      <SideBarContent>
        <Divider />
        <SideBarItem icon="home">
          <NavLink to="dashboard" className="p-2">
            Dashboard
          </NavLink>
        </SideBarItem>
        <SideBarItem icon="book">
          <NavLink to="creationClasse" className="p-2">
            Classe
          </NavLink>
        </SideBarItem>
        <SideBarItem icon="eleve">
          <NavLink to="creationClasse" className="p-2">
            Eleve
          </NavLink>
        </SideBarItem>
        <SideBarItem icon="evaluation">
          <NavLink to="creationClasse" className="p-2">
            Evaluation
          </NavLink>
        </SideBarItem>
        <SideBarItem icon="configuration">
          <NavLink to="creationClasse" className="p-2">
            Configuration
          </NavLink>
        </SideBarItem>
        <SideBarItem icon="line">
          <NavLink to="creationClasse" className="p-2">
            Rapport
          </NavLink>
        </SideBarItem>
       
      </SideBarContent>
      <SideBarFooter />
    </SideBar>
  );
}
