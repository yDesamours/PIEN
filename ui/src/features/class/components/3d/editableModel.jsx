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
      if (event.delta > 2) return;

      onModelClick(point);
    },
    [camera, gl, onModelClick]
  );

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={scale}
      onDoubleClick={handleClick}
    />
  );
}
