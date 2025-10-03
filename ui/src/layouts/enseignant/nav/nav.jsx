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
    <Nav className="w-full flex" id="nav">
      <NavContainer>
        <NavItem>
          <a href="/">
            <img alt="logo" />
          </a>
        </NavItem>
        <NavItem className="flex-1">
          <form onSubmit={onsubmit} className="border">
            <input value={searchInput} onChange={onChange} />
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
              <Icon name="profil" className="w-4" />
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
