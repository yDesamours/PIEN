export default function SideBarContent({ children }) {
  return (
    <ul className=" text-md text-black grid grid-cols-1 gap-y-5">{children}</ul>
  );
}
