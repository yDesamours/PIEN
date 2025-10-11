import Icon from "../../../../../components/icon/icon";

export default function ContentChoserItem({ icon, label, name, onChoose }) {
  return (
    <li
      onDoubleClick={() => onChoose(name)}
      draggable="true"
      className="flex flex-col justify-around py-4 px-2 text-xs bg-background-2 text-center  items-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 hover:bg-gray-400 border border-gray-300 rounded-sm"
    >
      <Icon name={icon} className="w-8 h-8 m-0 " />
      <p>{label}</p>
    </li>
  );
}
