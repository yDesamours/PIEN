import Quill from "quill";
import { useEffect, useRef } from "react";

const toolbarOptions = [[{ color: [] }, { background: [] }]];

export default function Blockquote({ data, save }) {
  const isMounted = useRef(false);
  const editorRef = useRef(null);
  /**
   * @type{Quill}
   */
  let quill = null;

  useEffect(() => {
    if (isMounted.current) {
      return;
    }

    quill = new Quill(editorRef.current, {
      modules: {
        toolbar: toolbarOptions,
      },
      placeholder: "taper votre text ici",
      theme: "snow",
    });
    quill.formatText(0, 1, "blockquote", true);
    isMounted.current = true;

    if (data) {
      quill.setContents(data.content);
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      save({ content: quill.getContents() });
    });
  }, []);

  return (
    <div className="flex flex-col text-left m-0 p-4 bg-white rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Citation</h3>
      <div className="flex flex-col">
        <div ref={editorRef}></div>
      </div>
    </div>
  );
}
