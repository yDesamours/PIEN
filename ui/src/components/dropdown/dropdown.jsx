import { createContext, useEffect, useRef, useState } from "react";
export const dropdownContext = createContext();

export default function Dropdown({ children, className }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((state) => !state);
  };

  const ref = useRef();

  const clickEventHandler = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", clickEventHandler);
    return () => document.removeEventListener("click", clickEventHandler);
  }, []);

  return (
    <dropdownContext.Provider value={{ toggle, open }}>
      <div
        ref={ref}
        className={`relative inline-block text-left  ${className}`}
      >
        {children}
      </div>
    </dropdownContext.Provider>
  );
}
