export default function ToolbarContent({ children }) {
  return (
    <article className="w-full">
      <ul
        role="list"
        className="flex items-center justify-end gap-4 p-4 w-full"
      >
        {children}
      </ul>
    </article>
  );
}
