export default function DropdownItem({ children, onClick }) {
  return (
    <li
      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      onClick={onClick}
    >
      {children}
    </li>
  );
}
