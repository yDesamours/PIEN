import Quill from "quill";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

import "quill/dist/quill.snow.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "formula"],

  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ direction: "rtl" }], // text direction

  [{ size: ["small", false, "large", "huge"] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ["clean"], // remove formatting button
];

const toolbarHandlers = {
  link: function (value) {
    if (value) {
      const href = prompt("Enter the URL");
      this.quill.format("link", href);
    } else {
      this.quill.format("link", false);
    }
  },
};

const Text = forwardRef(({ data, save }, ref) => {
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
        toolbar: {
          container: toolbarOptions,
          handlers: toolbarHandlers,
        },
      },
      placeholder: "taper votre text ici",
      theme: "snow",
    });
    isMounted.current = true;

    if (data) {
      quill.setContents(data.content);
    }

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      save({ content: quill.getContents() });
    });
  }, []);

  return (
    <div className="grid grid-cols-1 text-left m-0 h-full">
      <div ref={editorRef}></div>
    </div>
  );
});

export default Text;
