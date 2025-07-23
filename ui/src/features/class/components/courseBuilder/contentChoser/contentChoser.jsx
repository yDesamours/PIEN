import { useContext } from "react";
import { courseBuilderContext } from "../../../../../context/courseContext";

import Icon from "../../../../../components/icon/icon";
import ContentChoserItem from "./contentChoserItem";
import ContentChoserContent from "./contentChoserContent";
import ContentGroup from "../contentGroup/contentGroup";

export default function ContentChoser() {
  const { chooserOpened, closeChooser, add } = useContext(courseBuilderContext);

  const visible = chooserOpened ? "w-72" : "w-0";

  return (
    <section
      className={`${visible} bg-white transition-all duration-300 ease-in-out z-30 overflow-hidden`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between text-md text-black">
          <p>Choose</p>
          <Icon name="close" onClick={closeChooser} />
        </div>
        <ContentGroup summary="Ressource">
          <ContentChoserContent>
            <ContentChoserItem
              icon="text"
              label="Text"
              name="text"
              onChoose={add}
            />
            <ContentChoserItem
              icon="image"
              label="Image"
              name="image"
              onChoose={add}
            />
            <ContentChoserItem
              icon="audio"
              label="Audio"
              name="audio"
              onChoose={add}
            />
            <ContentChoserItem
              icon="video"
              label="Video"
              name="video"
              onChoose={add}
            />
            <ContentChoserItem
              icon="document"
              label="Document"
              name="document"
              onChoose={add}
            />
            <ContentChoserItem
              icon="3d"
              label="Modele 3d"
              name="3d"
              onChoose={add}
            />
            <ContentChoserItem
              icon="questionLibre"
              label="Question Libre"
              name="questionLibre"
              onChoose={add}
            />
            <ContentChoserItem
              icon="vraiFaux"
              label="Vrai ou faux"
              name="vraiFaux"
              onChoose={add}
            />
            <ContentChoserItem
              icon="questionMultiple"
              label="Question a choix multiple"
              name="questionMultiple"
              onChoose={add}
            />
          </ContentChoserContent>
        </ContentGroup>
        <ContentGroup summary="Organisateur">
          <ContentChoserContent>
            <ContentChoserItem
              icon="3d"
              label="Deux colonnes"
              name="twoColumns"
              onChoose={add}
            />
            <ContentChoserItem
              icon="3d"
              label="Trois colonnes"
              name="threeColumns"
              onChoose={add}
            />
          </ContentChoserContent>
        </ContentGroup>
      </div>
    </section>
  );
}
