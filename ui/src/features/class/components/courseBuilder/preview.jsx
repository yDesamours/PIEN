import { useContext } from "react";
import { courseBuilderContext } from "../../../../context/courseContext";
import Text from "../view/text";
import PreviewElement from "../container/previewElement";

export default function Preview() {
  const { content } = useContext(courseBuilderContext);

  return (
    <div className="py-8 flex-1 bg-background-1 h-full">
      <section className="flex flex-col flex-1 gap-4 w-[60%] m-auto  p-8 h-full rounded-xl bg-white">
        {content.blocks.map((c) => (
          <PreviewElement {...c} key={c.id} />
        ))}
      </section>
    </div>
  );
}
