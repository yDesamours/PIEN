import Plus from "../../../../assets/icons/plus.svg?react";
import Trash from "../../../../assets/icons/trash.svg?react";
import { deepCopyJSON } from "../../../../utils/utils";

export default function QuestionMultiple({ data, id, save }) {
  const onChange = (e) => {
    save({ content: e.target.value });
  };

  const onChangeResponse = (e, element, propriete) => {
    const dataCopy = deepCopyJSON(data.reponses);
    const cible = dataCopy.find((v) => v.id === element.id);
    cible[propriete] = e.target[propriete];
    save({ reponses: dataCopy });
  };

  const onAddResponse = () => {
    const id = crypto.randomUUID();
    save({ reponses: [...data.reponses, { id }] });
  };

  const deleteResponse = (element) => {
    /**
     * @type {Array}
     */
    const dataCopy = deepCopyJSON(data.reponses);
    const cible = dataCopy.findIndex((v) => v.id === element.id);
    dataCopy.splice(cible, 1);
    save({ reponses: dataCopy });
  };

  return (
    <form className="w-full p-4 border">
      <label htmlFor={id} className="sr-only">
        <span>libelle question</span>
      </label>

      <fieldset className="mb-4">
        <input
          name={`question-${id}`}
          className="border border-gray-300 h-10 w-full px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={data.content}
          onChange={onChange}
        />
      </fieldset>

      {data.reponses &&
        data.reponses.map((q) => (
          <fieldset
            key={q.id}
            className="pt-4 border border-gray-300 rounded-lg p-4 mb-4 bg-white shadow-sm"
          >
            <input
              name={`reponse-${q.id}`}
              className="border border-gray-300 h-10 w-full px-3 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={q.value}
              onChange={(e) => onChangeResponse(e, q, "value")}
            />
            <label className="flex items-center gap-2 py-2 text-gray-700 cursor-pointer">
              <span>est correct?</span>
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                checked={q.checked}
                onChange={(e) => onChangeResponse(e, q, "checked")}
              />
            </label>
            <div className="flex justify-end">
              <Trash
                onClick={() => deleteResponse(q)}
                className="w-4 text-red-500 cursor-pointer"
              />
            </div>
          </fieldset>
        ))}

      <Plus onClick={onAddResponse} className="w-5 bg-blue-500 rounded-sm" />
    </form>
  );
}
