import { useContext } from "react";
import { courseBuilderContext } from "../../../../../context/courseContext";

import Icon from "../../../../../components/icon/icon";
import ContentChoserItem from "./contentChoserItem";
import ContentChoserContent from "./contentChoserContent";

export default function ContentChoser() {
  const { chooserOpened, closeChooser } = useContext(courseBuilderContext);

  const visible = chooserOpened ? "w-72" : "w-0";

  return (
    <div
      className={`${visible} bg-white transition-all duration-300 ease-in-out z-30 overflow-hidden`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between text-md text-black">
          <p>Choose</p>
          <Icon name="close" onClick={closeChooser} />
        </div>

        <ContentChoserContent>
          <ContentChoserItem icon="text" label="Text" name="text" />
          <ContentChoserItem icon="image" label="Image" name="image" />
          <ContentChoserItem icon="audio" label="Audio" name="audio" />
          <ContentChoserItem icon="video" label="Video" name="video" />
          <ContentChoserItem icon="3d" label="Modele 3d" name="3d" />
        </ContentChoserContent>
      </div>
    </div>
  );
}
