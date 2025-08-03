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
      <div className="flex h-[80vh] bg-gray-50 p-6 gap-8">
        <TabPaneNav className="flex-1 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Catégories
          </h2>

          <TabPaneButton
            value="anatomie"
            className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 text-sm font-medium text-gray-700 hover:translate-x-5 transition-all duration-300"
            selectedClassName="border-2"
          >
            Anatomie
          </TabPaneButton>
          <TabPaneButton
            value="physique"
            className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 text-sm font-medium text-gray-700 hover:translate-x-5 transition-all duration-300"
            selectedClassName="border-2"
          >
            Physique
          </TabPaneButton>
          <TabPaneButton
            value="mecanique"
            className="w-full text-left px-3 py-2 rounded-md hover:bg-blue-100 text-sm font-medium text-gray-700 hover:translate-x-5 transition-all duration-300"
            selectedClassName="border-2"
          >
            Mecanique
          </TabPaneButton>
        </TabPaneNav>
        <div className="flex-3">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Contenu</h2>

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
