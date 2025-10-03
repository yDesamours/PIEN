import LeconItem from "./leconItem";

export default function Lecons({ data = [] }) {
  return (
    <ul className="flex gap-2">
      {data.map((lecon) => (
        <LeconItem lecon={lecon} key={lecon.id} />
      ))}
    </ul>
  );
}
