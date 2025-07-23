import { useState, useRef, useEffect } from "react";
import Icon from "../../../../components/icon/icon";
import { base64ToBlob } from "../../../../utils/utils";

const types = [
  ".pdf",
  ".docx",
  ".txt",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".md",
];

export default function DocumentPicker({
  data,
  save = () => {},
  allowedTypes = types,
}) {
  const inputRef = useRef();
  const iconName = data
    ? data.fileName.split(".").pop().toLowerCase().substring(0, 3)
    : "";

  let objectUrl = null;

  /**
   *
   * @param {File} file
   * @returns
   */
  const handleFile = (file) => {
    const extension = file.name.split(".").pop().toLowerCase();
    if (!allowedTypes.includes("." + extension)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      save({ fileName: file.name, mimeType: file.type, content: result });
    };
    reader.readAsDataURL(file);
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
    save(null);
  };

  const handlePreview = () => {
    if (!objectUrl) return;
    window.open(objectUrl, "_blank");
  };

  useEffect(() => {
    if (!data) {
      return;
    }

    const blob = base64ToBlob(data.content);
    objectUrl = URL.createObjectURL(blob);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [data]);

  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      className="flex flex-col items-center gap-2 w-full p-4 border"
    >
      {!data && (
        <>
          <Icon name="document" className="w-10" />
          <p>Glissez un document ici</p>
          <p>ou</p>
          <label className="cursor-pointer px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-800 text-xs transition-all duration-300 ease-in-out">
            Sélectionner un document depuis votre ordinateur
            <input
              type="file"
              accept={allowedTypes.join(",")}
              className="hidden"
              ref={inputRef}
              onChange={handleSelect}
            />
          </label>
        </>
      )}

      {data && (
        <div className="w-full flex flex-col items-center gap-2">
          <Icon name={iconName} className="w-10" />
          <p className="text-sm text-gray-700 font-medium text-center truncate w-full">
            {data.fileName}
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
