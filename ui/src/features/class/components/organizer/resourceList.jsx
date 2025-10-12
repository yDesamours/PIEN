import { useContext } from "react";
import Icon from "../../../../components/icon/icon";
import ContentChoserContent from "../courseBuilder/contentChoser/contentChoserContent";
import ContentChoserItem from "../courseBuilder/contentChoser/contentChoserItem";
import { useResourceChoser } from "./resourceChoser";
import { courseBuilderContext } from "../../../../context/courseContext";

export default function ResourceList() {
  const { open, closeChoser, choose } = useResourceChoser();

  const visible = open ? "w-72" : "w-0";

  return (
    <article
      className={`${visible} bg-white transition-all duration-300 ease-in-out z-30 overflow-hidden text-sm`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between text-md text-black">
          <Icon name="close" onClick={closeChoser} />
        </div>
        <ContentChoserContent>
          <ContentChoserItem
            icon="text"
            label="Text"
            name="text"
            onChoose={choose}
          />
          <ContentChoserItem
            icon="image"
            label="Image"
            name="image"
            onChoose={choose}
          />
          <ContentChoserItem
            icon="audio"
            label="Audio"
            name="audio"
            onChoose={choose}
          />
          <ContentChoserItem
            icon="video"
            label="Video"
            name="video"
            onChoose={choose}
          />
          <ContentChoserItem
            icon="document"
            label="Document"
            name="document"
            onChoose={choose}
          />
          <ContentChoserItem
            icon="3d"
            label="Modele 3d"
            name="3d"
            onChoose={choose}
          />
        </ContentChoserContent>
      </div>
    </article>
  );
}
