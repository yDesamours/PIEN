import { useState, useRef, useCallback } from "react";
import Icon from "../../../../components/icon/icon";
import Trash from "../../../../assets/icons/trash.svg?react";

export default function AudioPicker({ data, id, save = () => {} }) {
  const inputRef = useRef();

  /**
   * Read the file and save it
   *
   * @param {File} file
   */
  const handleFile = (file) => {
    if (!file || !file.type.startsWith("audio/")) return;

    const fileMetadata = {
      name: file.name,
      size: file.size,
      lastModified: file.lastModified,
      type: file.type,
    };

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      save({
        file: fileMetadata,
        content: result,
      });
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

  const handleRemove = useCallback(() => {
    save(null);
  }, [save]);

  const onDescription = (e) => {
    save({ description: e.target.value });
  };

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center gap-2 w-full p-4 border"
    >
      {!data && (
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
      {data && (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700 font-medium text-center truncate w-full">
            🎵 {data.file.name}
          </p>
          <audio controls src={data.content} className="w-full" />
          <Trash
            role="button"
            name="trash"
            onClick={handleRemove}
            className="text-red-600 text-sm hover:underline w-3"
          />
          <form className="w-full">
            <label htmlFor={`audio-description-${id}`} className="sr-only">
              Description
            </label>
            <textarea
              value={data.description}
              onChange={onDescription}
              placeholder="taper une description ici"
              id={`audio-description-${id}`}
              className=" border resize-none border-gray-300 h-15 w-full px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </form>
        </div>
      )}
    </div>
  );
}
