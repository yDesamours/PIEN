import React from "react";
import AccordionItem from "./accordionItem";

const Accordion = ({ children }) => {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-lg  bg-white">
      {children}
    </div>
  );
};

export default Accordion;
