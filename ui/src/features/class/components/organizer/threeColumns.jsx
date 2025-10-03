import { useContext } from "react";
import { courseBuilderContext } from "../../../../context/courseContext";

const defaultData = {
  first: { component: "resourceChoser" },
  second: { component: "resourceChoser" },
  third: { component: "resourceChoser" },
};

export default function ThreeColumns({ data = defaultData, save = () => {} }) {
  const { first, second, third } = data;
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

  const saveThird = (content) => {
    const update = getData(id);
    update.third = { ...data.third, data: content };
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
      <div className="flex-1">
        <InlineBox
          component={third.component}
          data={third.data}
          onChoose={onChoose}
          save={saveThird}
          index="third"
        />
      </div>
    </div>
  );
}
