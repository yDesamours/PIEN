export default function Toolbar({ children, className = "" }) {
  return (
    <section
      className={`border border-white flex items-center h-10 p-1  ${className}`}
    >
      {children}
    </section>
  );
}
