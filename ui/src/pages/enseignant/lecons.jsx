import { useParams } from "react-router-dom";
import Lecons from "../../features/class/components/lessons/lecons";

const lecons = [
  {
    id: 1,
    title: "Lesson 1",
    description: "This is the first lesson",
    video: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  {
    id: 2,
    title: "Lesson 2",
    description: "This is the second lesson",
    video: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
  {
    id: 3,
    title: "Lesson 3",
    description: "This is the third lesson",
    video: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  },
];

export default function Lecon() {
  const params = useParams();

  return (
    <div>
      <h1>Lessons</h1>
      <Lecons lecons={lecons} />
    </div>
  );
}
