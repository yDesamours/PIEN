import { useState } from "react";

export default function ImagePicker() {
  const [preview, setPreview] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: 2,
    height: 2,
  });

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setPreview(null);
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleInputChange = (e) => {
    debugger;
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (onChange) onChange(null);
  };

  return (
    <div className="flex flex-col items-center gap-4 border-1">
      <label
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="cursor-pointer px-4 py-2 p-3 w-full  text-white rounded hover:text-blue-700 text-xs"
      >
        <i> Select or Drag Image </i>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />
      </label>

      {preview && (
        <div
          className="relative mb-3"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
          }}
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full object-cover rounded border"
          />
          <button
            onClick={handleRemove}
            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
