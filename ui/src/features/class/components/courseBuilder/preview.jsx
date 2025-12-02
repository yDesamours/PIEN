import { useContext, useRef } from "react";
import { courseBuilderContext } from "../../../../context/courseContext";
import PreviewElement from "../container/previewElement";

export default function Preview() {
  const { content } = useContext(courseBuilderContext);
  const previewRef = useRef();

  const requestFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }
    previewRef.current.requestFullscreen();
  };

  return (
    <div className=" relative py-8 flex-1 bg-background-1 overflow-auto">
      <section
        ref={previewRef}
        className=" relative flex flex-col flex-1 gap-4 w-[60%] m-auto  p-8  rounded-xl bg-white"
      >
        {content.map((c) => (
          <PreviewElement {...c} key={c.id} />
        ))}
        {!document.fullscreenElement ? (
          <p onClick={requestFullScreen} className="absolute right-1 bottom-1">
            Plein ecran
          </p>
        ) : null}
      </section>
    </div>
  );
}
