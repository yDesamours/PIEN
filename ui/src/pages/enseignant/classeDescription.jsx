export default function ClasseDescription({ data }) {
  return (
    <article className="text-left">
      <h3 className="font-bold text-2xl">{data.nom}</h3>
      <p>
        {data.matiere}-{data.niveau}
      </p>
    </article>
  );
}
