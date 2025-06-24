import { useState } from "react";
import Icon from "../../../../components/icon/icon";

export default function ImagePicker({ data, save = () => {} }) {
  const initalWidth = 100;

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      const img = new Image();

      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const [aspectRatio] = [img.width / img.height];
        save({
          fileName: file.name,
          type: file.type,
          content: result,
          dimensions: {
            width: initalWidth,
            height: initalWidth / aspectRatio,
            aspectRatio,
          },
        });
      };
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const scaleUp = () => {
    const { dimensions } = data;
    save({
      ...data,
      width: dimensions.width * 1.1,
      height: (dimensions.width * 1.1) / dimensions.aspectRatio,
    });
  };

  const scaleDown = () => {
    const { dimensions } = data;
    const width = dimensions.width / 1.1;
    if (width < initalWidth) return;

    save({
      ...data,
      width: width,
      height: width / dimensions.aspectRatio,
    });
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleRemove = () => {
    save(null);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="  p-4 flex flex-col justify-around items-center gap-2 border-1"
    >
      {!data && (
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

      {data && (
        <>
          <div className="flex justify-center space-x-4 bg-blue-400 rounded-sm mb-3 w-30 m-auto shrink-0">
            <button
              title="agrandir l'image"
              onClick={scaleUp}
              className="cursor-pointer shrink-0"
            >
              +
            </button>
            <button
              title="reduire l'image"
              onClick={scaleDown}
              className="cursor-pointer shrink-0"
            >
              -
            </button>
            <Icon
              name="trash"
              role="button"
              className="w-3 cursor-pointer shrink-0"
              onClick={handleRemove}
            />
          </div>

          <div
            className="mb-3 m-auto"
            style={{
              width: `${data.dimensions.width}px`,
              height: `${data.dimensions.height}px`,
            }}
          >
            <img src={data.content} alt="Preview" className="object-cover" />
          </div>
        </>
      )}
    </div>
  );
}
