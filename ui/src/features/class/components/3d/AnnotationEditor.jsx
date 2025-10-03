import { Environment, Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useRef, useState } from "react";
import EditableModel from "./editableModel";
import Marker from "./annotations/marker";
import { AxesHelper } from "three";
import Annotation from "./annotations/annotation";
import { colorRand } from "../../../../utils/utils";
import Markers from "./annotations/markers";
import CameraFocus from "./cameraFocus";

export default function AnnotationEditor({
  modelPath,
  initialAnnotations = [],
  onSaveAnnotations,
  environmentPreset = "/model/hdr/empty_warehouse.hdr",
  className,
}) {
  const [annotations, setAnnotations] = useState(initialAnnotations);
  const newAnnotationData = (point) => ({
    id: crypto.randomUUID(),
    title: "new",
    description: "",
    position: { ...point },
    color: colorRand(),
  });
  const controls = useRef();
  const [targetPoint, setTargetPoint] = useState([0, 0, 0]);

  const handleModelClick = useCallback((point) => {
    setAnnotations((state) => [...state, newAnnotationData(point)]);
    return;
  }, []);

  const handleDeleteAnnotation = (annoId) => {
    setAnnotations((prev) => prev.filter((anno) => anno.id !== annoId));
  };

  const handleSaveAllAnnotations = () => {
    if (onSaveAnnotations) {
      onSaveAnnotations(annotations);
    }
  };

  const handleAnnotationClicked = (id) => {
    const annotation = annotations.find((e) => e.id === id);
    if (!annotation) {
      return;
    }
    const [x, y, z] = annotation.position;
    setTargetPoint(new THREE.Vector3(x, y, z));
  };

  return (
    <div className={className}>
      <div className="flex gap-3 h-full">
        <div className="flex-3">
          <div className="h-full">
            <Canvas>
              <color attach="background" args={["#F0F8FF"]} />{" "}
              <Environment files={environmentPreset} />
              <OrbitControls makeDefault ref={controls} />
              <Suspense fallback={<Html center>Chargement du modèle...</Html>}>
                <EditableModel
                  modelPath={modelPath}
                  scale={3}
                  onModelClick={handleModelClick}
                />
                <primitive object={new AxesHelper(50)} />

                {/* Affichage des annotations existantes */}
                <Markers
                  annotations={annotations}
                  onClick={handleAnnotationClicked}
                />
                {/* <CameraFocus
                  controlsRef={controls}
                  targetPoint={targetPoint}
                  setTargetPoint={setTargetPoint}
                /> */}
              </Suspense>
            </Canvas>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <Annotation
            annotations={annotations}
            deleteAnnotation={handleDeleteAnnotation}
            onSave={handleSaveAllAnnotations}
            canEdit={true}
          />
        </div>
        <div style={{ clear: "both" }}></div> {/* Pour gérer le float */}
      </div>
    </div>
  );
}
