import { useLoaderData } from "react-router-dom";
import Lecons from "../../features/enseignant/components/lessons/lecons";
import Loader from "../../components/loader/loader";
import {
  Tab,
  TabBody,
  TabContent,
  TabItem,
  TabList,
} from "../../components/tab";

function ModuleDescription({ data: { titre, description } }) {
  return (
    <>
      <h3 className="font-bold text-2xl">{titre}</h3>
      <p>{description}</p>
    </>
  );
}

export default function EnseignantLecons() {
  const { lecons, module } = useLoaderData();

  return (
    <div>
      <section className="py-6 px-4 bg-primary text-white">
        <Loader promise={module}>
          <ModuleDescription />
        </Loader>
      </section>

      <Tab value="modules">
        <section className="py-3 px-5 pb-0 mt-6 bg-white mb-4 flex rounded-xl text-xs">
          <TabList>
            <TabItem value="lecons" icon="lesson">
              Lecons
            </TabItem>
            <TabItem value="quiz" icon="quiz">
              Quiz
            </TabItem>
            <TabItem value="commentaires" icon="conversation">
              Commentaires
            </TabItem>
          </TabList>
        </section>

        <TabBody>
          <TabContent value="modules">
            <Loader promise={lecons}>
              <Lecons />
            </Loader>
          </TabContent>
        </TabBody>
      </Tab>
    </div>
  );
}
