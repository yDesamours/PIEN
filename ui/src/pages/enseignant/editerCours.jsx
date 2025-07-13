import { useParams } from "react-router-dom";
import CourseBuilder from "../../features/class/components/courseBuilder/courseBuilder";

export default function Cours() {
  const params = useParams();
  return <CourseBuilder />;
}
