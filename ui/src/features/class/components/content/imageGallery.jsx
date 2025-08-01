import { useState, useRef } from "react";

export default function ImageGallery({ data, save }) {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState(data?.images || []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file: file,
      alt: "",
    }));

    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);

    save({ images: updatedImages });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDeleteImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);

    const deletedImage = images.find((image) => image.id === id);
    if (deletedImage && deletedImage.url) {
      URL.revokeObjectURL(deletedImage.url);
    }

    save({ images: updatedImages });
  };

  const handleAltTextChange = (id, altText) => {
    const updatedImages = images.map((image) =>
      image.id === id ? { ...image, alt: altText } : image
    );
    setImages(updatedImages);
    save({ images: updatedImages });
  };

  const handleAddClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Galerie d'Images
      </h3>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <button
        onClick={handleAddClick}
        className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Ajouter une image
      </button>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image) => (
            <div
              key={image.id}
              className="relative group overflow-hidden rounded-md shadow-sm"
            >
              <img
                src={image.url}
                alt={image.alt || "Image de la galerie"}
                className="w-full h-40 object-cover"
              />

              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <input
                  type="text"
                  value={image.alt}
                  onChange={(e) =>
                    handleAltTextChange(image.id, e.target.value)
                  }
                  placeholder="Texte alternatif (SEO, accessibilité)"
                  className="w-full text-xs text-white bg-transparent border-b border-white focus:outline-none focus:border-blue-300"
                />
                <button
                  onClick={() => handleDeleteImage(image.id)}
                  className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1 hover:bg-red-600"
                  aria-label="Supprimer l'image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
