import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import CardBody from "../../../../components/card/cardBody";
import Icon from "../../../../components/icon/icon";

export default function ClasseItem({ classe }) {
  const navigate = useNavigate();

  return (
    <Card key={classe.id}>
      <h3 className="text-lg font-bold text-black text-left">{classe.nom}</h3>
      <p className="text-sm  text-gray-600 text-left">{classe.matiere}</p>
      <p className="text-sm  text-gray-600 text-left">{classe.niveau}</p>

      <CardBody>
        <p className="text-sm  text-gray-600 text-left">
          {classe.nombreEleves} eleve(s)
        </p>
        <p className="text-sm  text-gray-600 text-left">
          {classe.nombreModules} module(s)
        </p>
      </CardBody>

      <Button onClick={() => navigate(`${classe.id}/cours`)} outline>
        Voir les cours
      </Button>
      <Button onClick={() => navigate(`${classe.id} `)}>
        <Icon name="right-arrow" />
      </Button>
    </Card>
  );
}
