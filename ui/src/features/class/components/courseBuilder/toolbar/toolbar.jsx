export default function Toolbar({ children, className = "" }) {
  return (
    <section
      className={`border border-white flex items-center p-1  ${className}`}
    >
      {children}
    </section>
  );
}
