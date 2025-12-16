import React from "react";
import { NavLink } from "react-router-dom";

const IconUser = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const IconMail = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const IconPlus = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const mockStudents = [
  {
    name: "Sonia Jean",
    email: "sonia.jean@edu.ht",
    classes: ["Ligne de transmission", "Antenne"],
    average: 16.5,
    lastActivity: "1 heure",
    status: "Actif",
  },
  {
    name: "Ricardo Estimé",
    email: "ricardo.e@edu.ht",
    classes: ["Téléphonie Mobile"],
    average: 12.0,
    lastActivity: "4 heures",
    status: "Actif",
  },
  {
    name: "Fabienne Cadet",
    email: "fabienne.c@edu.ht",
    classes: ["Circuit Numérique 1"],
    average: 9.2,
    lastActivity: "2 jours",
    status: "Inactif",
  },
  {
    name: "Luckner Pierre",
    email: "luckner.p@edu.ht",
    classes: ["Ligne de transmission"],
    average: 14.8,
    lastActivity: "8 heures",
    status: "Actif",
  },
  {
    name: "Naomie Louis",
    email: "naomie.l@edu.ht",
    classes: ["Circuit Numérique 1", "Téléphonie Mobile"],
    average: 18.0,
    lastActivity: "30 minutes",
    status: "Actif",
  },
];

const MesElevesPanel = ({ onStudentProfileView }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Actif":
        return (
          <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
            Actif
          </span>
        );
      case "Inactif":
        return (
          <span className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
            Inactif
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">
            En attente
          </span>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header style matching the overall app design */}
      <div className="bg-primary p-6 shadow-md">
        <h1 className="text-2xl font-bold text-white">Mes Élèves</h1>
        <p className="text-sm text-blue-100">
          Liste complète de tous les élèves assignés à vos cours.
        </p>
      </div>

      <div className="bg-white p-6 shadow-md mb-6 border-b border-gray-200">
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Rechercher par Nom"
            className="p-3 border border-gray-300 rounded-lg flex-1 focus:ring-blue-500 focus:border-blue-500"
          />
          <select className="p-3 border border-gray-300 rounded-lg w-1/4 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Filtrer par Classe</option>
            <option value="LDT">Ligne de transmission</option>
            <option value="TMO">Téléphonie Mobile</option>
            <option value="CN1">Circuit Numérique 1</option>
          </select>
          <select className="p-3 border border-gray-300 rounded-lg w-1/4 focus:ring-blue-500 focus:border-blue-500">
            <option value="">Filtrer par Statut</option>
            <option value="Actif">Actif</option>
            <option value="Inactif">Inactif</option>
          </select>
        </div>
        <div className="flex justify-end items-center">
          <button className="text-sm text-gray-500 hover:text-blue-600 transition-colors">
            Effacer les filtres
          </button>
        </div>
      </div>

      <div className=" bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nom de l'élève
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Classe(s) associée(s)
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Statut
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dernière Activité
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockStudents.map((student, index) => (
                <tr
                  key={index}
                  className="hover:bg-blue-50/50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                          {student.name.charAt(0)}
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {student.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {student.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {student.classes.join(", ")}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {getStatusBadge(student.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.lastActivity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      <NavLink
                        to="12"
                        className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                        title="Voir Profil"
                      >
                        <IconUser />
                      </NavLink>
                      <button
                        className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                        title="Contacter par Email"
                      >
                        <IconMail />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MesElevesPanel;
