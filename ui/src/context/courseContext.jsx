import { createContext, useReducer, useState } from "react";
import { BoxArgument } from "../features/class/utils/utils";

export const courseBuilderContext = createContext({
  content: { blocks: [] },
  load: () => {},
  save: () => {},
  saveBlock: () => {},
  add: () => {},
  addAfter: () => {},
  duplicate: () => {},
  deleteBox: () => {},
  openChooser: () => {},
  closeChooser: () => {},
  chooserOpened: false,
  newOrder: 0,
});

function addBlock(blocks, payload) {
  const newOrderIndex = blocks.findIndex((i) => i.id === payload.id);
  if (newOrderIndex < 0) {
    return blocks;
  }
  const newOrder = blocks[newOrderIndex];

  const newBlocks = blocks.slice();
  blocks.splice(newOrderIndex, 1, {
    ...payload.contentType,
    order: newOrder.order,
  });

  return newBlocks;
}

function addAfter(blocks, payload) {
  const blockIndex = blocks.findIndex((e) => e.id === payload);
  if (blockIndex < 0) {
    return blocks;
  }
  const block = blocks[blockIndex];

  const newBlocks = blocks.slice().map((b) => {
    if (b.order > block.order) {
      return {
        ...b,
        order: b.order + 1,
      };
    }
    return b;
  });
  newBlocks.splice(blockIndex, 0, {
    component: "new",
    order: block.order + 1,
    id: crypto.randomUUID(),
  });

  return newBlocks;
}

function deleteBlock(blocks, payload) {
  const blockIndex = blocks.findIndex((e) => e.id === payload);
  if (blockIndex < 0) return blocks;

  const newBlocks = blocks.slice().map((b) => {
    if (b.order > blocks[blockIndex].order) {
      return {
        ...b,
        order: b.order - 1,
      };
    }
    return b;
  });

  newBlocks.splice(blockIndex, 1);

  if (newBlocks.length === 0)
    newBlocks.push({ component: "new", order: 0, id: crypto.randomUUID() });
  return newBlocks;
}

function saveBlock(blocks, id, data) {
  const blockIndex = blocks.findIndex((e) => e.id === id);
  if (blockIndex < 0) return blocks;

  const newBlocks = blocks.slice();
  const block = { ...blocks[blockIndex] };

  block.data = data;
  newBlocks.splice(blockIndex, 1, block);
  return newBlocks;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, blocks: addBlock(state.blocks, action.payload) };

    case "ADD_AFTER":
      return { ...state, blocks: addAfter(state.blocks, action.payload) };

    case "DELETE":
      return { ...state, blocks: deleteBlock(state.blocks, action.payload) };

    case "LOAD":
      return {
        ...state,
        blocks: action.payload,
      };
    case "SAVE_BLOCK":
      return {
        ...state,
        blocks: saveBlock(state.blocks, action.payload.id, action.payload.data),
      };
    default:
      return state;
  }
};

export default function CourseBulderProvider({ children }) {
  const [course, dispacth] = useReducer(reducer, {
    blocks: [{ component: "new", order: 0, id: crypto.randomUUID() }],
  });
  const [chooserOpened, setChoserOpened] = useState(null);

  const closeChooser = () => {
    setChoserOpened(null);
  };

  const openChooser = (id) => {
    setChoserOpened(id);
  };

  const load = () => {};

  const save = () => {};

  const deleteBox = (id) => {
    dispacth({ type: "DELETE", payload: id });
  };

  const add = (component) => {
    const id = crypto.randomUUID();
    const contentType = new BoxArgument(component, null, id);
    dispacth({ type: "ADD", payload: { contentType, id: chooserOpened } });
    closeChooser();
  };

  const addAfter = (id) => {
    dispacth({ type: "ADD_AFTER", payload: id });
  };

  const duplicate = (after) => {
    const id = crypto.randomUUID();
    const model = course.blocks.find((e) => e.id === after);
    const contentType = new BoxArgument(model.component, {}, id);
    dispacth({ type: "ADD_AFTER", payload: { contentType, after } });
  };

  const saveBlock = (id, data) => {
    dispacth({ type: "SAVE_BLOCK", payload: { id, data } });
  };

  return (
    <courseBuilderContext.Provider
      value={{
        content: course,
        load,
        save,
        add,
        addAfter,
        duplicate,
        deleteBox,
        openChooser,
        closeChooser,
        chooserOpened,
        saveBlock,
      }}
    >
      {children}
    </courseBuilderContext.Provider>
  );
}
