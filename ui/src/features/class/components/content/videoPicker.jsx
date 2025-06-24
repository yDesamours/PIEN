import { useState, useRef } from "react";
import Icon from "../../../../components/icon/icon";

export default function VideoPicker({ data, save = () => {} }) {
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("video/")) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      save({ file: file, content: result });
    };
    reader.readAsDataURL(file);
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
    save(null);
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center gap-2 w-full p-4 border"
    >
      {!data && (
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
      {data && (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700 font-medium text-center truncate w-full">
            🎬 {data.file.name}
          </p>
          <video
            controls
            src={data.content}
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
