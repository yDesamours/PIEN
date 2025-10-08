export default function ClasseDescription({ data }) {
  return (
    <section className="py-6 px-4 bg-primary text-white">
      <h3 className="font-bold text-2xl">{data.nom}</h3>
      <p>
        {data.matiere}-{data.niveau}
      </p>
    </section>
  );
}
