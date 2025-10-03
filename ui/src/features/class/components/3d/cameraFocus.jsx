import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function CameraFocus({
  controlsRef,
  targetPoint,
  cameraOffsetDistance = 3,
  setTargetPoint,
}) {
  const { camera } = useThree();
  const startTarget = useRef(new THREE.Vector3());
  const endTarget = useRef(new THREE.Vector3());
  const startCameraPosition = useRef(new THREE.Vector3());
  const endCameraPosition = useRef(new THREE.Vector3());
  const startTime = useRef(0);
  const duration = 0.8;

  // Vecteurs temporaires pour les calculs dans usfocueFrame (optimisation)
  const tempDirection = useRef(new THREE.Vector3()).current;
  const tempOrigin = useRef(new THREE.Vector3(0, 0, 0)).current;

  useEffect(() => {
    if (targetPoint && controlsRef.current) {
      controlsRef.current.enabled = false;
      endTarget.current.fromArray(targetPoint);

      // 2. Calculer la nouvelle position de la caméra
      //    a. Obtenir le vecteur directionnel du centre [0,0,0] vers le point cliqué
      tempDirection.copy(endTarget.current).sub(tempOrigin).normalize();

      //    b. Multiplier ce vecteur par la distance de recul souhaitée
      //       et l'ajouter au point cliqué (pour reculer du point)
      //       Ou, plus simple: Multiplier par la distance, ce sera la position relative à l'origine
      //       Si le point est [0.5, 0.5, 0.5] et distance=3, la caméra sera à [2.5, 2.5, 2.5]
      //       Assure que la caméra est à 'cameraOffsetDistance' du point cliqué
      endCameraPosition.current
        .copy(tempDirection)
        .multiplyScalar(cameraOffsetDistance * 10)
        .add(endTarget.current);

      // Enregistrer les positions de départ pour l'interpolation
      startTarget.current.copy(controlsRef.current.target);
      startCameraPosition.current.copy(camera.position); // Position actuelle de la caméra

      startTime.current = performance.now();
    }
  }, [targetPoint, controlsRef, camera, cameraOffsetDistance]);

  useFrame(() => {
    if (controlsRef.current && targetPoint) {
      const elapsed = (performance.now() - startTime.current) / 1000;
      const t = Math.min(1, elapsed / duration); // Facteur d'interpolation (0 à 1)

      //Interpoler la cible des contrôles
      controlsRef.current.target.lerpVectors(
        startTarget.current,
        endTarget.current,
        t
      );

      // Interpoler la position de la caméra
      camera.position.lerpVectors(
        startCameraPosition.current,
        endCameraPosition.current,
        t
      );

      // Mettre à jour les contrôles pour qu'ils prennent en compte la nouvelle position et cible
      controlsRef.current.update();

      // Si l'animation est terminée et les contrôles sont actifs, les laisser reprendre la main
      if (t === 1) {
        controlsRef.current.enabled = true;

        // Optionally, disable this component or clear targetPoint to stop useFrame from running
        setTargetPoint(null); // If this component controls the targetPoint state
      }
    }
  });

  return null; // Ce composant ne rend rien visuellement
}
