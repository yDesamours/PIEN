import { createContext, useState } from "react";

const UIContext = createContext({ isBlocked: false, toggleUi: () => {} });

export default function BlockUIProvider({ children }) {
  const [isBlocked, setIsBlocked] = useState(false);

  const toggleUi = () => {
    setIsBlocked((state) => !state);
  };

  return (
    <UIContext.Provider value={{ isBlocked, toggleUi }}>
      {children}
    </UIContext.Provider>
  );
}
