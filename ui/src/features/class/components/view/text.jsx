import Quill, { Delta } from "quill";
import { useEffect, useRef, useState } from "react";
import "quill/dist/quill.snow.css";

export default function Text({ data }) {
  const ref = useRef(null);
  /**
   * @type{Quill}
   */
  let quill = null;
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!ref.current) return;

    quill = new Quill(ref.current, {
      theme: "snow",
    });
    quill.setContents(data.content);
    setContent(quill.getSemanticHTML());
  }, []);

  return (
    <>
      <div className="hidden ">
        <div ref={ref}></div>
      </div>

      <div className="ql-snow">
        {content && (
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        )}
      </div>
    </>
  );
}
