export default function YoutubeEmbedView({ data }) {
  const embedUrl = data?.embedUrl;

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Vidéo YouTube
      </h3>
      {embedUrl ? (
        <iframe
          className="w-full aspect-video rounded-md"
          src={`https://www.youtube.com/embed/${embedUrl}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <p className="flex flex-col gap-4">Aucun contenu</p>
      )}
    </div>
  );
}
