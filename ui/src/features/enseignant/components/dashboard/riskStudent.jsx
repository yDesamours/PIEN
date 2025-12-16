const IconAlert = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-red-500"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const StudentsAtRisk = () => {
  const students = [
    {
      name: "Thomas Dubreuil",
      class: "Ligne de Transmission",
      issue: "Moyenne < 8/20",
      urgent: true,
    },
    {
      name: "Sophie Martin",
      class: "Telephonie Mobile",
      issue: "Absence > 3 jours",
      urgent: false,
    },
    {
      name: "Lucas Bernard",
      class: "Reseaux IP",
      issue: "Devoirs non rendus",
      urgent: true,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full flex-1">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Élèves à Risque</h3>
        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">
          3 Alertes
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {students.map((student, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                {student.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">
                  {student.name}
                </p>
                <p className="text-xs text-gray-500">{student.class}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 justify-end">
                {student.urgent && <IconAlert />}
                <span
                  className={`text-xs font-medium ${
                    student.urgent ? "text-red-600" : "text-orange-500"
                  }`}
                >
                  {student.issue}
                </span>
              </div>
              <button className="text-xs text-blue-600 hover:underline mt-1">
                Contacter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsAtRisk;
