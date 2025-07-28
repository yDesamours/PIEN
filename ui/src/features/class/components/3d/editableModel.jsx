import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  Html,
  useAnimations,
} from "@react-three/drei";
import * as THREE from "three";

export default function EditableModel({
  modelPath,
  scale,
  animations,
  onModelClick,
}) {
  const { scene } = useGLTF(modelPath);
  const modelRef = useRef();

  const { camera, scene: threeScene, gl } = useThree();

  const handleClick = useCallback(
    (event) => {
      const { point } = event;
      // Empêche le clic de l'orbit control si c'est un glissement
      if (event.delta > 2) return;
      console.log(point);
      console.log(camera.position.distanceTo(point));

      onModelClick(point);
      // const raycaster = new THREE.Raycaster();
      // raycaster.setFromCamera(mouse, camera);

      // // Trouver les intersections avec les objets de la scène
      // const intersects = raycaster.intersectObjects(
      //   modelRef.current.children,
      //   true
      // );

      // if (intersects.length > 0) {
      //   const intersect = intersects[0];
      //   const point = intersect.point;
      //   //
      //   onModelClick(point);
      // }
    },
    [camera, gl, onModelClick]
  );

  // useEffect(() => {
  //   gl.domElement.addEventListener("click", handleClick);
  //   return () => {
  //     gl.domElement.removeEventListener("click", handleClick);
  //   };
  // }, [gl, handleClick]);

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={scale}
      onDoubleClick={handleClick}
    />
  );
}
