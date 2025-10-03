import { useLoaderData, useParams } from "react-router-dom";
import Lecons from "../../features/enseignant/components/lessons/lecons";
import Loader from "../../components/loader/loader";

export default function Lecon() {
  const { lecons } = useLoaderData();

  return (
    <div>
      <h1>Lessons</h1>
      <Loader promise={lecons}>
        <Lecons />
      </Loader>
    </div>
  );
}
