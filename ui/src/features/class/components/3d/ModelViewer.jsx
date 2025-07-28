import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Html } from "@react-three/drei";
import { Model } from "./model";

export default function ModelViewer({
  modelPath,
  loadingMessage,
  renderingConfig,
  className,
}) {
  const {
    scale = 3,
    background = "#F0F0F0",
    environmentPreset = "/model/hdr/empty_warehouse.hdr",
    animationName = null,
    autoRotate = false,
    rotationSpeed = 0.01,
    annotations = [],
  } = renderingConfig || {};

  return (
    <div className={className}>
      <div className="flex-2">
        <Canvas>
          <color attach="background" args={[background]} />
          <Environment files={environmentPreset} />

          {/* <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} /> */}

          {autoRotate ? null : <OrbitControls makeDefault />}

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
            {annotations.map((anno, index) => {
              const { x, y, z } = anno.position;
              return <Marker position={[x, y, z]} />;
            })}
          </Suspense>
        </Canvas>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
