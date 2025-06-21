import { useState } from "react";
import Icon from "../../../../components/icon/icon";

export default function ImagePicker() {
  const initalWidth = 100;
  const [preview, setPreview] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: initalWidth,
    height: 0,
  });
  const [aspectRatio, setAspectRatio] = useState(1);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setPreview(null);
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const [ratio] = [img.width / img.height];
      setDimensions((state) => ({ ...state, height: state.width / ratio }));
      setAspectRatio(ratio);
    };

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

  const scaleUp = () => {
    setDimensions((state) => ({
      ...state,
      width: state.width * 1.1,
      height: (state.width * 1.1) / aspectRatio,
    }));
  };

  const scaleDown = () => {
    setDimensions((state) => {
      const width = state.width / 1.1;
      if (width < initalWidth) return state;

      return {
        ...state,
        width: width,
        height: width / aspectRatio,
      };
    });
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    setPreview(null);
    if (onChange) onChange(null);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="  p-4 flex flex-col justify-around items-center gap-2 border-1"
    >
      {!preview && (
        <>
          <Icon name="image" className="w-10" />
          <p className="text-sm">Glisser une image ici</p>
          <p>ou</p>
          <label className="cursor-pointer px-4 py-2 p-3 bg-blue-400  text-white rounded hover:bg-blue-700 text-xs transition-all duration-300 ease-in-out">
            <i> Selectionner une image depuis votre ordinateur </i>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
        </>
      )}

      {preview && (
        <>
          <div className="flex justify-center space-x-4 bg-blue-400 rounded-sm mb-3 w-30 m-auto">
            <button
              title="agrandir l'image"
              onClick={scaleUp}
              className="cursor-pointer"
            >
              +
            </button>
            <button
              title="reduire l'image"
              onClick={scaleDown}
              className="cursor-pointer"
            >
              -
            </button>
            <Icon
              name="trash"
              role="button"
              className="w-3 cursor-pointer"
              onClick={handleRemove}
            />
          </div>

          <div
            className="mb-3 m-auto"
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }}
          >
            <img src={preview} alt="Preview" className="object-cover" />
          </div>
        </>
      )}
    </div>
  );
}
