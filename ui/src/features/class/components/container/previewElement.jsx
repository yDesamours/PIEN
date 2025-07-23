import AudioViewer from "../view/audioViewer";
import DocumentViewwer from "../view/documentViewer";
import Text from "../view/text";
import VideoViewer from "../view/videoViewer";
import Empty from "./empty";

function toComponent(component) {
  switch (component) {
    case "text":
      return Text;
    case "audio":
      return AudioViewer;
    case "video":
      return VideoViewer;
    case "document":
      return DocumentViewwer;
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
