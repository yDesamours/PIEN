const sizeStep = 40;

export default function BullseyeDiagramViewer({ data }) {
  const entries = Object.entries(data);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Editeur de labels */}
      <div className="flex-1 space-y-4">
        <p className="h-20"> + Ajouter</p>

        {entries.map(([id, ring]) => (
          <div key={id} className="border p-3 rounded shadow space-y-2">
            <p className="font-bold text-sm w-full">{ring.title}</p>

            <p className="text-sm w-full">{ring.description}</p>
          </div>
        ))}
      </div>

      {/* Diagramme */}
      <div className="relative flex-4 border rounded-lg">
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
  );
}
