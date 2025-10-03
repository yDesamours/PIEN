import {
  createContext,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";

export const sideBarContext = createContext({ toggle: () => {}, open: false });

export default forwardRef(function SideBar(props, ref) {
  const { children } = props;
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((state) => !state);
  }, []);

  const openSidebar = useCallback(() => {
    setOpen(true);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      toggle,
      open: openSidebar,
    }),
    []
  );

  const className = open ? "w-50" : "w-10";

  return (
    <sideBarContext.Provider value={{ toggle, open }}>
      <div
        className={`${className} relative h-full  bg-white transition-all duration-300 ease-in-out pt-2 pl-2`}
      >
        {children}
      </div>
    </sideBarContext.Provider>
  );
});
