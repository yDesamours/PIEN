import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Html,
  useAnimations,
} from "@react-three/drei";

function Model({ modelPath, autoRotate = true, rotationSpeed = 0.01 }) {
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names, mixer } = useAnimations(animations, scene);
  const modelRef = useRef();

  useEffect(() => {
    if (names.length > 0) {
      actions[names[0]].setLoop(THREE.LoopRepeat);
      actions[names[0]].play();
    }
    return () => {
      mixer.stopAllAction();
    };
  }, [names, mixer, actions]);

  useFrame(() => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  return <primitive object={scene} scale={5} ref={modelRef} />;
}

export default function Simple3DViewer({ modelPath, loadingMessage }) {
  return (
    <div
      className="viewer-container"
      style={{ height: "500px", width: "100%" }}
    >
      <Canvas>
        <ambientLight intensity={0.5} />
        <color attach="background" args={["#B0C4DE"]} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />{" "}
        <Environment preset="city" />
        <OrbitControls makeDefault />
        <Suspense
          fallback={
            <Html center>{loadingMessage || "Chargement du modèle 3D..."}</Html>
          }
        >
          <Model modelPath={modelPath} />
        </Suspense>
      </Canvas>
    </div>
  );
}
