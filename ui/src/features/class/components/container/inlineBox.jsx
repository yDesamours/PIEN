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
import TwoColumns from "../organizer/twoColumns";
import ThreeColumns from "../organizer/threeColumns";
import ColumnChoser from "../organizer/columnChoser";

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
    case "columnChoser":
      return ColumnChoser;
    default:
      return Empty;
  }
}

export default function InlineBox({
  component,
  index,
  data,
  save,
  id,
  onChoose,
}) {
  const Component = toComponent(component);

  const blockData = data ? { data } : {};

  return (
    <article className={`flex flex-col gap-1 bg-custom-test-color`}>
      <Component
        {...blockData}
        id={id}
        save={save}
        onChoose={onChoose}
        index={index}
      />
    </article>
  );
}
