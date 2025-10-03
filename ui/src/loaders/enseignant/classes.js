import { sendRequest } from "../../hooks/api";
import CLASSE from "../../services/api/classe";
import { storage } from "../../utils/utils";
import { defer } from "react-router-dom";

const classes = [
  {
    nom: "Analyse MPC1",
    matiere: "Analyse",
    niveau: "MPC1",
    nombreCours: 2,
    nombreEleve: 23,
    id: 1,
  },
  {
    nom: "Geometrie MPC1",
    matiere: "Geometrie",
    niveau: "MPC1",
    nombreCours: 2,
    nombreEleve: 23,
    id: 2,
  },
  {
    nom: "Chimie MPC2",
    matiere: "Chimie",
    niveau: "MPC2",
    nombreCours: 2,
    nombreEleve: 23,
    id: 3,
  },
];

export default async function (params) {
  const user = storage.getUser();
  console.log({ user });

  return defer({
    classes: new Promise(async (resolve, reject) => {
      const data = await sendRequest(CLASSE.ENSEIGNANT(user.id));
      console.log(data);
      resolve(data.body);
    }),
  });
}
