import { useContext } from "react";
import NewContent from "../content/newContent";
import { courseBuilderContext } from "../../../../context/courseContext";
import Box from "../container/box";

export default function CourseContent() {
  const {
    content: { blocks },
  } = useContext(courseBuilderContext);

  return (
    <section className="flex flex-col flex-1 gap-4 m-0" id="course-content">
      {blocks.map((e, _, list) => {
        const tools = e.component !== "new" || list.length > 1;
        return <Box {...e} key={e.id} tools={tools} />;
      })}
    </section>
  );
}
