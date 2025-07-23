import { useContext } from "react";
import { courseBuilderContext } from "../../../../context/courseContext";
import Text from "../view/text";
import PreviewElement from "../container/previewElement";

export default function Preview() {
  const { content } = useContext(courseBuilderContext);

  return (
    <section className="flex flex-col flex-1 gap-4">
      {content.blocks.map((c) => (
        <PreviewElement {...c} key={c.id} />
      ))}
    </section>
  );
}
