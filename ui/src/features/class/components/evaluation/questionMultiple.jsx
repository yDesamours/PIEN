import Plus from "../../../../assets/icons/plus.svg?react";

export default function QuestionMultiple({ data, id, save }) {
  const onChange = (e) => {
    save({ content: e.target.value });
  };

  const onChangeResponse = (e, element, propriete) => {
    const cible = data.reponses.find((v) => v.id === element.id);
    debugger;
  };

  const onAddResponse = (e) => {
    const id = crypto.randomUUID();
    save({ reponses: [...data.reponses, { id }] });
  };

  return (
    <form className="w-full py-4">
      <label htmlFor={id} className="sr-only">
        libelle question
      </label>

      <input
        id={id}
        name={`question-${id}`}
        className="border h-8 w-full"
        value={data.content}
        onChange={onChange}
      />

      {data.reponses &&
        data.reponses.map((q) => (
          <fieldset key={q.id}>
            <input
              name={`reponse-${q.id}`}
              className="border h-8 w-full"
              value={q.value}
              onChange={(e) => onChangeResponse(e, q, "value")}
            />
            <label>
              <span>est correct?</span>
              <input
                type="checkbox"
                checked={q.checked}
                onChange={(e) => onChangeResponse(e, q, "checked")}
              />
            </label>
          </fieldset>
        ))}

      <Plus onClick={onAddResponse} className="w-5" />
    </form>
  );
}
