import { useContext } from "react";
import { tabContext } from "./tab";

export default function TabList({ children }) {
  const { selected } = useContext(tabContext.Provider);
  return (
    <ul className="flex overflow-x-scroll w-full gap-4 pt-4 px-4 pl-0 my-4 scrollable">
      {children}
    </ul>
  );
}
