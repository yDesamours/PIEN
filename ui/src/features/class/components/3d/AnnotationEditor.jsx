import { useCallback, useState } from "react";

export default function AnnotationEditor({
  modelPath,
  initialAnnotations = [],
  onSaveAnnotations,
}) {
  const [annotations, setAnnotations] = useState(initialAnnotations);
  const [newAnnotationData, setNewAnnotationData] = useState({
    id: "",
    title: "",
    description: "",
    position: null,
  });
  const [editingId, setEditingId] = useState(null);

  const handleModelClick = useCallback(
    (point) => {
      // Si nous ne sommes pas déjà en train d'ajouter une annotation, ou si c'est la première
      if (!newAnnotationData.position && !editingId) {
        setNewAnnotationData({
          id: `annotation-${Date.now()}`,
          title: "",
          description: "",
          position: { x: point.x, y: point.y, z: point.z },
        });
        setEditingId(`annotation-${Date.now()}`);
      } else if (editingId && newAnnotationData.position) {
        setNewAnnotationData((prev) => ({
          ...prev,
          position: { x: point.x, y: point.y, z: point.z },
        }));

        setAnnotations((prevAnnos) =>
          prevAnnos.map((anno) =>
            anno.id === editingId
              ? { ...anno, position: { x: point.x, y: point.y, z: point.z } }
              : anno
          )
        );
      }
    },
    [newAnnotationData.position, editingId]
  );

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setNewAnnotationData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewAnnotation = () => {
    if (
      newAnnotationData.title &&
      newAnnotationData.description &&
      newAnnotationData.position
    ) {
      if (editingId) {
        setAnnotations((prevAnnos) =>
          prevAnnos.map((anno) =>
            anno.id === editingId ? newAnnotationData : anno
          )
        );
      } else {
        setAnnotations((prev) => [...prev, newAnnotationData]);
      }
      setNewAnnotationData({
        id: "",
        title: "",
        description: "",
        position: null,
      });
      setEditingId(null);
    } else {
      alert("Veuillez remplir le titre et la description de l'annotation.");
    }
  };

  const handleEditAnnotation = (annoId) => {
    const annoToEdit = annotations.find((anno) => anno.id === annoId);
    if (annoToEdit) {
      setNewAnnotationData(annoToEdit);
      setEditingId(annoId);
    }
  };

  const handleDeleteAnnotation = (annoId) => {
    setAnnotations((prev) => prev.filter((anno) => anno.id !== annoId));
    if (editingId === annoId) {
      setNewAnnotationData({
        id: "",
        title: "",
        description: "",
        position: null,
      });
      setEditingId(null);
    }
  };

  const handleCancelEdit = () => {
    setNewAnnotationData({
      id: "",
      title: "",
      description: "",
      position: null,
    });
    setEditingId(null);
  };

  // Fonction pour sauvegarder toutes les annotations vers le backend
  const handleSaveAllAnnotations = () => {
    if (onSaveAnnotations) {
      onSaveAnnotations(annotations);
      alert(
        "Annotations sauvegardées ! (Vérifiez la console pour les données)"
      );
      console.log("Annotations à envoyer au backend:", annotations);
    }
  };

  return (
    <div className="editor-container">
      <h2>Éditeur d'Annotations 3D</h2>
      <p>
        Cliquez sur le modèle pour ajouter/repositionner une annotation. Cliquez
        sur une annotation existante pour l'éditer.
      </p>

      <div className="canvas-and-controls">
        <div
          className="canvas-wrapper"
          style={{
            height: "600px",
            width: "70%",
            float: "left",
            marginRight: "20px",
          }}
        >
          <Canvas>
            <color attach="background" args={["#F0F8FF"]} />{" "}
            {/* Couleur de fond pour l'éditeur */}
            <Environment preset="studio" />{" "}
            {/* Environnement neutre pour l'édition */}
            <ambientLight intensity={0.6} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={1.5}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.8} />
            <OrbitControls makeDefault />
            <Suspense fallback={<Html center>Chargement du modèle...</Html>}>
              <EditableModel
                modelPath={modelPath}
                scale={0.01} // Peut être rendu configurable aussi
                onModelClick={handleModelClick}
              />

              {/* Affichage des annotations existantes */}
              {annotations.map((anno) => (
                <Html
                  key={anno.id}
                  position={[anno.position.x, anno.position.y, anno.position.z]}
                  className={`annotation-label ${
                    editingId === anno.id ? "editing" : ""
                  }`}
                  occlude
                  distanceFactor={10}
                  sprite
                  transform
                  onClick={() => handleEditAnnotation(anno.id)}
                >
                  <div className="annotation-icon"></div>
                  {/* Afficher le titre si ce n'est pas l'annotation en cours d'édition */}
                  {editingId !== anno.id && (
                    <div className="annotation-content-preview">
                      <h3>{anno.title}</h3>
                    </div>
                  )}
                </Html>
              ))}

              {/* Affichage de la nouvelle annotation en cours de création/édition */}
              {newAnnotationData.position && editingId && (
                <Html
                  key="editing-annotation"
                  position={[
                    newAnnotationData.position.x,
                    newAnnotationData.position.y,
                    newAnnotationData.position.z,
                  ]}
                  className="annotation-label editing-new"
                  occlude
                  distanceFactor={10}
                  sprite
                  transform
                >
                  <div className="annotation-icon"></div>
                  <div className="annotation-content editor-form">
                    <h3>
                      {editingId === newAnnotationData.id
                        ? "Nouvelle annotation"
                        : "Éditer annotation"}
                    </h3>
                    <label>Titre:</label>
                    <input
                      type="text"
                      name="title"
                      value={newAnnotationData.title}
                      onChange={handleFormChange}
                      placeholder="Titre de l'annotation"
                    />
                    <label>Description:</label>
                    <textarea
                      name="description"
                      value={newAnnotationData.description}
                      onChange={handleFormChange}
                      placeholder="Description détaillée"
                    ></textarea>
                    <p>
                      Position: X: {newAnnotationData.position.x.toFixed(3)}, Y:{" "}
                      {newAnnotationData.position.y.toFixed(3)}, Z:{" "}
                      {newAnnotationData.position.z.toFixed(3)}
                    </p>
                    <div className="button-group">
                      <button onClick={handleSaveNewAnnotation}>
                        {editingId === newAnnotationData.id
                          ? "Ajouter"
                          : "Mettre à jour"}
                      </button>
                      {editingId && (
                        <button
                          onClick={() => handleDeleteAnnotation(editingId)}
                          className="delete-button"
                        >
                          Supprimer
                        </button>
                      )}
                      <button
                        onClick={handleCancelEdit}
                        className="cancel-button"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                </Html>
              )}
            </Suspense>
          </Canvas>
        </div>
        <div
          className="annotation-list-panel"
          style={{ width: "25%", float: "left" }}
        >
          <h3>Annotations Actuelles</h3>
          {annotations.length === 0 ? (
            <p>Aucune annotation. Cliquez sur le modèle pour en ajouter une.</p>
          ) : (
            <ul>
              {annotations.map((anno) => (
                <li key={anno.id}>
                  <strong>{anno.title}</strong>
                  <button onClick={() => handleEditAnnotation(anno.id)}>
                    Éditer
                  </button>
                  <button
                    onClick={() => handleDeleteAnnotation(anno.id)}
                    className="delete-button"
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={handleSaveAllAnnotations}
            className="save-all-button"
          >
            Sauvegarder toutes les annotations
          </button>
        </div>
        <div style={{ clear: "both" }}></div> {/* Pour gérer le float */}
      </div>
    </div>
  );
}
