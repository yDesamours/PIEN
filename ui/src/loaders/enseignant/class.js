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

const modules = [
  {
    id: 1,
    nom: "Module 1",
    lecon: 5,
    modification: "12-Jan-2025",
  },
  {
    id: 2,
    nom: "Module 2",
    lecon: 5,
    modification: "12-Jan-2025",
  },
  {
    id: 3,
    nom: "Module 3",
    lecon: 5,
    modification: "12-Jan-2025",
  },
  {
    id: 4,
    nom: "Module 4",
    lecon: 5,
    modification: "12-Jan-2025",
  },
  {
    id: 5,
    nom: "Module 5",
    lecon: 5,
    modification: "12-Jan-2025",
  },
];

export default function ({ params }) {
  const { classeId } = params;

  return defer({
    classe: new Promise((resolve) => {
      setTimeout(() => {
        resolve(classes.find((c) => c.id == classeId));
      }, 1000);
    }),
    modules: new Promise((resolve) => {
      setTimeout(() => {
        resolve(modules);
      }, 1000);
    }),
  });
}
