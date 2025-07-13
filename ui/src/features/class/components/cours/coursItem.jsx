export default function CoursItem({ cours, onClick }) {
  return (
    <div
      key={cours.id}
      onClick={() => onClick(cours)}
      className="flex flex-col justify-center items-center bg-white p-4 rounded-lg shadow-md h-60 flex-1"
    >
      <div className="flex flex-col">
        <h2 className="text-lg font-bold text-black">{cours.title}</h2>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer">
        View
      </button>
    </div>
  );
}
