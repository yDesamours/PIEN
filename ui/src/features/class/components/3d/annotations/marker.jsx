import React from "react";
import { Sphere } from "@react-three/drei";

export default function Marker({ position, color = "red", size = 0.1, id }) {
  return (
    <Sphere args={[size, 32, 32]} position={position}>
      <meshBasicMaterial attach="material" color={color} />
    </Sphere>
  );
}
