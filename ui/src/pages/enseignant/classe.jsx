import { useLoaderData, useParams } from "react-router-dom";
import Cours from "../../features/class/components/cours/cours";
import {
  Tab,
  TabBody,
  TabContent,
  TabItem,
  TabList,
} from "../../components/tab/index";
import Loader from "../../components/loader/loader";
import ClasseDescription from "./classeDescription";
import Module from "./module";

export default function Classe() {
  const { cours: coursPromise, classe } = useLoaderData();

  return (
    <>
      <Loader promise={classe}>
        <ClasseDescription />
      </Loader>

      <Tab value="modules">
        <section className="py-3 px-5 pb-0 mt-6 bg-white mb-4 flex rounded-xl text-xs">
          <TabList>
            <TabItem value="modules" icon="module">
              Modules
            </TabItem>
            <TabItem value="eleves" icon="eleve">
              Eleves
            </TabItem>
            <TabItem value="evaluations" icon="evaluation">
              Evaluations
            </TabItem>
            <TabItem value="calendrier" icon="calendrier">
              Calendrier
            </TabItem>
            <TabItem value="annonce" icon="speaker">
              Annonce
            </TabItem>
            <TabItem value="materiels" icon="file">
              Ressources
            </TabItem>
          </TabList>
        </section>
        <TabBody>
          <TabContent value="modules">
            <Loader promise={coursPromise}>
              <Module />
            </Loader>
          </TabContent>
        </TabBody>
      </Tab>
    </>
  );
}
