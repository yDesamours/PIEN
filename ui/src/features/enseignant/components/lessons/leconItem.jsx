import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import CardBody from "../../../../components/card/cardBody";
import CardHeader from "../../../../components/card/cardHeader";
import CardFooter from "../../../../components/card/cardFooter";
import Icon from "../../../../components/icon/icon";

export default function LeconItem({ lecon }) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div className="flex flex-col items-start gap-1">
          <h3>{lecon.title}</h3>
          <p className="text-xs rounded-sm bg-green-300 shrink-2 px-1 italic">
            Publié
          </p>
        </div>
        <Icon
          name="option"
          role="button"
          className="text-right w-4 h-4 cursor-pointer"
        />
      </CardHeader>
      <CardBody>
        <p>{lecon.description}</p>
        <p className="text-xs  text-gray-600 flex justify-between gap-4 min-w-0 mb-3">
          <span className="flex items-center gap-1 whitespace-nowrap">
            <Icon name="clock" className="w-4 h-4" />
            Derniere modification
          </span>
          <span>{lecon.modification}</span>
        </p>
      </CardBody>
      <CardFooter>
        <Button
          onClick={() => navigate(`lecons/${lecon.id}/gerer?action=modifier`)}
          outline
          className="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Modifier
        </Button>
        <Button
          onClick={() => navigate(`lecons/${lecon.id}/gerer?action=voir`)}
          outline
          className="bg-gray-300 text-primary px-4 py-2 rounded-lg cursor-pointer"
        >
          Visualiser
        </Button>
      </CardFooter>
    </Card>
  );
}
