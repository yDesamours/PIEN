import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import Close from "../../assets/icons/close.svg?react";

const sideViewerContext = createContext({ opened: false, open: () => {} });

function SideViewer({ name, title, children }) {
  const { opened, open } = useContext(sideViewerContext);

  const position = opened === name ? "translate-x-0" : "translate-x-full";

  const closeViewer = () => {
    open("");
  };

  return createPortal(
    <section
      className={`${position} fixed top-0 right-0 h-full w-72 bg-white transition-transform duration-300 ease-in-out z-30`}
    >
      <div className="flex flex-row justify-between p-2">
        <h2 className="text-lg font-bold text-black flex items-end ">
          {title}
        </h2>
        <button onClick={closeViewer}>
          <Close />
        </button>
      </div>
      {children}
    </section>,
    document.body
  );
}

function SideViewerProvider({ children }) {
  const [opened, setOpened] = useState("");

  const open = (name) => {
    if (name === opened) setOpened("");
    else setOpened(name);
  };

  return (
    <sideViewerContext.Provider value={{ opened: opened, open }}>
      {children}
    </sideViewerContext.Provider>
  );
}

export { SideViewer, sideViewerContext, SideViewerProvider };
