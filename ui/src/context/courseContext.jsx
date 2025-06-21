import { createContext, useReducer, useState } from "react";
import { BoxArgument } from "../features/class/utils/utils";

export const courseBuilderContext = createContext({
  content: { blocks: [] },
  load: () => {},
  save: () => {},
  add: () => {},
  duplicate: () => {},
  deleteBox: () => {},
  openChooser: () => {},
  closeChooser: () => {},
  chooserOpened: false,
});

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return {
        ...state,
        blocks: [...state.blocks, action.payload],
      };
    case "ADD_AFTER":
      const index = state.blocks.findIndex(
        (e) => e.id === action.payload.after
      );
      const newBlocks = [...state.blocks];
      newBlocks.splice(index + 1, 0, action.payload.contentType);
      return {
        ...state,
        blocks: newBlocks,
      };
    case "DELETE":
      return {
        ...state,
        blocks: state.blocks.filter((e) => e.id !== action.payload),
      };
    case "LOAD":
      return {
        ...state,
        blocks: action.payload,
      };
    default:
      return state;
  }
};

export default function CourseBulderProvider({ children }) {
  const [course, dispacth] = useReducer(reducer, { blocks: [] });
  const [chooserOpened, setChoserOpened] = useState(false);

  const openChooser = () => {
    setChoserOpened(true);
  };

  const closeChooser = () => {
    setChoserOpened(false);
  };

  const load = () => {};

  const save = () => {};

  const deleteBox = (id) => {
    dispacth({ type: "DELETE", payload: id });
  };

  const add = (component) => {
    const id = crypto.randomUUID();
    const contentType = new BoxArgument(component, {}, id);
    dispacth({ type: "ADD", payload: contentType });
  };

  const duplicate = (after) => {
    const id = crypto.randomUUID();
    const model = course.blocks.find((e) => e.id === after);
    const contentType = new BoxArgument(model.component, {}, id);
    dispacth({ type: "ADD_AFTER", payload: { contentType, after } });
  };

  return (
    <courseBuilderContext.Provider
      value={{
        content: course,
        load,
        save,
        add,
        duplicate,
        deleteBox,
        openChooser,
        closeChooser,
        chooserOpened,
      }}
    >
      {children}
    </courseBuilderContext.Provider>
  );
}
