import { useNavigate } from "react-router-dom";
import CoursItem from "./coursItem";

export default function Cours({ data = [] }) {
  const navigate = useNavigate();

  const onCoursClicked = (cours) => {
    navigate(`cours/${cours.id}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-black">Cours</h1>
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full gap-4">
        {data.map((c) => (
          <CoursItem cours={c} key={c.id} onClick={onCoursClicked} />
        ))}
      </ul>
    </div>
  );
}
