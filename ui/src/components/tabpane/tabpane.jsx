import { createContext, useState } from "react";

export const tabPaneContext = createContext({
  visible: "",
  setVisible: () => {},
});

export default function TabPane({ children, defaultValue = "" }) {
  const [visible, setVisible] = useState(defaultValue);

  return (
    <tabPaneContext.Provider value={{ visible, setVisible }}>
      {children}
    </tabPaneContext.Provider>
  );
}
