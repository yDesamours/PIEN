import {
  TabPane,
  TabPaneButton,
  TabPaneContent,
  TabPaneNav,
} from "../../../../../components/tabpane";
import BibliothequeGroup from "./bibliothequeGroup";

export default function Bibliotheque({ onChoose }) {
  return (
    <TabPane defaultValue="anatomie">
      <div className="flex h-[80vh] gap-3">
        <TabPaneNav className="flex-1 flex flex-col">
          <TabPaneButton
            value="anatomie"
            className="hover:translate-x-2 transition-all duration-300 h-10"
            selectedClassName="border-2"
          >
            Anatomie
          </TabPaneButton>
          <TabPaneButton
            value="physique"
            className="hover:translate-x-5 transition-all duration-300"
          >
            Physique
          </TabPaneButton>
          <TabPaneButton
            value="mecanique"
            className="hover:translate-x-5 transition-all duration-300"
          >
            Mecanique
          </TabPaneButton>
        </TabPaneNav>
        <div className="flex-3">
          <TabPaneContent value="anatomie">
            <BibliothequeGroup name="anatomie" onChoose={onChoose} />
          </TabPaneContent>
          <TabPaneContent value="physique">
            <BibliothequeGroup name="physique" onChoose={onChoose} />
          </TabPaneContent>
          <TabPaneContent value="mecanique">
            <BibliothequeGroup name="mecanique" onChoose={onChoose} />
          </TabPaneContent>
        </div>
      </div>
    </TabPane>
  );
}
