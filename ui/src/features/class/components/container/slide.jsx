import { useState } from "react";
import Box from "./box";
import { BoxArgument } from "../utils/utils";
import useSlide from "../../hooks/slide";

export default function Slide({ id }) {
  const {
    addBox,
    deleteBox,
    handleSlideSave,
    slideContent,
    dispatchSaveSlide,
  } = useSlide();

  return (
    <div>
      <button onClick={dispatchSaveSlide}>save</button>
      {slideContent.map((e) => (
        <Box
          component={e.component}
          data={e.data}
          key={e.id}
          addBox={addBox}
          deleteBox={deleteBox}
          handleSlideSave={handleSlideSave}
        />
      ))}
      ;
    </div>
  );
}
