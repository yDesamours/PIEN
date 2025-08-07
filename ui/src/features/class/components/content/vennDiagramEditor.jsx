import { useState, useMemo, useCallback } from "react";
import { VennDiagram, extractSets, asSets } from "@upsetjs/react";
import { isEmpty } from "../../../../utils/utils";

export default function VennDiagramEditor({ data, save }) {
  const [newSet, setNewSet] = useState(null);
  const elems = Object.values(data.sets);

  const sets = useMemo(
    () =>
      extractSets(elems).map((set) => ({
        ...set,
        color: data.sets[set.name].color,
      })),
    [elems]
  );

  const handleAddElem = () => {
    setNewSet({
      name: "",
      sets: [],
      color: "#ffffff",
      id: new Date().toString() + Math.random(),
    });
  };

  const handleSave = () => {
    if (newSet === null) {
      return;
    }
    if (isEmpty(newSet.name) || isEmpty(newSet.sets)) {
      return;
    }
    const { name, color, sets } = newSet;
    const set = {
      name,
      color,
      sets: sets
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    const newSets = { ...data.sets };
    newSets[name] = set;
    save({ sets: newSets });
    setNewSet(null);
  };

  const onNewElement = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setNewSet((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (id, key, value) => {
    setElems((prev) =>
      prev.map((el) =>
        el.id === id
          ? {
              ...el,
              [key]:
                key === "sets"
                  ? value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  : value,
            }
          : el
      )
    );
  };

  return (
    <div className="p-6 border rounded-lg shadow bg-white space-y-4">
      <h2 className="text-2xl font-bold">Diagramme de Venn</h2>
      <p className="text-sm text-gray-500">
        Chaque élément appartient à un ou plusieurs ensembles&nbsp;(ex: A, B,
        A+B)
      </p>

      <div className="space-y-2">
        {newSet && (
          <div className="flex items-center gap-2">
            {/* <div className="font-mono">{el.name} :</div> */}
            <input
              type="text"
              name="sets"
              value={newSet.sets}
              onChange={onNewElement}
              placeholder="Ex: A,B"
              className="border rounded px-2 py-1 w-48"
            />
            <input
              type="text"
              name="name"
              value={newSet.name}
              onChange={onNewElement}
              className="border rounded px-2 py-1 w-48"
            />
            <input
              type="color"
              name="color"
              value={newSet.color}
              onChange={onNewElement}
              className="w-10 h-6"
              title="Choisir une couleur"
            />
          </div>
        )}
        {newSet === null ? (
          <button
            onClick={handleAddElem}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + Ajouter un élément
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            + save
          </button>
        )}
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <VennDiagram sets={sets} width={400} height={300} />
      </div>
    </div>
  );
}
