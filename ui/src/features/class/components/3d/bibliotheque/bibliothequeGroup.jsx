import BibliothequeItem from "./bibliothequeItem";
import { MODELS } from "./models";

export default function BibliothequeGroup({ name, onChoose }) {
  const items = MODELS[name] || [];
  return (
    <div className="flex">
      {items.map(({ name, description, img, path }) => (
        <BibliothequeItem
          onChoose={onChoose}
          path={path}
          description={description}
          name={name}
          img={img}
          key={name}
        />
      ))}
    </div>
  );
}
