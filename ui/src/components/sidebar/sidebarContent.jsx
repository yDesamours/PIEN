export default function SideBarContent({ children }) {
  return (
    <ul className=" text-sm text-black grid grid-cols-1 gap-y-3">{children}</ul>
  );
}
