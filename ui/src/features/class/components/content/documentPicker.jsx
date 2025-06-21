import { useState, useRef } from "react";
import Icon from "../../../../components/icon/icon";

export default function DocumentPicker({
  onChange,
  allowedTypes = [".pdf", ".docx", ".txt", ".xlsx", ".md"],
}) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef();

  const handleFile = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes("." + extension)) return;

    setPreviewUrl(URL.createObjectURL(file));
    setFile(file);
    onChange?.(file);
  };

  const handleSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setFile(null);
    inputRef.current.value = null;
    onChange?.(null);
  };

  const handlePreview = () => {
    if (!file) return;
    window.open(previewUrl, "_blank");
  };

  const acceptString = allowedTypes.join(",");

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center gap-2 w-full p-4 border"
    >
      {!file && (
        <>
          <Icon name="document" className="w-10" />
          <p>Glissez un document ici</p>
          <p>ou</p>
          <label className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 text-xs transition-all duration-300 ease-in-out">
            Sélectionner un document depuis votre ordinateur
            <input
              type="file"
              accept={acceptString}
              className="hidden"
              ref={inputRef}
              onChange={handleSelect}
            />
          </label>
        </>
      )}
      {file && (
        <div className="w-full flex flex-col items-center gap-2">
          <p className="text-sm text-gray-700 font-medium text-center truncate w-full">
            📄 {file.name}
          </p>
          <div className="flex justify-center space-x-4 bg-blue-400 rounded-sm mb-3 w-20 h-5 m-auto">
            <Icon
              role="button"
              name="trash"
              onClick={handleRemove}
              className="text-red-600 cursor-pointer w-3"
            />

            <Icon
              role="button"
              name="preview"
              onClick={handlePreview}
              className="cursor-pointer  w-3"
            />
          </div>
        </div>
      )}
    </div>
  );
}
