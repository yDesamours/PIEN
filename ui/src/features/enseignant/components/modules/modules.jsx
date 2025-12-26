import EmptyState from "../../../../components/empty/empty";
import ModuleItem from "./moduleItem";

import Icon from "../../../../components/icon/icon";

export default function Modules({ data: modules, onNew, onSearch }) {
  return (
    <>
      <div className="bg-white rounded-lg shadow p-6 text-sm mb-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Modules</h2>
          <button
            onClick={onNew}
            className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-md hover:bg-blue-700 transition"
          >
            <Icon name="plus" className="w-4 h-4" />
            Ajouter un module
          </button>
        </div>

        <form className="w-full">
          <fieldset className="w-full border-1 p-1 border-gray-400 rounded-sm flex mb-2">
            <input
              onChange={(e) => onSearch(e.target)}
              name="search"
              className="h-8 border-none flex-1 outline-0 "
            />
            <button className="bg-primary rounded-sm w-8">🔎</button>
          </fieldset>
        </form>
      </div>
      {modules.length > 0 ? (
        <ul className="flex w-full flex-wrap gap-4">
          {modules.map((module) => (
            <ModuleItem {...module} key={module.id} />
          ))}
        </ul>
      ) : (
        <div className="w-full flex justify-center items-center">
          <EmptyState />
        </div>
      )}
    </>
  );
}
