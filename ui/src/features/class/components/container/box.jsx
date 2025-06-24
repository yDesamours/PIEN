import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Empty from "./empty";
import Text from "../content/text";
import Trash from "../../../../assets/icons/trash.svg?react";
import Duplicate from "../../../../assets/icons/duplicate.svg?react";
import { courseBuilderContext } from "../../../../context/courseContext";
import ImagePicker from "../content/imagePicker";
import AudioPicker from "../content/audioPicker";
import VideoPicker from "../content/videoPicker";
import GlbPicker from "../content/3dPicker";
import DocumentPicker from "../content/documentPicker";
import NewContent from "../content/newContent";

function toComponent(type) {
  switch (type) {
    case "text":
      return Text;
    case "image":
      return ImagePicker;
    case "audio":
      return AudioPicker;
    case "video":
      return VideoPicker;
    case "3d":
      return GlbPicker;
    case "document":
      return DocumentPicker;
    case "new":
      return NewContent;
    default:
      return Empty;
  }
}

export default function Box({ component, data, id, order, tools = true }) {
  const Component = toComponent(component);
  const { deleteBox, duplicate, addAfter, saveBlock } =
    useContext(courseBuilderContext);

  const save = (data) => saveBlock(id, data);

  return (
    <div className={`flex flex-col order-${order} gap-1 bg-custom-test-color`}>
      <Component data={data} id={id} save={save} />

      {tools && (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => addAfter(id)}
            className="text-red-500 cursor-pointer"
          >
            +
          </button>
          <Duplicate
            role="button"
            className="w-3 cursor-pointer"
            onClick={() => duplicate(id)}
          />
          <Trash
            role="button"
            className="w-3 cursor-pointer"
            onClick={() => deleteBox(id)}
          />
        </div>
      )}
    </div>
  );
}
