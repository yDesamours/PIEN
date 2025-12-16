import { useLoaderData, useParams } from "react-router-dom";
import CourseBuilder from "../../features/class/components/courseBuilder/courseBuilder";
import Loader from "../../components/loader/loader";

export default function Cours() {
  const data = useLoaderData();
  return (
    <Loader promise={data}>
      <CourseBuilder />
    </Loader>
  );
}
