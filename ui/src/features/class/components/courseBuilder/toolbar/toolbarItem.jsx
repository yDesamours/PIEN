export default function ToolbarItem({ children, onClick }) {
  return (
    <li role="button" className="cursor-pointer" onClick={onClick}>
      {children}
    </li>
  );
}
