import { useState, useRef } from "react";
import Icon from "../../../../components/icon/icon";

export default function AudioPicker({ onChange }) {
  const [audioFile, setAudioFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("audio/")) return;

    const url = URL.createObjectURL(file);
    setAudioFile(file);
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
    setAudioFile(null);
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
      {!audioFile && (
        <>
          <Icon name="audio" className="w-10" />
          <p>Glissier un fichier audio</p>
          <p>ou</p>
          <label className="cursor-pointer px-4 py-2 p-3 bg-blue-400  text-white rounded hover:bg-blue-700 text-xs transition-all duration-300 ease-in-out">
            Sélectionner un audio depuis votre ordinateur
            <input
              type="file"
              accept="audio/*"
              className="hidden"
              ref={inputRef}
              onChange={handleSelect}
            />
          </label>
        </>
      )}
      {audioFile && (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700 font-medium text-center truncate w-full">
            🎵 {audioFile.name}
          </p>
          <audio controls src={previewUrl} className="w-full" />
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
