import { useLoaderData, useParams } from "react-router-dom";
import Modules from "../../features/enseignant/components/modules/modules";
import { Suspense, useEffect, useState } from "react";
import Loader from "../../components/loader/loader";
import Modal from "../../components/modal/modal";
import ModuleMetadataForm from "../../features/enseignant/components/modules/moduleMetadata";
import useApi from "../../hooks/api";
import COURS from "../../services/api/cours";

export default function Module() {
  const { classe } = useLoaderData();
  const [modules, setModules] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { execute } = useApi();
  const { classeId } = useParams();

  const load = async () => {
    const r = await execute(COURS.GET_MODULES(classeId));
    if (r.error) {
      return;
    }
    setModules(r.data);
    setFilteredModules(r.data);
  };

  /**
   *
   * @param {HTMLInputElement} e
   */
  const onSearchModule = (e) => {
    const inputValue = e.value.trim().toLowerCase();
    setFilteredModules(() =>
      modules.filter((module) => {
        const lowerCaseName = module.titre.toLowerCase();
        return (
          lowerCaseName.startsWith(inputValue) ||
          lowerCaseName.split(" ").some((part) => part.startsWith(inputValue))
        );
      })
    );
  };

  useEffect(() => {
    load();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const createModule = async (data) => {
    const r = await execute(COURS.CREATE_MODULE({ classeId, data: data }));
    setModules((s) => [...s, { ...r }]);
    closeModal();
  };

  return (
    <>
      <Loader promise={filteredModules}>
        <Modules onNew={openModal} onSearch={onSearchModule} />
      </Loader>

      <Modal
        title="Ajouter un module"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <Loader promise={classe}>
          <ModuleMetadataForm onSubmit={createModule} />
        </Loader>
      </Modal>
    </>
  );
}
