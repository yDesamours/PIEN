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

export default function Classe() {
  const { cours: coursPromise, classe } = useLoaderData();

  return (
    <>
      <Loader promise={classe}>
        <ClasseDescription />
      </Loader>

      <Tab value="cours">
        <TabList>
          <TabItem value="cours">Cours</TabItem>
          <TabItem value="eleves">Eleves</TabItem>
          <TabItem value="evaluations">Evaluations</TabItem>
          <TabItem value="materiels">Materiels</TabItem>
        </TabList>

        <TabBody>
          <TabContent value="cours">
            <Loader promise={coursPromise}>
              <Cours />
            </Loader>
          </TabContent>
        </TabBody>
      </Tab>
    </>
  );
}
