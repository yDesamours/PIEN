import { Environment, Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useCallback, useState } from "react";
import EditableModel from "./editableModel";
import Marker from "./annotations/marker";
import { AxesHelper } from "three";
import Annotation from "./annotations/annotation";

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
  });

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

  return (
    <div className={className}>
      <div className="flex gap-3 h-full">
        <div className="flex-3">
          <div className="h-full">
            <Canvas>
              <color attach="background" args={["#F0F8FF"]} />{" "}
              <Environment files={environmentPreset} />
              <OrbitControls makeDefault />
              <Suspense fallback={<Html center>Chargement du modèle...</Html>}>
                <EditableModel
                  modelPath={modelPath}
                  scale={3}
                  onModelClick={handleModelClick}
                />
                <primitive object={new AxesHelper(50)} />

                {/* Affichage des annotations existantes */}
                {annotations.map((anno, index) => {
                  const { x, y, z } = anno.position;
                  return <Marker position={[x, y, z]} />;
                })}
              </Suspense>
            </Canvas>
          </div>
        </div>
        <div className="flex-1 flex flex-col">
          <h3>Annotations</h3>
          {annotations.length === 0 ? (
            <p>Aucune annotation.</p>
          ) : (
            <>
              <Annotation
                annotations={annotations}
                deleteAnnotation={handleDeleteAnnotation}
                onSave={handleSaveAllAnnotations}
              />
            </>
          )}
        </div>
        <div style={{ clear: "both" }}></div> {/* Pour gérer le float */}
      </div>
    </div>
  );
}
