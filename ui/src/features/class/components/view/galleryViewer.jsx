export default function GalleryViewer({ data }) {
  return data ? (
    <article className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {data.images.map((image) => (
        <div
          key={image.id}
          className="relative group overflow-hidden rounded-md shadow-sm"
        >
          <img
            src={image.content}
            alt={image.alt || "Image de la galerie"}
            className="w-full h-40 object-cover"
          />

          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <p className="w-full text-xs text-white bg-transparent border-b border-white focus:outline-none focus:border-blue-300">
              {image.alt}
            </p>
          </div>
        </div>
      ))}
    </article>
  ) : (
    <article>
      <p>Aucun contenu</p>
    </article>
  );
}
