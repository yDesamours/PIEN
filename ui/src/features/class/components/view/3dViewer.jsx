import { useEffect, useState } from "react";
import ModelViewer from "../3d/ModelViewer";

export default function Viewer3d({ data }) {
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (data.content) {
      const blob = base64ToBlob(data.content);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
    } else if (data.path) {
      setPreviewUrl(data.path);
    }
  }, [data]);

  return (
    <>
      {previewUrl ? (
        <ModelViewer
          modelPath={previewUrl}
          className="flex-1 flex gap-3"
          renderingConfig={{ annotations: data.annotations }}
        />
      ) : (
        <p></p>
      )}
    </>
  );
}
