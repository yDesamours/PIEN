import { useContext } from "react";
import { courseBuilderContext } from "../../../../context/courseContext";
import Close from "../../../../assets/icons/close.svg?react";
import Text from "../../../../assets/icons/text.svg?react";
import Image from "../../../../assets/icons/image.svg?react";
import Video from "../../../../assets/icons/video.svg?react";
import Audio from "../../../../assets/icons/audio.svg?react";
import Element3d from "../../../../assets/icons/3d.svg?react";

export default function ContentChoser() {
  const { chooserOpened, closeChooser, add } = useContext(courseBuilderContext);

  const visible = chooserOpened ? "w-72" : "w-0";

  const listClassName =
    "flex space-x-4 h-12 items-center cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 hover:bg-gray-400";

  return (
    <div
      className={`${visible} bg-white transition-all duration-300 ease-in-out z-30 overflow-hidden`}
    >
      <div className="flex flex-col">
        <div className="flex justify-between text-md text-black">
          <p>Choose</p>
          <Close onClick={closeChooser} />
        </div>

        <div className=" text-black px-4">
          <div className={listClassName} onDoubleClick={() => add("text")}>
            <Text className="w-10 h-10 " />
            <p>Text</p>
          </div>

          <div className={listClassName} onDoubleClick={() => add("image")}>
            <Image className="w-10 h-10 " />
            <p>Image</p>
          </div>
          <div className={listClassName}>
            <Audio className="w-10 h-10 " />
            <p>Audio</p>
          </div>
          <div className={listClassName}>
            <Video className="w-10 h-10 " />
            <p>Image</p>
          </div>
          <div className={listClassName}>
            <Element3d className="w-10 h-10 " />
            <p>Modele 3d</p>
          </div>
        </div>
      </div>
    </div>
  );
}
