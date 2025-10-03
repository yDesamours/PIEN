import { useContext } from "react";
import InlineBox from "../container/inlineBox";
import { courseBuilderContext } from "../../../../context/courseContext";

export default function TwoColumns({ data, save = () => {}, id }) {
  const { first, second } = data;
  const { getData } = useContext(courseBuilderContext);

  const saveFirst = (content) => {
    const update = { ...data.first, data: content };
    save(update);
  };

  const saveSecond = (content) => {
    const update = getData(id);
    update.second = { ...data.second, data: content };
    save(update);
  };

  const onChoose = (index, component) => {
    const update = getData(id);
    update[index] = { ...data[index], component };
    save(update);
  };

  return (
    <div className="flex flex-row ">
      <div className="flex-1">
        <InlineBox
          component={first.component}
          data={first.data}
          onChoose={onChoose}
          save={saveFirst}
          index="first"
        />
      </div>
      <div className="flex-1">
        <InlineBox
          component={second.component}
          data={second.data}
          onChoose={onChoose}
          save={saveSecond}
          index="second"
        />
      </div>
    </div>
  );
}
