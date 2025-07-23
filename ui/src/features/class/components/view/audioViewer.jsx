export default function AudioViewer({ data }) {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      {data ? (
        <>
          <audio controls src={data.content} className="w-full" />
          <p className="text-sm text-gray-700 font-medium text-center truncate w-full"></p>
        </>
      ) : (
        <p>Pas de fichier choisie</p>
      )}
    </div>
  );
}
