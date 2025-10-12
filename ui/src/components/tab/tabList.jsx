export default function TabList({ children }) {
  return (
    <ul className="flex overflow-x-scroll w-full gap-8 px-4 pl-0 scrollable">
      {children}
    </ul>
  );
}
