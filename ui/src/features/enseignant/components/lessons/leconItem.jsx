import { useNavigate } from "react-router-dom";
import Button from "../../../../components/button/button";
import Card from "../../../../components/card/card";
import CardBody from "../../../../components/card/cardBody";

export default function LeconItem({ lecon }) {
  const navigate = useNavigate();

  return (
    <Card>
      <h3>{lecon.title}</h3>
      <CardBody>
        <p>{lecon.description}</p>
      </CardBody>
      <Button
        onClick={() => navigate(`${classe.id}/cours`)}
        outline
        className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer"
      >
        View
      </Button>
    </Card>
  );
}
