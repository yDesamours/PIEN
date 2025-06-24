import { useContext } from "react";
import NewContent from "../content/newContent";
import { courseBuilderContext } from "../../../../context/courseContext";
import Box from "../container/box";

export default function CourseContent() {
  const {
    content: { blocks },
  } = useContext(courseBuilderContext);

  return (
    <div className="flex flex-col flex-1 gap-4">
      {blocks.map((e, _, list) => {
        const tools = e.component !== "new" || list.length > 1;
        return <Box {...e} key={e.id} tools={tools} />;
      })}
    </div>
  );
}
