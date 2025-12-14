import { Nav, NavItem, NavContainer } from "../../../components/nav";
import {
  Dropdown,
  DropdownContainer,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "../../../components/dropdown";
import { useContext, useState } from "react";
import { sideViewerContext } from "../../../components/sideViewer/sideViewer";
import Notification from "./notification";
import Message from "./message";
import Icon from "../../../components/icon/icon";
import User from "../../../features/auth/components/user";
export default function EnseignantNav() {
  const [searchInput, setSearchInput] = useState("");
  const { open } = useContext(sideViewerContext);

  const onChange = (e) => {
    setSearchInput(e.target.value);
  };

  const onsubmit = (e) => {
    e.preventDefault();
  };

  const showNotifications = () => {
    open("notification");
  };

  const showMessages = () => {
    open("message");
  };

  return (
    <Nav className="flex flex-1" id="nav">
      <NavContainer>
        <NavItem className="flex-1">
          <form className=" max-w-4xl flex flex-col gap-2 rounded-xl p-6">
            <fieldset className="w- border-1 p-1 border-gray-400 rounded-sm flex">
              <input name="search" className="h-6 border-none flex-1 " />
              <button className="bg-primary rounded-sm w-6">🔎</button>
            </fieldset>
          </form>
        </NavItem>
        <NavItem onClick={showNotifications}>
          <Notification />
        </NavItem>
        <NavItem onClick={showMessages}>
          <Message />
        </NavItem>
        <NavItem>
          <Dropdown>
            <DropdownTrigger>
              <User className="text-xs text-left w-20" />
            </DropdownTrigger>
            <DropdownContainer>
              <DropdownContent>
                <DropdownItem>Profil</DropdownItem>
                <DropdownItem>Parametres</DropdownItem>
                <DropdownItem>Deconnexion</DropdownItem>
              </DropdownContent>
            </DropdownContainer>
          </Dropdown>
        </NavItem>
      </NavContainer>
    </Nav>
  );
}
