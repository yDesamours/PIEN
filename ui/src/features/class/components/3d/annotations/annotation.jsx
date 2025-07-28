import AnnotationEditor from "./annotationEditor";

export default function Annotation({
  annotations = [],
  deleteAnnotation,
  onSave,
}) {
  return (
    <div className="flex flex-col justify-between h-full p-4">
      <ul className="w-full  max-w-2xl mx-auto rounded-lg  bg-white overflow-y-auto">
        {annotations.map(({ title, description, id }) => (
          <AnnotationEditor
            key={id}
            title={title}
            description={deleteAnnotation}
            id={id}
            deleteAnnotation={deleteAnnotation}
          />
        ))}
      </ul>
      <button onClick={onSave}>Enregistrer</button>
    </div>
  );
}
