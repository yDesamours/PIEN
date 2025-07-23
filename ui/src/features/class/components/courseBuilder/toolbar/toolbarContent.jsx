export default function ToolbarContent({ children }) {
  return (
    <article>
      <ul className="flex items-center justify-start gap-2">{children}</ul>
    </article>
  );
}
