export default function ToolbarItem({ children, onClick, className = "" }) {
  return (
    <li
      role="button"
      className={` ${className} font-bold cursor-pointer flex gap-2`}
      onClick={onClick}
    >
      {children}
    </li>
  );
}
