import ModuleItem from "./moduleItem";

export default function Modules({ data = [] }) {
  return (
    <ul className="flex w-full flex-wrap gap-4">
      {data.map((module) => (
        <ModuleItem {...module} key={module.id} />
      ))}
    </ul>
  );
}
