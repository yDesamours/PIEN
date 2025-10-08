import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import CardBody from "../../../../components/card/cardBody";
import CardFooter from "../../../../components/card/cardFooter";
import Icon from "../../../../components/icon/icon";
import CardHeader from "../../../../components/card/cardHeader";

export default function ModuleItem({ nom, id, lecon, modification }) {
  const navigate = useNavigate();
  return (
    <Card key={id}>
      <CardHeader>
        <div className="flex justify-between">
          <h2>{nom}</h2>
          <Icon
            name="option"
            role="button"
            className="text-right w-4 h-4 cursor-pointer"
          />
        </div>
      </CardHeader>

      <CardBody>
        <p className="text-sm  text-gray-600 flex justify-between">
          <span className="flex items-center gap-1">
            <Icon name="lesson" className="w-4 h-4" /> Lecons
          </span>
          <span>{lecon}</span>
        </p>
      </CardBody>

      <CardFooter>
        <p className="text-xs  text-gray-600 flex justify-between gap-4 min-w-0">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Icon name="clock" className="w-4 h-4" />
            Derniere modification
          </span>
          <span>{modification}</span>
        </p>
      </CardFooter>
    </Card>
  );
}
