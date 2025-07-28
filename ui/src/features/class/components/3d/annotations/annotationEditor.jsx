import React, { useState } from "react";

import Trash from "../../../../../assets/icons/trash.svg?react";
import Pen from "../../../../../assets/icons/pen.svg?react";
import Disk from "../../../../../assets/icons/disk.svg?react";

export default function AnnotationEditor({
  title,
  description,
  deleteAnnotation,
  id,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen((prev) => !prev);
  };

  const [editor, setEditor] = useState({
    isEditing: false,
    title,
    description,
  });

  const onBeginEdit = () => {
    setEditor((prev) => ({
      ...prev,
      isEditing: true,
    }));

    setIsOpen(true);
  };

  const onEditing = (event) => {
    const { name, value } = event.target;
    setEditor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onEdit = () => {
    setEditor((prev) => ({
      ...prev,
      isEditing: false,
    }));
  };

  return (
    <div className="border-b border-gray-200 w-full mb-3 ">
      <div className="flex gap-1">
        {editor.isEditing ? (
          <form className="flex flex-2 justify-between items-center w-full py-2 px-1 text-lg font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300">
            <input name="title" value={editor.title} onChange={onEditing} />
          </form>
        ) : (
          <button
            className="flex flex-2 justify-between items-center w-full py-2 px-1 text-lg font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            onClick={toggleAccordion}
            aria-expanded={isOpen}
          >
            <span>{editor.title}</span>

            <svg
              className={`w-3 h-3 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>
        )}
        <div className="flex justify-center items-center">
          <Trash
            role="button"
            className="w-4 m-2 cursor-pointer "
            onClick={() => deleteAnnotation(id)}
          />
          {editor.isEditing ? (
            <Disk
              role="button"
              className="w-4 m-2 cursor-pointer "
              onClick={onEdit}
            />
          ) : (
            <Pen
              role="button"
              className="w-4 m-2 cursor-pointer "
              onClick={onBeginEdit}
            />
          )}
        </div>
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-4 px-5 text-gray-700 bg-gray-50">
          {editor.isEditing ? (
            <form>
              <textarea
                name="description"
                value={editor.description}
                onChange={onEditing}
                className="resize-none w-full"
              />
            </form>
          ) : (
            <p>{editor.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
