import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Empty from "./empty";
import Text from "../content/text";
import Trash from "../../../../assets/icons/trash.svg?react";
import Duplicate from "../../../../assets/icons/duplicate.svg?react";
import { courseBuilderContext } from "../../../../context/courseContext";
import ImagePicker from "../content/imagePicker";

function toComponent(type) {
  switch (type) {
    case "text":
      return Text;
    case "image":
      return ImagePicker;
    default:
      return Empty;
  }
}

export default function Box({ component, data, id }) {
  const Component = toComponent(component);
  const { deleteBox, duplicate } = useContext(courseBuilderContext);
  return (
    <div className="flex flex-col space-y-1">
      <Component {...data} />
      <div className="flex justify-end space-x-2">
        <button className="text-red-500 cursor-pointer">+</button>
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
    </div>
  );
}
