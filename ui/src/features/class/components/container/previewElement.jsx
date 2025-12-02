import Viewer3d from "../view/3dViewer";
import AudioViewer from "../view/audioViewer";
import BarplotView from "../view/barplotView";
import BullseyeDiagramViewer from "../view/bullseyeDiagramViewer";
import CodeBlockViewer from "../view/codeBlockViewer";
import DocumentViewwer from "../view/documentViewer";
import FormulaViewer from "../view/formulaViewer";
import GalleryViewer from "../view/galleryViewer";
import GoogleDriveEmbedView from "../view/googleDriveEmbedView";
import GoogleMapsEmbedView from "../view/googleMapEmbedView";
import HistogramView from "../view/histogramView";
import LinePlotView from "../view/linePlotView";
import PieChartView from "../view/pieChartView";
import TableView from "../view/tableView";
import Text from "../view/text";
import VennViewer from "../view/vennViewer";
import VideoViewer from "../view/videoViewer";
import YoutubeEmbedView from "../view/youtubeEmbedView";
import Empty from "./empty";

function toComponent(component) {
  switch (component) {
    case "text":
    case "titre":
    case "quote":
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
    case "bullseye":
      return BullseyeDiagramViewer;
    case "table":
      return TableView;
    case "youtube":
      return YoutubeEmbedView;
    case "map":
      return GoogleMapsEmbedView;
    case "drive":
      return GoogleDriveEmbedView;
    case "barplot":
      return BarplotView;
    case "lineplot":
      return LinePlotView;
    case "piechart":
      return PieChartView;
    case "venn":
      return VennViewer;
    // case "histogram":
    //   return HistogramView;
    default:
      return Empty;
  }
}

export default function PreviewElement({ component, data, order }) {
  const Component = toComponent(component);
  const componentProps = { data };

  return (
    <article className={`order-${order} gap-1 bg-custom-test-color`}>
      <Component {...componentProps} />
    </article>
  );
}
