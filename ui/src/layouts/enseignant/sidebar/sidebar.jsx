import { forwardRef, useContext } from "react";
import { useNavigate } from "react-router";
import {
  SideBar,
  SideBarContent,
  SideBarItem,
  SideBarTrigger,
} from "../../../components/sidebar";
import { sideBarContext } from "../../../components/sidebar/sidebar";

export default forwardRef(function EnseignantSidebar(_, ref) {
  const { toggle, open } = useContext(sideBarContext);
  const navigate = useNavigate();

  const onItemClicked = (path) => {
    console.log("Navigating to:", `/enseignant/${path}`);
    if (!open) {
      toggle();
    }
    navigate(`/enseignant/${path}`, { replace: true });
  };

  return (
    <SideBar ref={ref}>
      {/* <SideBarTrigger /> */}
      <SideBarContent>
        <SideBarItem
          label="Dashboard"
          icon="home"
          onClick={() => onItemClicked("dashboard")}
        />
        <SideBarItem
          label="item 1"
          icon="book"
          onClick={() => onItemClicked("cours")}
        />
      </SideBarContent>
    </SideBar>
  );
});
