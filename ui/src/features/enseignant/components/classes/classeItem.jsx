import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import CardBody from "../../../../components/card/cardBody";
import Icon from "../../../../components/icon/icon";
import CardFooter from "../../../../components/card/cardFooter";
import CardHeader from "../../../../components/card/cardHeader";

export default function ClasseItem({ classe }) {
  const navigate = useNavigate();

  return (
    <Card key={classe.id}>
      <CardHeader className="flex justify-between">
        <div className="flex justify-between flex-col">
          <h3 className="text-lg font-bold text-black text-left">
            {classe.nom}
          </h3>
          <p className="text-sm  text-gray-600 text-left">{classe.matiere}</p>
          <p className="text-sm  text-gray-600 text-left">{classe.niveau}</p>
        </div>
        <Icon
          name="option"
          role="button"
          className="text-right w-4 h-4 cursor-pointer"
        />
      </CardHeader>

      <CardBody>
        <p className="text-xs  text-gray-600 flex justify-between">
          <span className="flex items-center gap-1">
            <Icon name="eleve" className="w-4 h-4" /> Eleve
          </span>
          {classe.nombreEleves}
        </p>
        <p className="text-xs  text-gray-600 flex justify-between">
          <span className="flex items-center gap-1">
            <Icon name="module" className="w-4 h-4" /> Module
          </span>
          {classe.nombreModules}
        </p>
        <p className="text-xs  text-gray-600 flex justify-between">
          <span className="flex items-center gap-1">
            <Icon name="clock" className="w-4 h-4" /> Derniere Activite
          </span>
          {classe.nombreModules}
        </p>
      </CardBody>

      <CardFooter className="flex-1">
        <Button
          onClick={() => navigate(`${classe.id}`)}
          className="flex-1 bg-primary text-white mx-0 "
        >
          Gerer Classe
        </Button>
      </CardFooter>
    </Card>
  );
}
