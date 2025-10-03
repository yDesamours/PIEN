import { createContext, useState } from "react";

export const tabContext = createContext({
  selected: "",
  setSelected: () => {},
});

export default function Tab({ children, value = "" }) {
  const [selected, setSelected] = useState(value);
  return (
    <tabContext.Provider value={{ selected, setSelected }}>
      {children}
    </tabContext.Provider>
  );
}
