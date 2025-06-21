import { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html, useAnimations } from "@react-three/drei";
import * as THREE from "three";

export function Model({
  modelPath,
  scale,
  animationName,
  autoRotate = false,
  rotationSpeed = 0.01,
  annotations,
}) {
  const { scene, animations } = useGLTF(modelPath);
  const { actions, names, mixer } = useAnimations(animations, scene);
  const modelRef = useRef();

  const [openAnnotation, setOpenAnnotation] = useState(null);

  useEffect(() => {
    if (animationName && actions[animationName]) {
      actions[animationName].setLoop(THREE.LoopRepeat);
      actions[animationName].play();
    } else if (names.length > 0) {
      actions[names[0]].setLoop(THREE.LoopRepeat);
      actions[names[0]].play();
    }
    return () => {
      mixer.stopAllAction();
    };
  }, [animationName, actions, names, mixer]);

  useFrame(() => {
    if (autoRotate && modelRef.current) {
      modelRef.current.rotation.y += rotationSpeed;
    }
  });

  const clonedScene = scene.clone();

  return (
    <primitive object={clonedScene} ref={modelRef} scale={scale}>
      {annotations &&
        annotations.map((annotation) => (
          <Html
            key={annotation.id}
            position={[
              annotation.position.x,
              annotation.position.y,
              annotation.position.z,
            ]}
            className="annotation-label"
            occlude
            distanceFactor={10}
            sprite
            transform
            onClick={() =>
              setOpenAnnotation(
                openAnnotation === annotation.id ? null : annotation.id
              )
            }
          >
            <div className="annotation-icon"></div>

            {openAnnotation === annotation.id && (
              <div className="annotation-content">
                <h3>{annotation.title}</h3>
                <p>{annotation.description}</p>
                {/* Ajoutez un bouton "Fermer" si vous voulez une fermeture explicite */}
                {/* <button onClick={() => setOpenAnnotation(null)}>Fermer</button> */}
              </div>
            )}
          </Html>
        ))}
    </primitive>
  );
}
