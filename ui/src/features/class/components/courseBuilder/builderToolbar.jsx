import { useContext } from "react";
import Toolbar from "./toolbar/toolbar";
import ToolbarContent from "./toolbar/toolbarContent";
import { courseBuilderContext } from "../../../../context/courseContext";
import ToolbarItem from "./toolbar/toolbarItem";
import { tabPaneContext } from "../../../../components/tabpane/tabpane";

export default function BuilderToolbar() {
  const {} = useContext(courseBuilderContext);
  const { setVisible, visible } = useContext(tabPaneContext);

  const text = visible === "preview" ? "Editer" : "Previsualiser";

  const toggle = () => {
    const tab = visible === "preview" ? "builder" : "preview";
    setVisible(tab);
  };

  return (
    <Toolbar className="bg-amber-300 h-12">
      <ToolbarContent>
        <ToolbarItem onClick={toggle}>{text}</ToolbarItem>
        <ToolbarItem>Save</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
}
