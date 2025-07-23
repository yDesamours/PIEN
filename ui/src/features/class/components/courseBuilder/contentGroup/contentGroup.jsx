export default function ContentGroup({ children, summary }) {
  return (
    <details className="p-1 m-1 bg-gray-100 shadow-md">
      <summary className="text-black text-left list-none cursor-pointer border-1 rounded-sm border-black p-1">
        {summary}
      </summary>
      {children}
    </details>
  );
}
