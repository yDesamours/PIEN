export default function QuestionLibre({ data, id, save }) {
  const onChange = (e) => {
    save({ content: e.target.value });
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
    </form>
  );
}
