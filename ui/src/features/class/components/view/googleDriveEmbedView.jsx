export default function GoogleDriveEmbedView({ data }) {
  const embedUrl = data?.embedUrl;

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Contenu Google Drive
      </h3>
      {embedUrl ? (
        <iframe
          src={`https://drive.google.com/file/d/${embedUrl}/preview`}
          className="w-full aspect-video rounded-md"
          allow="autoplay"
        />
      ) : (
        <p className="flex flex-col gap-4">Aucun contenu</p>
      )}
    </div>
  );
}
