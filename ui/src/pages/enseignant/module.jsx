import { useLoaderData, useParams } from "react-router-dom";
import Modules from "../../features/enseignant/components/modules/modules";
import { Suspense } from "react";
import Loader from "../../components/loader/loader";
import Icon from "../../components/icon/icon";

export default function Module() {
  const params = useParams();
  const { modules } = useLoaderData();

  return (
    <div>
      <div className="bg-white rounded-lg shadow p-6 text-sm mb-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Module Lessons</h2>
          <button className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition">
            <Icon name="plus" className="w-4 h-4" />
            Ajouter un module
          </button>
        </div>

        {/* Search bar */}
        <fieldset className="w-full border-1 p-1 border-gray-400 rounded-sm flex mb-2">
          <input name="search" className="h-8 border-none flex-1 " />
          <button className="bg-primary rounded-sm w-8">🔎</button>
        </fieldset>
      </div>
      <Loader promise={modules}>
        <Modules />
      </Loader>
    </div>
  );
}
