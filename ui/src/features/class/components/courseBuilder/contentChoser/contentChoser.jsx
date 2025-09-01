import { useContext } from "react";
import { courseBuilderContext } from "../../../../../context/courseContext";

import Icon from "../../../../../components/icon/icon";
import ContentChoserItem from "./contentChoserItem";
import ContentChoserContent from "./contentChoserContent";
import ContentGroup from "../contentGroup/contentGroup";

export default function ContentChoser() {
  const { chooserOpened, closeChooser, add } = useContext(courseBuilderContext);

  const visible = chooserOpened ? "w-100 p-4" : "w-0";

  return (
    <section
      className={`${visible} bg-background-2  rounded-l-2xl shadow-lg font-sans transition-all duration-300 ease-in-out z-30 overflow-hidden absolute right-0 h-full my-8 `}
    >
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-md text-black">
          <p className="font-semibold text-gray-800">Contenu</p>
          <Icon name="close" onClick={closeChooser} />
        </div>
        <ContentGroup summary="Text">
          <ContentChoserContent>
            <ContentChoserItem
              icon="text"
              label="Text"
              name="text"
              onChoose={add}
            />
            <ContentChoserItem
              icon="title"
              label="Titre"
              name="titre"
              onChoose={add}
            />
            <ContentChoserItem
              icon="quote"
              label="Citation"
              name="quote"
              onChoose={add}
            />
            <ContentChoserItem
              icon="formula"
              label="Formule"
              name="formula"
              onChoose={add}
            />
            <ContentChoserItem
              icon="code"
              label="Bloc de Code"
              name="code"
              onChoose={add}
            />
          </ContentChoserContent>
        </ContentGroup>

        <ContentGroup summary="Multimedia">
          <ContentChoserContent>
            <ContentChoserItem
              icon="image"
              label="Image"
              name="image"
              onChoose={add}
            />
            <ContentChoserItem
              icon="gallery"
              label="Gallerie d'image"
              name="gallery"
              onChoose={add}
            />
            <ContentChoserItem
              icon="audio"
              label="Audio"
              name="audio"
              onChoose={add}
            />
            <ContentChoserItem
              icon="mic"
              label="Enregistreur"
              name="recorder"
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
          </ContentChoserContent>
        </ContentGroup>
        <ContentGroup summary="3D">
          <ContentChoserContent>
            <ContentChoserItem
              icon="3d"
              label="Modele 3d"
              name="3d"
              onChoose={add}
            />
          </ContentChoserContent>
        </ContentGroup>
        <ContentGroup summary="Diagram">
          <ContentChoserContent>
            <ContentChoserItem
              icon="venn"
              label="Diagramme de Venn"
              name="venn"
              onChoose={add}
            />
            <ContentChoserItem
              icon="histogram"
              label="Histogramme"
              name="histogram"
              onChoose={add}
            />
            <ContentChoserItem
              icon="bar"
              label="Diagramme en batons"
              name="barplot"
              onChoose={add}
            />
            <ContentChoserItem
              icon="line"
              label="Diagramme en ligne"
              name="lineplot"
              onChoose={add}
            />
            <ContentChoserItem
              icon="pie"
              label="Diagramme en gateau"
              name="piechart"
              onChoose={add}
            />
            <ContentChoserItem
              icon="target"
              label="Bullseye"
              name="bullseye"
              onChoose={add}
            />
          </ContentChoserContent>
        </ContentGroup>
        <ContentGroup summary="Embed">
          <ContentChoserContent>
            <ContentChoserItem
              icon="youtube"
              label="Youtube"
              name="youtube"
              onChoose={add}
            />
            <ContentChoserItem
              icon="drive"
              label="Google Drive"
              name="drive"
              onChoose={add}
            />
            <ContentChoserItem
              icon="website"
              label="Site Web"
              name="website"
              onChoose={add}
            />
            <ContentChoserItem
              icon="map"
              label="Google Maps"
              name="map"
              onChoose={add}
            />
          </ContentChoserContent>
        </ContentGroup>
        <ContentGroup summary="Evaluation">
          <ContentChoserContent>
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
            <ContentChoserItem
              icon="table"
              label="Tableau"
              name="table"
              onChoose={add}
            />
          </ContentChoserContent>
        </ContentGroup>
      </div>
    </section>
  );
}
