import { useEffect, useState } from "react";
//import { Card, CardContent } from "@/components/ui/card";
import { baseUrl,apiUrl } from "../../utils/utils";
import { useNavigate } from "react-router-dom";



export default function CreationClasse() {
  console.log("in creationClasse components")
  const [programmes, setProgrammes] = useState([]);
  const [echelons, setEchelons] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [enseignants, setEnseignants] = useState([]);

  const [loading, setLoading] = useState(false);
const navigate= useNavigate()
  const [form, setForm] = useState({
    programmeId: "",
    echelonId: "",
    matiereId: "",
    enseignantId: "",
    code: "",
    nom: "",
    description: "",
    actif: true,
  });

  /* -------------------- LOAD INITIAL LOV -------------------- */
  useEffect(() => {
    fetch(`${baseUrl}${apiUrl}lov/programmes`)
      .then(res => res.json())
      .then(setProgrammes);

    fetch(`${baseUrl}${apiUrl}lov/matieres`)
      .then(res => res.json())
      .then(setMatieres);
  }, []);

  /* -------------------- LOAD ECHELONS BY PROGRAMME -------------------- */
  useEffect(() => {
    if (!form.programmeId) return;

    fetch(`${baseUrl}${apiUrl}lov/echelons/${form.programmeId}`)
      .then(res => res.json())
      .then(data => {
        setEchelons(data);
        setForm(prev => ({ ...prev, echelonId: "" }));
      });
  }, [form.programmeId]);

  /* -------------------- LOAD ENSEIGNANTS BY MATIERE -------------------- */
  useEffect(() => {
    if (!form.matiereId) return;

    fetch(`${baseUrl}${apiUrl}lov/enseignants/matiere/${form.matiereId}`)
      .then(res => res.json())
      .then(data => {
        setEnseignants(data);
        setForm(prev => ({ ...prev, enseignantId: "" }));
      });
  }, [form.matiereId]);

  /* -------------------- HANDLERS -------------------- */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
     // programmeId: form.programmeId,
      echelonId: form.echelonId,
      matiereId: form.matiereId,
      enseignantId: form.enseignantId,
      code: form.code,
      nom: form.nom,
      description: form.description,
      actif: form.actif,
      anneeAcademique:form.anneeAcademique,
    };

    try {
      const res = await fetch(`${baseUrl}${apiUrl}classes/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      const createdClasse = await res.json();
     navigate(`/gestionnaire/classes`);
      alert("Classe créée avec succès");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div>
  <h1 className="text-2xl font-semibold mb-6">Créer une classe</h1>

  <div className="p-6">
    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

     {/*Annee Academique*/}
        <div className="flex flex-col gap-1 col-span-2">
        <label className="text-sm font-semibold text-gray-700">
          Annee Academique
        </label>
        <input
          name="anneeAcademique"
          value={form.anneeAcademique}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      {/* Programme */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Programme
        </label>
        <select
          name="programmeId"
          value={form.programmeId}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sélectionner un programme</option>
          {programmes.map(p => (
            <option key={p.code} value={p.code}>{p.nom}</option>
          ))}
        </select>
      </div>

      {/* Échelon */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Échelon
        </label>
        <select
          name="echelonId"
          value={form.echelonId}
          onChange={handleChange}
          required
          disabled={!form.programmeId}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sélectionner un échelon</option>
          {echelons.map(e => (
            <option key={e.code} value={e.code}>{e.nom}</option>
          ))}
        </select>
      </div>

      {/* Matière */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Matière
        </label>
        <select
          name="matiereId"
          value={form.matiereId}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sélectionner une matière</option>
          {matieres.map(m => (
            <option key={m.code} value={m.code}>{m.nom}</option>
          ))}
        </select>
      </div>

      {/* Enseignant */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Enseignant
        </label>
        <select
          name="enseignantId"
          value={form.enseignantId}
          onChange={handleChange}
          required
          disabled={!form.matiereId}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Sélectionner un enseignant</option>
          {enseignants.map(e => (
            <option key={e.code} value={e.code}>{e.code}-{e.nom}</option>
          ))}
        </select>
      </div>

      {/* Code */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Code
        </label>
        <input
          name="code"
          value={form.code}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Nom */}
      <div className="flex flex-col gap-1">
        <label className="text-sm font-semibold text-gray-700">
          Nom de la classe
        </label>
        <input
          name="nom"
          value={form.nom}
          onChange={handleChange}
          required
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col gap-1 col-span-2">
        <label className="text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Actif */}
      <label className="flex items-center gap-2 col-span-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="actif"
          checked={form.actif}
          onChange={handleChange}
          className="accent-indigo-600"
        />
        Classe active
      </label>

      {/* Bouton */}
      <div className="col-span-2 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-md text-sm hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Création..." : "Créer la classe"}
        </button>
      </div>

    </form>
  </div>
</div>

  );
}
