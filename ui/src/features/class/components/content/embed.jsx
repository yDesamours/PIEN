import { useState } from "react";

export default function Embed({ data, save }) {
  const [inputValue, setInputValue] = useState("");
  const [embedCode, setEmbedCode] = useState(data?.embedCode || null);
  const [error, setError] = useState(null);

  const getEmbedCode = (url) => {
    // Regex pour YouTube
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/)?([a-zA-Z0-9_-]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return `<iframe class="w-full aspect-video rounded-md" src="https://www.youtube.com/embed/${youtubeMatch[1]}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    }

    // Regex pour Vimeo
    const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/([0-9]+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `<iframe class="w-full aspect-video rounded-md" src="https://player.vimeo.com/video/${vimeoMatch[1]}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    }

    // Regex pour Google Maps
    const googleMapsRegex =
      /(?:https?:\/\/(?:www\.)?google\.com\/maps\/embed\?pb=.*)/;
    const googleMapsMatch = url.match(googleMapsRegex);
    if (googleMapsMatch) {
      const embedUrl = url.split('"')[1] || url;
      return `<iframe class="w-full rounded-md" src="${embedUrl}" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`;
    }

    if (url.includes("twitter.com")) {
      return `<blockquote class="twitter-tweet"><p lang="fr" dir="ltr"><a href="${url}"></a></p></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`;
    }

    if (url.includes("<iframe")) {
      return url;
    }

    return null;
  };

  const handleEmbed = () => {
    setError(null);
    const code = getEmbedCode(inputValue);
    if (code) {
      setEmbedCode(code);
      save({ embedCode: code });
      setInputValue("");
    } else {
      setError(
        "URL non valide ou format non supporté. Veuillez entrer une URL YouTube, Vimeo, Google Maps, Twitter ou un code d'intégration (iframe)."
      );
    }
  };

  const deleteEmbed = () => {
    setEmbedCode(null);
    save({ embedCode: null });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        Contenu Intégré (Embed)
      </h3>

      {embedCode ? (
        <div className="flex flex-col gap-4">
          <div
            dangerouslySetInnerHTML={{ __html: embedCode }}
            className="w-full"
          ></div>
          <button
            onClick={deleteEmbed}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors duration-200 self-start"
          >
            Supprimer
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              htmlFor="embed-url"
              className="text-sm font-medium text-gray-700"
            >
              Coller une URL ou un code d'intégration (iframe) :
            </label>
            <input
              id="embed-url"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ex: https://www.youtube.com/watch?v=..."
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <button
            onClick={handleEmbed}
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200 self-start"
          >
            Intégrer
          </button>
        </div>
      )}
    </div>
  );
}
