import { useCallback, useContext, useEffect, useRef, useState } from "react";
import Empty from "./empty";
import Text from "../content/text";
import Trash from "../../../../assets/icons/trash.svg?react";
import Duplicate from "../../../../assets/icons/duplicate.svg?react";
import { courseBuilderContext } from "../../../../context/courseContext";
import ImagePicker from "../content/imagePicker";
import AudioPicker from "../content/audioPicker";
import VideoPicker from "../content/videoPicker";
import GlbPicker from "../content/GlbPicker";
import DocumentPicker from "../content/documentPicker";
import NewContent from "../content/newContent";
import TwoColumns from "../organizer/twoColumns";
import ThreeColumns from "../organizer/threeColumns";
import ColumnChoser from "../organizer/columnChoser";
import QuestionLibre from "../evaluation/questionLibre";
import VraiFaux from "../evaluation/vraiFaux";
import QuestionMultiple from "../evaluation/questionMultiple";
import AudioRecorder from "../content/audioRecorder";
import ImageGallery from "../content/imageGallery";
import CodeBlock from "../content/codeBlock";
import title from "../content/title";
import Blockquote from "../content/blockquote";
import FormulaEditor from "../content/formulaEditor";

function toComponent(type) {
  switch (type) {
    case "text":
      return Text;
    case "titre":
      return title;
    case "quote":
      return Blockquote;
    case "formula":
      return FormulaEditor;
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
    case "twoColumns":
      return TwoColumns;
    case "columnChoser":
      return ColumnChoser;
    case "threeColumns":
      return ThreeColumns;
    case "questionLibre":
      return QuestionLibre;
    case "vraiFaux":
      return VraiFaux;
    case "questionMultiple":
      return QuestionMultiple;
    case "recorder":
      return AudioRecorder;
    case "gallery":
      return ImageGallery;
    case "code":
      return CodeBlock;
    default:
      return Empty;
  }
}

export default function Box({ component, data, id, order, tools = true }) {
  const Component = toComponent(component);
  const { deleteBox, duplicate, addAfter, saveBlock } =
    useContext(courseBuilderContext);

  const save = useCallback((data) => saveBlock(id, data), [saveBlock, id]);
  const componentProps = {
    id,
    save,
    data,
  };

  return (
    <article
      className={`flex flex-col order-${order} gap-1 bg-custom-test-color`}
    >
      <Component {...componentProps} />

      {tools && (
        <div className="flex justify-end space-x-2">
          {component !== "new" && (
            <>
              <button
                onClick={() => addAfter(id)}
                className="text-blue-500 cursor-pointer"
              >
                +
              </button>

              <Duplicate
                role="button"
                className="w-3 cursor-pointer text-green-500"
                onClick={() => duplicate(id)}
              />
            </>
          )}
          <Trash
            role="button"
            className="w-3 cursor-pointer text-red-500"
            onClick={() => deleteBox(id)}
          />
        </div>
      )}
    </article>
  );
}
