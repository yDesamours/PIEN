import { useContext } from "react";
import { sideBarContext } from "./sidebar";
import Icon from "../icon/icon";

export default function SideBarTrigger({ portal }) {
  const { toggle } = useContext(sideBarContext);

  return (
    <div onClick={toggle} role="button" className=" flex mb-6 text-black">
      <Icon name="drawer" />
    </div>
  );
}
