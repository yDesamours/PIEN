import { useContext } from "react";
import { courseBuilderContext } from "../../../../../context/courseContext";
import Icon from "../../../../../components/icon/icon";

export default function ContentChoserItem({ icon, label, name, onChoose }) {
  return (
    <li
      onDoubleClick={() => onChoose(name)}
      draggable="true"
      className="flex flex-col justify-around py-4 bg-background-2  items-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 hover:bg-gray-400 border border-gray-300 rounded-2xl"
    >
      <Icon name={icon} className="w-15 h-15 m-0 " />
      <p>{label}</p>
    </li>
  );
}
