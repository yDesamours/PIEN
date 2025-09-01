import { useNavigate } from "react-router-dom";
import ClasseItem from "./classeItem";

export default function Classes({ data = [] }) {
  const navigate = useNavigate();

  const onClassClicked = (c) => {
    navigate(`${c.id}`);
  };

  return (
    <ul className="flex flex-wrap w-full gap-4 ">
      {data.map((c) => (
        <ClasseItem classe={c} key={c.id} onClick={() => onClassClicked(c)} />
      ))}
    </ul>
  );
}
