import { defer } from "react-router-dom";

const cours = [
  {
    id: 1,
    title: "cours 1",
    image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date: "01/01/2021",
    classeId: 1,
  },

  {
    id: 2,
    title: "cours 2",
    image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date: "01/01/2021",
    classeId: 1,
  },

  {
    id: 3,
    title: "cours 3",
    image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date: "01/01/2021",
    classeId: 1,
  },
  {
    id: 4,
    title: "cours 4",
    image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date: "01/01/2021",
    classeId: 1,
  },
  {
    id: 5,
    title: "cours 5",
    image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date: "01/01/2021",
    classeId: 1,
  },
  {
    id: 6,
    title: "cours 6",
    image: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
    date: "01/01/2021",
    classeId: 2,
  },
];

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

export default function ClasseLoader({ params }) {
  const { classeId } = params;

  return defer({
    classe: new Promise((resolve) => {
      setTimeout(() => {
        resolve(classes.find((c) => c.id == classeId));
      }, 1000);
    }),
    cours: new Promise((resolve) => {
      setTimeout(() => {
        resolve(cours);
      }, 5000);
    }).then((cours) => cours.filter((cours) => (cours.classeId = classeId))),
  });
}
