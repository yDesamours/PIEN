export default function VraiFaux({ data, id, save }) {
  const onChangeText = (e) => {
    save({ content: e.target.value });
  };

  const onChangeValue = (e) => {
    save({ value: e.target.value });
  };

  return (
    <form className="w-full py-2  pl-4">
      <label htmlFor={`qestion-${id}`} className="sr-only">
        libelle question
      </label>
      <input
        id={`qestion-${id}`}
        name={`qestion-${id}`}
        className="border h-8 w-full"
        value={data.content}
        onChange={onChangeText}
      />

      <fieldset className="flex flex-col mt-2">
        <label>
          <span className="mr-2">Vrai</span>
          <input
            type="radio"
            name={`valeur-${id}`}
            value="vrai"
            checked={data.value === "vrai"}
            onChange={onChangeValue}
          />
        </label>

        <label>
          <span className="mr-2">Faux</span>
          <input
            type="radio"
            value="faux"
            name={`valeur-${id}`}
            checked={data.value === "faux"}
            onChange={onChangeValue}
          />
        </label>
      </fieldset>
    </form>
  );
}
