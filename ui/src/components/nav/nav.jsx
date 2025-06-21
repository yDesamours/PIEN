export default function Nav({ children, className, ...props }) {
  return (
    <nav className={`${className} p-3`} {...props}>
      {children}
    </nav>
  );
}
