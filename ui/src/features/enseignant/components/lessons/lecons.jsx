import Icon from "../../../../components/icon/icon";
import LeconItem from "./leconItem";
import Modal from "../../../../components/modal/modal";
import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import LeconMetadataForm from "./leconMetadata";
import useStore from "../../../../store/store";
import EmptyState from "../../../../components/empty/empty";
import COURS from "../../../../services/api/cours";
import useApi from "../../../../hooks/api";
import { split } from "../../../../utils/utils";
import {
  Tab,
  TabBody,
  TabContent,
  TabItem,
  TabList,
} from "../../../../components/tab";

export default function Lecons() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lessons, setLessons] = useState([]);
  const [filteredLecons, setFilteredLecons] = useState([]);
  const { classeId, moduleId } = useParams();
  const { execute } = useApi();

  const published = filteredLecons.filter((l) => l.versionActiveId !== null);
  const notPublished = filteredLecons.filter((l) => l.versionActiveId === null);

  const loadLessons = async () => {
    const r = await execute(COURS.GET_MODULE_LECONS({ classeId, moduleId }));
    if (r.error) {
      return;
    }
    setLessons(r.data || []);
    setFilteredLecons(r.data || []);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmitLesson = async (data) => {
    const newLesson = { ...data };
    newLesson.objectifs = split(newLesson.objectifs);
    newLesson.prerequis = split(newLesson.prerequis);
    newLesson.competencesCiblees = split(newLesson.competencesCiblees);

    const r = await execute(
      COURS.CREATE_LESSON({ classeId, moduleId, data: newLesson })
    );

    setLessons((s) => [...s, { ...r.data }]);
  };

  /**
   *
   * @param {HTMLInputElement} e
   */
  const onSearch = (e) => {
    const inputValue = e.value.trim().toLowerCase();
    setFilteredLecons(() =>
      lessons.filter((l) => {
        const lowerCaseName = l.titre.toLowerCase();
        return (
          lowerCaseName.startsWith(inputValue) ||
          lowerCaseName.split(" ").some((part) => part.startsWith(inputValue))
        );
      })
    );
  };

  useEffect(() => {
    loadLessons();
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 text-sm mb-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Module Lessons</h2>
          <button
            onClick={openModal}
            className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            <Icon name="plus" className="w-4 h-4" />
            Ajouter une lecon
          </button>
        </div>

        <fieldset className="w-full border-1 p-1 border-gray-400 rounded-sm flex mb-2">
          <input
            onChange={(e) => {
              onSearch(e.target);
            }}
            name="search"
            className="h-8 border-none outline-0 flex-1 "
          />
          <button className="bg-primary rounded-sm w-8">🔎</button>
        </fieldset>
      </div>
      <Tab value="public">
        <div
          role="nav"
          className="py-3 px-5 pb-0 mt-6 bg-white mb-4 flex rounded-xl text-xs"
        >
          <TabList>
            <TabItem value="public">Publié</TabItem>
            <TabItem value="prive">Non Publié</TabItem>
          </TabList>
        </div>
        <TabBody>
          <TabContent value="public">
            {published.length > 0 ? (
              <ul className="flex gap-2">
                {published.map((lecon) => (
                  <LeconItem lecon={lecon} key={lecon.id} />
                ))}
              </ul>
            ) : (
              <div className="w-full flex justify-center items-center">
                <EmptyState />
              </div>
            )}
          </TabContent>
          <TabContent value="prive">
            {notPublished.length > 0 ? (
              <ul className="flex gap-2">
                {notPublished.map((lecon) => (
                  <LeconItem lecon={lecon} key={lecon.id} />
                ))}
              </ul>
            ) : (
              <div className="w-full flex justify-center items-center">
                <EmptyState />
              </div>
            )}
          </TabContent>
        </TabBody>
      </Tab>

      <Modal isOpen={isModalOpen} title="Nouveau Lecon" onClose={closeModal}>
        <LeconMetadataForm onSubmit={onSubmitLesson} />
      </Modal>
    </>
  );
}
