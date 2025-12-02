import StudentActivityRow from "./studentActivityRow";

const studentData = [
  {
    name: "Emma Wilson",
    email: "emma.wilson@email.com",
    avatarSrc: "/path/to/emma-avatar.jpg", // Remplacer par le chemin réel
    classe: "Ligne de Transmission",
    activity: "Submitted Assignment #3",
    lastActive: "2 hours ago",
  },
  {
    name: "James Rodriguez",
    email: "james.rodriguez@email.com",
    avatarSrc: "/path/to/james-avatar.jpg", // Remplacer par le chemin réel
    classe: "Ligne de Transmission",
    activity: "Completed Quiz #2",
    lastActive: "4 hours ago",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatarSrc: "/path/to/sarah-avatar.jpg", // Remplacer par le chemin réel
    classe: "Ligne de Transmission",
    activity: "Watched Lecture Video",
    lastActive: "6 hours ago",
  },
  {
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    avatarSrc: "/path/to/alex-avatar.jpg", // Remplacer par le chemin réel
    classe: "Telephonie Mobile",
    activity: "Posted in Discussion",
    lastActive: "8 hours ago",
  },
];

export default function RecentStudentActivity() {
  return (
    <section className="bg-white p-6 shadow-lg rounded-lg  shrink-1">
      {/* En-tête du panneau */}
      <article className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Activites Recentes
        </h2>
        <div className="flex space-x-4 items-center">
          <button className="text-primary cursor-pointer text-sm font-medium">
            Voir les statistiques
          </button>
        </div>
      </article>

      {/* Tableau d'activité */}
      <article className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Eleve
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Activite
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Derniere activite
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {studentData.map((student, index) => (
              <StudentActivityRow key={index} {...student} />
            ))}
          </tbody>
        </table>
      </article>
    </section>
  );
}
