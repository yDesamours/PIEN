export default function ContentGroup({ children, summary }) {
  return (
    <details className="group bg-white  shadow transition">
      <summary className="cursor-pointer px-4 py-3 text-blue-600 font-semibold text-xl flex items-center justify-between group-open:rounded-b-none">
        {summary}
        {/* <span class="transition-transform group-open:rotate-90">▶</span> */}
      </summary>
      {children}
    </details>
  );
}
