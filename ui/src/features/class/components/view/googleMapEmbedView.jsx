export default function GoogleMapsEmbedView({ data }) {
  const embedUrl = data?.embedUrl;

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Carte Google Maps
      </h3>
      {embedUrl ? (
        <iframe
          className="w-full rounded-md h-100"
          src={`${embedUrl}`}
          allowfullscreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <p className="flex flex-col gap-4">Aucun contenu</p>
      )}
    </div>
  );
}
