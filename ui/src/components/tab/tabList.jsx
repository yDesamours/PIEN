export default function TabList({ children }) {
  return (
    <ul className="flex overflow-x-scroll w-full gap-4 pt-4 px-4 pl-0 my-4 scrollable">
      {children}
    </ul>
  );
}
