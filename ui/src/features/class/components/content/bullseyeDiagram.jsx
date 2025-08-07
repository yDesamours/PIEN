import { useState } from "react";
import Trash from "../../../../assets/icons/trash.svg?react";
import Modal from "../../../../components/modal/modal";

const sizeStep = 40;

export default function BullseyeDiagramEditor({ data, save, update }) {
  const [open, setOpen] = useState(false);
  const entries = Object.entries(data);

  const addRing = () => {
    const newRing = {
      title: "New Label",
      description: "",
    };
    save({ [crypto.randomUUID()]: newRing });
  };

  const updateLabel = (id, field, value) => {
    const ring = data[id];
    if (!ring) {
      return;
    }
    const newRing = Object.assign(ring, { [field]: value });
    save({ [id]: newRing });
  };

  const removeLabel = (id) => {
    const rings = { ...data };
    delete rings[id];
    update(rings);
  };

  const onEditDiagram = () => {
    setOpen(true);
  };

  const onEditDiagramEnd = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          Diagramme Bullseye
        </h3>
        <button
          onClick={onEditDiagram}
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Editer
        </button>
      </div>
      <Modal
        title="Editer le diagramme"
        isOpen={open}
        onClose={onEditDiagramEnd}
      >
        <div className="flex flex-col h-full md:flex-row gap-6">
          {/* Editeur de labels */}
          <div className="flex-1 space-y-4">
            {entries.map(([id, ring]) => (
              <div key={id} className="border p-3 rounded shadow space-y-2">
                <div className="flex justify-between items-center">
                  <input
                    className="font-bold text-sm w-full"
                    value={ring.title}
                    onChange={(e) => updateLabel(id, "title", e.target.value)}
                  />
                  <button
                    onClick={() => removeLabel(id)}
                    className="text-red-600 ml-2"
                  >
                    <Trash className="w-3 h-3" />
                  </button>
                </div>
                <input
                  className="text-sm w-full"
                  placeholder="Description"
                  value={ring.description}
                  onChange={(e) =>
                    updateLabel(id, "description", e.target.value)
                  }
                />
              </div>
            ))}
            <button
              onClick={addRing}
              className="px-4 py-2 border-dashed border-1 text-accent border-accent flex justify-center items-center rounded w-full transition"
            >
              + Ajouter
            </button>
          </div>

          {/* Diagramme */}
          <div className="relative  flex-4 border rounded-lg">
            {entries.map((entry, i, rings) => {
              const [id, ring] = entry;
              const width = sizeStep * (i + 1) * 2;
              const decalageY = ((i * 2 + Number(i > 0)) * sizeStep) / 2;

              return (
                <div key={id}>
                  <div
                    className="absolute  rounded-full  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      width: width,
                      height: width,
                      backgroundColor: `hsl(220, 5%, ${30 + i * 10}%)`,
                      zIndex: rings.length - i,
                    }}
                  />
                  <div
                    className="absolute text-xs bg-white shadow p-1 rounded top-1/2 left-1/2 transform -translate-x-1/2 z-40"
                    style={{
                      transform: `translateY(calc(-50% + ${decalageY}px))`,
                    }}
                  >
                    <div className="font-bold">{ring.title}</div>
                    {/* <div className="text-gray-600">{ring.description}</div> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Modal>
    </>
  );
}
