import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { courseBuilderContext } from "../../../../context/courseContext";
import Box from "../container/box";
import useScale from "../../../../hooks/scale";

export default function CourseContent() {
  const [scale, zoomInOrOut] = useScale();
  const { content } = useContext(courseBuilderContext);
  const contentRef = useRef();

  useEffect(() => {
    if (!contentRef) {
      return;
    }

    contentRef.current.addEventListener("wheel", zoomInOrOut);

    return () => {
      if (contentRef.current) {
        contentRef.current.removeEventListener("wheel", zoomInOrOut);
      }
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className="pt-8 flex-1  bg-background-1 overflow-auto "
    >
      <section
        className={`flex flex-col flex-1 gap-4 w-[60%] m-auto  p-8  bg-white transition-all duration-100 transform scale-${scale}`}
        id="course-content"
      >
        {content.map((e, _, list) => {
          const tools = e.component !== "new" || list.length > 1;
          return <Box {...e} key={e.id} tools={tools} />;
        })}
      </section>
    </div>
  );
}
