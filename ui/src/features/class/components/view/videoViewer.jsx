export default function VideoViewer({ data }) {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      {data ? (
        <>
          <video
            controls
            src={data.content}
            className="w-full max-h-64 rounded shadow"
          />
          <p className="text-sm text-gray-700 font-medium text-center truncate w-full"></p>
        </>
      ) : (
        <p>Pas de fichier choisie</p>
      )}
    </div>
  );
}
