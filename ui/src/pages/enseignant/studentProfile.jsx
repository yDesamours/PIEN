import StudentWork from "../../features/enseignant/components/classes/studentwork";

const IconStar = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
  </svg>
);

const IconCheckList = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
  </svg>
);

const IconTime = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const IconUpload = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="17 8 12 3 7 8"></polyline>
    <line x1="12" y1="3" x2="12" y2="15"></line>
  </svg>
);

const IconUsers = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const mockStudentData = {
  id: 2,
  name: "Lami Pierre",
  email: "lami.pierre@email.com",
  class: "Analyse MPC1",
  overallAverage: 12.0,
  leconsTermine: "12/24",
  leconsNonConsulte: "6",
  recentActivities: [
    {
      date: "02 Déc",
      action: "Soumission Devoir #3",
      result: "14/20",
      type: "Evaluation",
    },
    {
      date: "29 Nov",
      action: "Complété Quiz Module 2",
      result: "Réussite",
      type: "Evaluation",
    },
    {
      date: "25 Nov",
      action: "Visionné vidéo 'Oscillations'",
      result: "Terminé",
      type: "Contenu",
    },
    {
      date: "20 Nov",
      action: "Discussion Forum : Réponse postée",
      result: "",
      type: "Interaction",
    },
  ],
  grades: [
    { evaluation: "Devoir #3", module: "Module 3", score: 14, total: 20 },
    { evaluation: "Quiz Module 2", module: "Module 2", score: 8, total: 10 },
    { evaluation: "Projet Initial", module: "Module 1", score: 10, total: 20 },
  ],
};

const StudentProfile = ({ student = mockStudentData, onBack }) => {
  const isPassing = student.overallAverage >= 10;

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full">
      <div className="flex items-center space-x-4 border-b pb-4 mb-6">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-sm text-gray-500">
            {student.class} - {student.email}
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg">
          Contacter l'élève
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold text-gray-700">
            Sommaire de Performance
          </h3>

          {/* <div
            className={`p-4 rounded-xl shadow-sm ${
              isPassing
                ? "bg-emerald-50 border-emerald-500"
                : "bg-red-50 border-red-500"
            }`}
          >
            <div className="flex items-center space-x-3">
              <IconStar
                className={`w-6 h-6 ${
                  isPassing ? "text-emerald-600" : "text-red-600"
                }`}
              />
              <div>
                <p className="text-sm text-gray-500">Note Générale</p>
                <p
                  className={`text-xl font-bold ${
                    isPassing ? "text-emerald-800" : "text-red-800"
                  }`}
                >
                  {student.overallAverage} / 20
                </p>
              </div>
            </div>
          </div> */}

          <div className="p-4 bg-blue-50 border-blue-500 rounded-xl shadow-sm">
            <div className="flex items-center space-x-3">
              <IconCheckList className="w-6 h-6 text-blue-600" />
              <div>
                <p className="text-sm text-gray-500">
                  Leçons marquées comme Terminée
                </p>
                <p className="text-xl font-bold text-blue-800">
                  {student.leconsTermine}
                </p>
              </div>
            </div>
          </div>

          {/* <div className="pt-4">
            <h4 className="text-md font-semibold text-gray-700 mb-2">
              Historique d'Activité
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              {student.recentActivities.slice(0, 3).map((activity, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-gray-50 p-2 rounded-lg"
                >
                  <span className="font-medium text-xs truncate">
                    {activity.action}
                  </span>
                  <span className="text-xs text-gray-400 ml-2 shrink-0">
                    {activity.date}
                  </span>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        <div className="lg:col-span-3 border px-4 py-4 rounded-sm border-gray-400">
          <div className="flex justify-between items-center pb-2 ">
            <h3 className="text-lg font-bold text-gray-700 ">
              Activités et Engagement
            </h3>
            <button className="text-primary underline text-sm">
              Voir Plus
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-purple-50 border-purple-500 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <IconTime className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-500">Temps passé (7j)</p>
                  <p className="text-xl font-bold text-purple-800">
                    {student.timeSpentLastWeek}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 border-orange-500 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <IconUsers className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-500">Connexions (7j)</p>
                  <p className="text-xl font-bold text-orange-800">
                    {student.loginsLast7Days}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-sky-50 border-sky-500 rounded-xl shadow-sm">
              <div className="flex items-center space-x-3">
                <IconUpload className="w-6 h-6 text-sky-600" />
                <div>
                  <p className="text-sm text-gray-500">Fichiers déposés</p>
                  <p className="text-xl font-bold text-sky-800">
                    {student.filesUploaded}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 col-span-3">
              <h4 className="text-lg font-semibold text-gray-700 mb-3">
                Historique d'Activité
              </h4>
              <ul className="space-y-3">
                {student.recentActivities.map((activity, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded ${
                          activity.type === "Evaluation"
                            ? "bg-red-100 text-red-600"
                            : activity.type === "Contenu"
                            ? "bg-blue-100 text-blue-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {activity.type}
                      </span>
                      <span className="text-sm font-medium text-gray-800">
                        {activity.action}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.date}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <StudentWork />
      </div>
    </div>
  );
};

export default StudentProfile;
