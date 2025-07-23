import { useContext } from "react";
import { courseBuilderContext } from "../../../../../context/courseContext";
import Icon from "../../../../../components/icon/icon";

export default function ContentChoserItem({ icon, label, name, onChoose }) {
  return (
    <li
      onDoubleClick={() => onChoose(name)}
      draggable="true"
      className="flex space-x-4 h-12 items-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 hover:bg-gray-400"
    >
      <Icon name={icon} className="w-10 h-10 " />
      <p>{label}</p>
    </li>
  );
}
