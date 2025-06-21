import { useContext } from "react";
import NewContent from "../content/newContent";
import { courseBuilderContext } from "../../../../context/courseContext";
import Box from "../container/box";

export default function CourseContent() {
  const {
    content: { blocks },
  } = useContext(courseBuilderContext);
  return (
    <div className="flex-1 space-y-4">
      {blocks.map((e) => (
        <Box {...e} key={e.id} />
      ))}
      <NewContent />
    </div>
  );
}
