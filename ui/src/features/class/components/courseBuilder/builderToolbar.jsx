import { useContext } from "react";
import Toolbar from "./toolbar/toolbar";
import ToolbarContent from "./toolbar/toolbarContent";
import { courseBuilderContext } from "../../../../context/courseContext";
import ToolbarItem from "./toolbar/toolbarItem";
import { tabPaneContext } from "../../../../components/tabpane/tabpane";
import Undo from "../../../../assets/icons/undo.svg?react";
import Redo from "../../../../assets/icons/redo.svg?react";
import Pen from "../../../../assets/icons/pen.svg?react";

export default function BuilderToolbar() {
  const { description, descriptionOpen, openDescription, undo, redo } =
    useContext(courseBuilderContext);
  const { setVisible, visible } = useContext(tabPaneContext);

  const text = visible === "preview" ? "Editer" : "Previsualiser";

  const toggle = () => {
    const tab = visible === "preview" ? "builder" : "preview";
    setVisible(tab);
  };

  /**
   *
   * @param {MouseEvent} e
   */

  return (
    <Toolbar className="bg-primary text-white text-sm h-12">
      <ToolbarContent>
        <ToolbarItem className="flex-1">
          {description.title}
          {!descriptionOpen && (
            <span>
              <Pen
                role="button"
                onClick={openDescription}
                className="w-6 h-6 cursor-pointer"
                stroke="white"
              />
            </span>
          )}
        </ToolbarItem>
        {visible !== "preview" && (
          <>
            <ToolbarItem>
              <Undo onClick={undo} className="w-8 h-8" stroke="white" />
            </ToolbarItem>
            <ToolbarItem>
              <Redo onClick={redo} className="w-8 h-8" stroke="white" />
            </ToolbarItem>
          </>
        )}

        <ToolbarItem onClick={toggle}>{text}</ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
}
