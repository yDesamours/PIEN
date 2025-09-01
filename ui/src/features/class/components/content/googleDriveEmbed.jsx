import { useState } from "react";

const getGoogleDriveEmbedCode = (url) => {
  const driveRegex =
    /https:\/\/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;
  const match = url.match(driveRegex);
  return match ? match[1] : null;
};

export default function GoogleDriveEmbed({ data, save }) {
  const [inputValue, setInputValue] = useState("");
  const embedUrl = data?.embedUrl;
  const [error, setError] = useState(null);

  const handleEmbed = () => {
    setError(null);
    const url = getGoogleDriveEmbedCode(inputValue);
    if (url) {
      save({ embedUrl: url });
      setInputValue("");
    } else {
      setError("URL Google Drive non valide.");
    }
  };

  const deleteEmbed = () => {
    save({ embedUrl: null });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Contenu Google Drive
      </h3>
      {embedUrl ? (
        <div className="flex flex-col gap-4">
          <iframe
            src={`https://drive.google.com/file/d/${embedUrl}/preview`}
            className="w-full aspect-video rounded-md"
            allow="autoplay"
          />
          <button
            onClick={deleteEmbed}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md"
          >
            Supprimer
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Coller une URL Google Drive"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            onClick={handleEmbed}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md"
          >
            Intégrer
          </button>
        </div>
      )}
    </div>
  );
}
