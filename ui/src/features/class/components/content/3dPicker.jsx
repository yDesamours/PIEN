import { useState, useRef } from "react";
import Icon from "../../../../components/icon/icon";
import Modal from "../../../../components/modal/modal";
import Simple3DViewer from "../3d/3dViewer";

export default function GlbPicker() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previewOpen, setOpenPreview] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.name.match(/\.glb$/i)) return;
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setFile(file);
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

  const handlePreview = () => {
    setOpenPreview(true);
  };

  const handlePreviewStop = () => {
    setOpenPreview(false);
  };

  const handleRemove = () => {
    setFile(null);
    inputRef.current.value = null;
  };

  return (
    <>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="flex flex-col items-center gap-2 w-full p-4 border"
      >
        {!file && (
          <>
            <Icon name="3d" className="w-10" />
            <p>Glissez un fichier .glb ici</p>
            <p>ou</p>
            <label className="cursor-pointer px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 text-xs transition-all duration-300 ease-in-out">
              Sélectionner un modèle depuis votre ordinateur
              <input
                type="file"
                accept=".glb,.gltf"
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
              🧊 {file.name}
            </p>
            <div className="flex justify-center space-x-4 bg-blue-400 rounded-sm mb-3 w-20 h-5 m-auto">
              <Icon
                role="button"
                name="trash"
                onClick={handleRemove}
                className="text-red-600 text-sm hover:underline w-3"
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
      <Modal isOpen={previewOpen} onClose={handlePreviewStop}>
        <Simple3DViewer modelPath={previewUrl} />
      </Modal>
    </>
  );
}
