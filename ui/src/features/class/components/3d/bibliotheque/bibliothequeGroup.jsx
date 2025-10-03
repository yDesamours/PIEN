import MULTIMEDIA from "../../../../../services/api/multimedia";
import BibliothequeItem from "./bibliothequeItem";

export default function BibliothequeGroup({ name, onChoose, items = [] }) {
  return (
    <div className="flex">
      {items.map(({ name, description, thumbnailUrl, url }) => (
        <BibliothequeItem
          onChoose={onChoose}
          path={MULTIMEDIA.GET_FILE(url)}
          description={description}
          name={name}
          img={MULTIMEDIA.GET_FILE(thumbnailUrl)}
          key={name}
        />
      ))}
    </div>
  );
}
