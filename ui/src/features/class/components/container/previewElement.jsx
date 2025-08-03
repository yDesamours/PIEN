import Viewer3d from "../view/3dViewer";
import AudioViewer from "../view/audioViewer";
import CodeBlockViewer from "../view/codeBlockViewer";
import DocumentViewwer from "../view/documentViewer";
import FormulaViewer from "../view/formulaViewer";
import GalleryViewer from "../view/galleryViewer";
import Text from "../view/text";
import VideoViewer from "../view/videoViewer";
import Empty from "./empty";

function toComponent(component) {
  switch (component) {
    case "text":
      return Text;
    case "audio":
      return AudioViewer;
    case "recorder":
      return AudioViewer;
    case "video":
      return VideoViewer;
    case "document":
      return DocumentViewwer;
    case "3d":
      return Viewer3d;
    case "gallery":
      return GalleryViewer;
    case "code":
      return CodeBlockViewer;
    case "formula":
      return FormulaViewer;
    default:
      return Empty;
  }
}

export default function PreviewElement({ component, data, order }) {
  const Component = toComponent(component);
  const componentProps = { data };

  return (
    <article
      className={`flex flex-col order-${order} gap-1 bg-custom-test-color`}
    >
      <Component {...componentProps} />
    </article>
  );
}
