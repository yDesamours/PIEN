import LeconItem from "./leconItem";

export default function Lecons({ lecons = [] }) {
  return (
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] w-full gap-4">
      {lecons.map((lecon) => (
        <LeconItem lecon={lecon} key={lecon.id} />
      ))}
    </ul>
  );
}
