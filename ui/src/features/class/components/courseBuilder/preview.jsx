import { useContext } from "react";
import { courseBuilderContext } from "../../../../context/courseContext";
import PreviewElement from "../container/previewElement";

export default function Preview() {
  const { content } = useContext(courseBuilderContext);

  return (
    <div className="py-8 flex-1 bg-background-1 overflow-auto">
      <section className="flex flex-col flex-1 gap-4 w-[60%] m-auto  p-8  rounded-xl bg-white">
        {content.map((c) => (
          <PreviewElement {...c} key={c.id} />
        ))}
      </section>
    </div>
  );
}
