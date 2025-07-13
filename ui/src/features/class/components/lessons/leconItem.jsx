export default function LeconItem({ lecon }) {
  return (
    <li className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-md h-60 flex-1">
      <h3>{lecon.title}</h3>
      <p>{lecon.description}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
        View
      </button>
    </li>
  );
}
