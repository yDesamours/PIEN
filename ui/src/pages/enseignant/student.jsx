import StudentsList from "../../features/enseignant/components/classes/studentList";
import Icon from "../../components/icon/icon";

const students = [
  {
    id: 1,
    name: "Johanne Clément",
    email: "johanne.clement@email.com",
    lastActivity: "1 heure",
    average: "16.5",
    status: "Actif",
  },
  {
    id: 2,
    name: "Lami Pierre",
    email: "lami.pierre@email.com",
    lastActivity: "4 heures",
    average: "12.0",
    status: "Actif",
  },
  {
    id: 3,
    name: "Sarah Junior",
    email: "sarah.junior@email.com",
    lastActivity: "2 jours",
    average: "9.2",
    status: "Inactif",
  },
  {
    id: 4,
    name: "Alex Jean",
    email: "alex.Jean@email.com",
    lastActivity: "8 heures",
    average: "14.8",
    status: "Actif",
  },
];

export default function Student() {
  return (
    <div className="">
      <div className="bg-white rounded-lg shadow p-6 text-sm mb-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Eleves</h2>
        </div>

        <fieldset className="w-full border-1 p-1 border-gray-400 rounded-sm flex mb-2">
          <input name="search" className="h-8 border-none flex-1 " />
          <button className="bg-primary rounded-sm w-8">🔎</button>
        </fieldset>
      </div>
      <StudentsList students={students} />
    </div>
  );
}
