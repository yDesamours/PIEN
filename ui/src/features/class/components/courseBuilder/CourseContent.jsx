import { useContext } from "react";
import NewContent from "../content/newContent";
import { courseBuilderContext } from "../../../../context/courseContext";
import Box from "../container/box";

export default function CourseContent() {
  const {
    content: { blocks },
  } = useContext(courseBuilderContext);

  return (
    <div className="py-8 flex-1 bg-background-1">
      <section
        className="flex flex-col flex-1 gap-4 w-[60%] m-auto  p-8 h-full rounded-xl bg-white"
        id="course-content"
      >
        {blocks.map((e, _, list) => {
          const tools = e.component !== "new" || list.length > 1;
          return <Box {...e} key={e.id} tools={tools} />;
        })}
      </section>
    </div>
  );
}
