import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Model } from "./model";
import Marker from "./annotations/marker";
import Markers from "./annotations/markers";
import Annotation from "./annotations/annotation";
import useApi from "../../../../hooks/api";
import COURS from "../../../../services/api/cours";
import MULTIMEDIA from "../../../../services/api/multimedia";

export default function ModelViewer({
  modelPath,
  loadingMessage,
  renderingConfig,
  className,
}) {
  const {
    scale = 3,
    background = "#F354d4",
    environmentPreset = "/model/hdr/empty_warehouse.hdr",
    animationName = null,
    autoRotate = false,
    rotationSpeed = 0.01,
    annotations = [],
  } = renderingConfig || {};

  const [preset, setPreset] = useState(null);
  const { execute } = useApi();

  useEffect(() => {
    execute(COURS.GET_ENVIRONMENTS()).then(({ data }) => {
      const presetUrl = MULTIMEDIA.GET_FILE(data[0].url);
      setPreset(presetUrl);
    });
  }, []);

  return (
    <div className={className}>
      {!preset && <div>Loading</div>}
      {preset && (
        <>
          <div className="flex-2 ">
            <Canvas>
              <color attach="background" args={[background]} />
              <Environment files={preset} />
              <OrbitControls makeDefault rotateSpeed={1} autoRotate />

              <Suspense
                fallback={
                  <Html center>
                    {loadingMessage || "Chargement du modèle 3D..."}
                  </Html>
                }
              >
                <Model
                  modelPath={modelPath}
                  scale={scale}
                  animationName={animationName}
                  autoRotate={autoRotate}
                  rotationSpeed={rotationSpeed}
                  annotations={annotations}
                />
                <Markers annotations={annotations} />
              </Suspense>
            </Canvas>
          </div>
          <div className="flex-1 flex flex-col">
            <Annotation annotations={annotations} />
          </div>
        </>
      )}
    </div>
  );
}
