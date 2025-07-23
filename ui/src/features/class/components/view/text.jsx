import Quill, { Delta } from "quill";
import { useEffect, useRef, useState } from "react";

export default function Text({ data }) {
  const ref = useRef(null);
  /**
   * @type{Quill}
   */
  let quill = null;
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (!ref.current) return;

    quill = new Quill(ref.current);
    quill.setContents(data.content);
    setContent(quill.getSemanticHTML());
  }, []);

  return (
    <>
      <div className="invisible absolute" ref={ref}></div>
      {content && <div dangerouslySetInnerHTML={{ __html: content }}></div>}
    </>
  );
}
