import {
  createContext,
  useCallback,
  useMemo,
  useReducer,
  useState,
} from "react";
import { boxArgument } from "../features/class/utils/utils";
import ResourceChoser from "../features/class/components/organizer/resourceChoser";
import { deepCopyJSON } from "../utils/utils";

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
  getData: () => {},
});

const getInitialComponentData = (componentType) => {
  switch (componentType) {
    case "twoColumns":
      return {
        first: { component: "columnChoser" },
        second: { component: "columnChoser" },
      };
    case "audio":
      return null;
    case "video":
      return null;
    case "document":
      return null;
    case "questionLibre":
      return { content: "" };
    case "vraiFaux":
      return { content: "" };
    case "questionMultiple":
      return { content: "", reponses: [] };
    case "3d":
      return null;
  }

  return {}; // Retourne un objet vide par défaut pour les autres types
};

function addBlock(blocks, payload) {
  // Le `payload.id` est l'ID du bloc "new" que nous cherchons à remplacer.
  const newOrderIndex = blocks.findIndex((i) => i.id === payload.id);

  // Si l'ID du payload n'est pas trouvé.
  if (newOrderIndex < 0) {
    console.warn(
      "addBlock: Bloc 'new' à remplacer non trouvé pour l'ID:",
      payload.id
    );
    return blocks;
  }

  const oldBlock = blocks[newOrderIndex];
  //copie des anciens blocs permettant le modification de l'etat de maniere immuable
  const newBlocks = blocks.slice();

  // Détermine les données initiales pour le nouveau type de composant.
  const initialDataForNewComponent = getInitialComponentData(
    payload.contentType.component
  );

  const blockDataToSet =
    payload.contentType.data !== undefined && payload.contentType.data !== null
      ? payload.contentType.data
      : initialDataForNewComponent;

  // Crée le NOUVEL objet bloc avec toutes les propriétés nécessaires.
  //    L'ordre des spreads est important ici !
  const newBlockContent = {
    ...payload.contentType,
    order: oldBlock.order, // Conserve l'ordre de l'ancien bloc 'new'
    data: blockDataToSet,
  };

  //  Remplace l'ancien bloc 'new' par le nouveau bloc dans le tableau copié.
  newBlocks.splice(newOrderIndex, 1, newBlockContent);

  return newBlocks;
}

// function addBlock(blocks, payload) {
//   const newOrderIndex = blocks.findIndex((i) => i.id === payload.id);
//   if (newOrderIndex < 0) {
//     return blocks;
//   }
//   const newOrder = blocks[newOrderIndex];

//   const newBlocks = blocks.slice();
//   blocks.splice(newOrderIndex, 1, {
//     ...payload.contentType,
//     order: newOrder.order,
//   });

//   return newBlocks;
// }

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

  const blockData = block.data ?? {};
  if (data) block.data = Object.assign(blockData, deepCopyJSON(data));
  else block.data = null;
  newBlocks.splice(blockIndex, 1, block);
  return newBlocks;
}

const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case "ADD":
      newState = { ...state, blocks: addBlock(state.blocks, action.payload) };
      break;
    case "ADD_AFTER":
      newState = { ...state, blocks: addAfter(state.blocks, action.payload) };
      break;
    case "DELETE":
      newState = {
        ...state,
        blocks: deleteBlock(state.blocks, action.payload),
      };
      break;
    case "LOAD":
      newState = {
        ...state,
        blocks: action.payload,
      };
      break;
    case "SAVE_BLOCK":
      newState = {
        ...state,
        blocks: saveBlock(state.blocks, action.payload.id, action.payload.data),
      };
      break;
    default:
      return state;
  }
  return newState;
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

  const load = useCallback(() => {}, []);

  const save = useCallback(() => {}, []);

  const deleteBox = useCallback(
    (id) => {
      dispacth({ type: "DELETE", payload: id });
    },
    [dispacth]
  );

  const add = useCallback(
    (component) => {
      const id = crypto.randomUUID();
      const contentType = deepCopyJSON(boxArgument(component, undefined, id));
      dispacth({ type: "ADD", payload: { contentType, id: chooserOpened } });
      closeChooser();
    },
    [dispacth, chooserOpened]
  );

  const addAfter = useCallback(
    (id) => {
      dispacth({ type: "ADD_AFTER", payload: id });
    },
    [dispacth]
  );

  const duplicate = useCallback(
    (after) => {
      const id = crypto.randomUUID();
      const model = course.blocks.find((e) => e.id === after);
      const contentType = deepCopyJSON(boxArgument(model.component, {}, id));
      dispacth({ type: "ADD_AFTER", payload: { contentType, after } });
    },
    [dispacth, course]
  );

  const saveBlock = useCallback(
    (id, data) => {
      dispacth({
        type: "SAVE_BLOCK",
        payload: { id, data: deepCopyJSON(data) },
      });
    },
    [dispacth]
  );

  const getData = useCallback(
    (id) => {
      const content = course.blocks.find((e) => e.id === id);
      if (content && content.data) return { ...content.data };
    },
    [course]
  );

  const contextValue = useMemo(
    () => ({
      content: course,
      getData,
      saveBlock,
      add,
      addAfter,
      duplicate,
      deleteBox,
      openChooser,
      closeChooser,
      chooserOpened,
      load,
    }),
    [
      getData,
      saveBlock,
      add,
      addAfter,
      duplicate,
      deleteBox,
      openChooser,
      closeChooser,
      chooserOpened,
      saveBlock,
      getData,
      load,
    ]
  );

  return (
    <courseBuilderContext.Provider value={contextValue}>
      <ResourceChoser>{children}</ResourceChoser>
    </courseBuilderContext.Provider>
  );
}
