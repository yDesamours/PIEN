import React from "react";

const IconFileCheck = () => (
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
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <path d="m9 15 2 2 4-4"></path>
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

const IconDownload = () => (
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
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

const IconEdit = () => (
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
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);

const mockAssignments = [
  {
    name: "Devoir #3: Ondes et Spectres",
    module: "Module 3",
    status: "Corrigé",
    date: "02 Déc 2025",
    score: 14,
    total: 20,
  },
  {
    name: "Quiz Module 2: Lignes de Trans.",
    module: "Module 2",
    status: "Terminé",
    date: "29 Nov 2025",
    score: 8,
    total: 10,
  },
  {
    name: "Devoir #2: Circuits de Base",
    module: "Module 2",
    status: "Non Soumis",
    date: "20 Nov 2025",
    score: null,
    total: 20,
  },
  {
    name: "Devoir #1: Introduction",
    module: "Module 1",
    status: "Corrigé",
    date: "10 Nov 2025",
    score: 18,
    total: 20,
  },
];

const StudentWork = ({ studentName = "Lami Pierre" }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "Corrigé":
        return (
          <span className="px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-100 rounded-full">
            Corrigé
          </span>
        );
      case "Terminé":
        return (
          <span className="px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-100 rounded-full">
            Terminé
          </span>
        );
      case "Non Soumis":
        return (
          <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">
            Manquant
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">
            En attente
          </span>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-4">
      <h3 className="text-xl font-bold text-gray-800 border-b pb-2 mb-4">
        Espace de Travail : Devoirs et Évaluations ({studentName})
      </h3>

      <div className="mb-8 p-4 bg-gray-50 border-blue-500 rounded-xl flex justify-between items-center shadow-sm">
        <div className="flex items-center space-x-3">
          <IconPlus className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-md font-semibold text-gray-800">
              Assigner un Devoir Spécifique
            </p>
            <p className="text-sm text-gray-500">
              Créer ou assigner un travail ciblé uniquement à cet élève.
            </p>
          </div>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center transition-colors">
          <IconPlus className="w-5 h-5 mr-2" />
          Assigner un nouveau travail
        </button>
      </div>

      <div className="flex justify-between items-center mb-2">
        <h4 className="text-lg font-bold text-gray-700">
          Historique des Soumissions et Corrections
        </h4>
        <button className="text-primary underline text-xs">Voir Plus</button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Devoir / Évaluation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Module
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Statut
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Résultat
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockAssignments.map((assignment, index) => (
              <tr key={index} className="hover:bg-blue-50/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center space-x-2">
                  <IconFileCheck className="text-gray-400" />
                  <span>{assignment.name}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {assignment.module}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center">
                  {getStatusBadge(assignment.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  {assignment.score !== null ? (
                    <span
                      className={`font-bold ${
                        assignment.score / assignment.total < 0.5
                          ? "text-red-500"
                          : "text-emerald-600"
                      }`}
                    >
                      {assignment.score} / {assignment.total}
                    </span>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <div className="flex justify-center space-x-3">
                    <button
                      title="Télécharger la soumission"
                      className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                      disabled={assignment.status === "Non Soumis"}
                    >
                      <IconDownload />
                    </button>
                    <button
                      title="Modifier la note ou le feedback"
                      className="text-gray-400 hover:text-blue-600 p-1 rounded-full hover:bg-gray-200 transition-colors"
                      disabled={assignment.status !== "Corrigé"}
                    >
                      <IconEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentWork;
