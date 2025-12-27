import React, { useEffect, useState } from "react";
import { baseUrl, apiUrl } from "../../utils/utils";

const AssignationEtudiant = ({ classe }) => {
  const [disponibles, setDisponibles] = useState([]);
  const [assignes, setAssignes] = useState([]);
  const[currentAssignes, setCurrentAssignes]=useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [count, setCount]=useState(0)

useEffect(() => {
  setLoading(true);

  Promise.all([
    fetch(`${baseUrl}${apiUrl}classes/assignable_student/${classe.id}`).then(r => r.json()),
    fetch(`${baseUrl}${apiUrl}classes/student/${classe.id}`).then(r => r.json())
  ])
    .then(([assignables, classeEtudiants]) => {
      setDisponibles(assignables);
      setAssignes(classeEtudiants);
      setLoading(false);
    })
    .catch(() => setLoading(false));
}, [classe.id]);


  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

const addSelected = () => {
  if (selectedIds.length === 0) return;

  const toAdd = disponibles.filter(e =>
    selectedIds.includes(e.id)
  );

  setAssignes(prev => [...prev, ...toAdd]);
  setCurrentAssignes(prev=>[...prev,...toAdd]);
  setDisponibles(prev =>
    prev.filter(e => !selectedIds.includes(e.id))
  );
  console.log("current assignes");
  console.log(currentAssignes);
    console.log("assignes");
  console.log(assignes);
  setSelectedIds([]);
};

const handleValider = async () => {
  
  try {
    for (const etudiant of currentAssignes) {
      
      await fetch(
        `${baseUrl}${apiUrl}classes/assign-student?classeId=${classe.id}&eleveId=${etudiant.id}`,
        {
          method: "POST",
        }
      );
    }
    alert("Assignation sauvegardée avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'assignation :", error);
    alert("Une erreur est survenue lors de l'assignation");
  }
  setCount(prev=>prev+1);
};


  const removeFromClasse = async(etudiant) => {
    setAssignes(assignes.filter((e) => e.id !== etudiant.id));
    setDisponibles([...disponibles, etudiant]);
    await fetch(
          `${baseUrl}${apiUrl}classes/delete_student/${classe.id}/${etudiant.id}`,
        {
          method: "DELETE",
        }
    )

  };

  const filteredDisponibles = disponibles.filter((e) =>
    `${e.nom} ${e.prenom}`.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6">Chargement...</div>;

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Infos classe */}
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold mb-2">Assignation des étudiants</h1>
        <p className="text-gray-600">
          <strong>Classe :</strong> {classe.echelon} – {classe.matiere}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* DISPONIBLES */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3">Étudiants disponibles</h3>

          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
          />

          <ul className="space-y-2 max-h-[400px] overflow-auto">
            {filteredDisponibles.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(e.id)}
                    onChange={() => toggleSelect(e.id)}
                  />
                  <span className="font-medium">
                    {e.nom} {e.prenom}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          {selectedIds.length > 0 && (
            <button
              onClick={addSelected}
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Ajouter à la classe
            </button>
          )}
        </div>

        {/* ASSIGNÉS */}
        <div className="bg-white rounded-xl shadow p-4">
          <h3 className="font-semibold mb-3">Étudiants dans la classe</h3>

          <ul className="space-y-2 max-h-[460px] overflow-auto">
            {assignes.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
              >
                <span className="font-medium">
                  {e.nom} {e.prenom}
                </span>

                <button
                  onClick={() => removeFromClasse(e)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Retirer
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-4 cursor-pointer">
        <div onClick={handleValider}>
          <button
          className="bg-green-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-green-700 "
        >
          Valider Assignation
        </button>
        </div>
        <label className="bg-gray-800 text-white px-6 py-2 rounded cursor-pointer hover:bg-gray-900">
          Import Excel
          <input type="file" className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default AssignationEtudiant;
