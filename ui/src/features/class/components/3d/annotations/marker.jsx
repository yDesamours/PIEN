import React from "react";
import { Sphere } from "@react-three/drei";

export default function Marker({
  position,
  color = "red",
  size = 0.05,
  id,
  onClick = () => {},
}) {
  return (
    <Sphere
      args={[size, 32, 32]}
      position={position}
      onClick={() => onClick(id)}
    >
      <meshBasicMaterial attach="material" color={color} />
    </Sphere>
  );
}
