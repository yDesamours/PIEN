import { useContext } from "react";
import { courseBuilderContext } from "../../../../context/courseContext";
import {
  Dropdown,
  DropdownContainer,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from "../../../../components/dropdown/index";

export default function CourseDescription() {
  const { descriptionOpen, closeDescription, description, setDescription } =
    useContext(courseBuilderContext);

  const visible = descriptionOpen ? "w-150" : "w-0";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDescription({ [name]: value });
  };

  return (
    <section
      className={`${visible} bg-white shadow-lg font-sans flex flex-col transition-all duration-300 ease-in-out z-30 overflow-hidden absolute left-0 h-full py-8 `}
    >
      <div className="flex justify-end items-center pr-8">
        <button
          onClick={closeDescription}
          className="text-red-600 cursor-pointer"
        >
          X
        </button>
      </div>
      <form className="flex flex-col flex-1 gap-8 px-8">
        <label>
          <span className="text-xl font-bold">Titre</span>
          <input
            type="text"
            name="title"
            value={description.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-1 bg-transparent border-b-2  border-b-gray-900  focus:border-b-blue-900 focus:border-b-4 outline-none"
          />
        </label>
        <label>
          <span className="text-xl font-bold">Description</span>
          <textarea
            name="description"
            value={description.description}
            onChange={handleChange}
            className="mt-1 resize-none block w-full px-3 py-1 bg-transparent border-b-2  border-b-gray-900  focus:border-b-blue-900 focus:border-b-4 outline-none"
          />
        </label>
        <label>
          <span className="text-xl font-bold">Objectif</span>
          <textarea
            name="objectif"
            value={description.objectif}
            onChange={handleChange}
            className="mt-1 resize-none block w-full px-3 py-1 bg-transparent border-b-2  border-b-gray-900  focus:border-b-blue-900 focus:border-b-4 outline-none"
          />
        </label>
      </form>

      <div className="w-full px-4 ">
        <div className="w-full flex items-center  bg-amber-500 h-10 text-lg font-bold ">
          <button className="flex-1 cursor-pointer h-full hover:bg-amber-700 transition-all duration-300">
            Sauvegarder
          </button>
          <Dropdown className="h-full">
            <DropdownTrigger className="h-full border-none bg-transparent  hover:bg-amber-700 transition-all duration-300" />
            <DropdownContainer>
              <DropdownContent>
                <DropdownItem>Sauvegarder et publier</DropdownItem>
                <DropdownItem>
                  Sauvegarder comme une nouvelle version
                </DropdownItem>
              </DropdownContent>
            </DropdownContainer>
          </Dropdown>
        </div>
      </div>
    </section>
  );
}
