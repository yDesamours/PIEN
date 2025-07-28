import React, { useState } from "react";

const AccordionItem = ({ title, children, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-gray-200 w-full mb-3 ">
      <div className="flex gap-1">
        <button
          className="flex flex-2 justify-between items-center w-full py-2 px-1 text-lg font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
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
        {options}
      </div>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-4 px-5 text-gray-700 bg-gray-50">{children}</div>
      </div>
    </div>
  );
};

export default AccordionItem;
