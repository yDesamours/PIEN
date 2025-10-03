import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import CardBody from "../../../../components/card/cardBody";
import Icon from "../../../../components/icon/icon";

export default function ModuleItem({ nom, id }) {
  const navigate = useNavigate();
  return (
    <Card key={id}>
      <CardBody>
        <p className="text-sm  text-gray-600 text-left">{nom}</p>
      </CardBody>

      <Button onClick={() => navigate(`modules/${id}/lecons`)} outline>
        Voir les lecons
      </Button>
    </Card>
  );
}
