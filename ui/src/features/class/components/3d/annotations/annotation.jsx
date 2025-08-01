import AnnotationEditor from "./annotationEditor";

export default function Annotations({
  annotations = [],
  deleteAnnotation,
  onSave,
  canEdit = false,
}) {
  return (
    <div className="flex flex-col justify-between h-full p-4">
      <ul className="w-full  max-w-2xl mx-auto rounded-lg  bg-white overflow-y-auto">
        <h3 className="font-[500] text-xl">Annotations</h3>

        {annotations.map(({ title, description, id, color }) => (
          <AnnotationEditor
            key={id}
            title={title}
            description={description}
            id={id}
            deleteAnnotation={deleteAnnotation}
            color={color}
            canEdit={canEdit}
          />
        ))}
      </ul>
      {canEdit && <button onClick={onSave}>Enregistrer</button>}
    </div>
  );
}
