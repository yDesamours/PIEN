export default function ContentChoserContent({ children }) {
  return (
    <ul className=" grid grid-cols-2 lg:grid-cols-3 gap-4 p-4">{children}</ul>
  );
}
