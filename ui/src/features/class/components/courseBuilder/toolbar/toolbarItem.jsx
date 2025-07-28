export default function ToolbarItem({ children, onClick, className = "" }) {
  return (
    <li role="button" className={`font-bold cursor-pointer`} onClick={onClick}>
      {children}
    </li>
  );
}
