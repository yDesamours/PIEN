export default function NavItem({ children, onClick, role, className }) {
  return (
    <li role={role} onClick={onClick} className={className}>
      {children}
    </li>
  );
}
