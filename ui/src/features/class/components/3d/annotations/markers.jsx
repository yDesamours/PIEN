import Marker from "./marker";

export default function Markers({ annotations, onClick }) {
  return (
    <>
      {annotations.map((anno) => {
        const { x, y, z } = anno.position;
        return (
          <Marker
            key={anno.id}
            position={[x, y, z]}
            color={anno.color}
            onClick={onClick}
          />
        );
      })}
    </>
  );
}
