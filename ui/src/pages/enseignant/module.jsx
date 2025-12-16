import { useLoaderData, useParams } from "react-router-dom";
import Modules from "../../features/enseignant/components/modules/modules";
import { Suspense, useState } from "react";
import Loader from "../../components/loader/loader";
import Icon from "../../components/icon/icon";
import Modal from "../../components/modal/modal";
import ModuleMetadataForm from "../../features/enseignant/components/modules/moduleMetadata";

export default function Module() {
  const { modules } = useLoaderData();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 text-sm mb-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Modules</h2>
          <button
            onClick={openModal}
            className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            <Icon name="plus" className="w-4 h-4" />
            Ajouter un module
          </button>
        </div>

        <fieldset className="w-full border-1 p-1 border-gray-400 rounded-sm flex mb-2">
          <input name="search" className="h-8 border-none flex-1 " />
          <button className="bg-primary rounded-sm w-8">🔎</button>
        </fieldset>
      </div>
      <Loader promise={modules}>
        <Modules />
      </Loader>

      <Modal
        title="Ajouter un module"
        isOpen={isModalOpen}
        onClose={closeModal}
      >
        <ModuleMetadataForm />
      </Modal>
    </>
  );
}
