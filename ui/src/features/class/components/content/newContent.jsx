import { useContext, useEffect } from "react";
import Plus from "../../../../assets/icons/plus.svg?react";
import { courseBuilderContext } from "../../../../context/courseContext";

export default function NewContent({ id }) {
  const { newOrder, openChooser } = useContext(courseBuilderContext);

  useEffect(() => {
    openChooser(id);
  }, []);

  return (
    <section
      onClick={() => openChooser(id)}
      className={`flex items-center justify-center border border-gray-300 border-dashed h-12`}
    >
      <Plus className="w-6 h-6" />
    </section>
  );
}
