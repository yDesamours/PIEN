import { useState, useRef } from "react";
import Icon from "../../../../components/icon/icon";

export default function VideoPicker({ onChange }) {
  const [videoFile, setVideoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("video/")) return;

    const url = URL.createObjectURL(file);
    setVideoFile(file);
    setPreviewUrl(url);
    onChange?.(file);
  };

  const handleSelect = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setVideoFile(null);
    setPreviewUrl(null);
    inputRef.current.value = null;
    onChange?.(null);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center gap-2 w-full p-4 border"
    >
      {!videoFile && (
        <>
          <Icon name="video" className="w-10" />
          <p>Glissez une vidéo ici</p>
          <p>ou</p>
          <label className="cursor-pointer px-4 py-2 p-3 bg-purple-500 text-white rounded hover:bg-purple-700 text-xs transition-all duration-300 ease-in-out">
            Sélectionner une vidéo depuis votre ordinateur
            <input
              type="file"
              accept="video/*"
              className="hidden"
              ref={inputRef}
              onChange={handleSelect}
            />
          </label>
        </>
      )}
      {videoFile && (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700 font-medium text-center truncate w-full">
            🎬 {videoFile.name}
          </p>
          <video
            controls
            src={previewUrl}
            className="w-full max-h-64 rounded shadow"
          />
          <Icon
            role="button"
            name="trash"
            onClick={handleRemove}
            className="text-red-600 text-sm hover:underline w-3"
          />
        </div>
      )}
    </div>
  );
}
