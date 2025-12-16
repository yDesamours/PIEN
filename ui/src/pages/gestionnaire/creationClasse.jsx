import { useEffect, useState } from "react";
//import { Card, CardContent } from "@/components/ui/card";


export default function CreationClasse() {
  const [programmes, setProgrammes] = useState([]);
  const [echelons, setEchelons] = useState([]);
  const [matieres, setMatieres] = useState([]);
  const [enseignants, setEnseignants] = useState([]);

  const [loading, setLoading] = useState(false);

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
    fetch("/api/lov/programmes")
      .then(res => res.json())
      .then(setProgrammes);

    fetch("/api/lov/matieres")
      .then(res => res.json())
      .then(setMatieres);
  }, []);

  /* -------------------- LOAD ECHELONS BY PROGRAMME -------------------- */
  useEffect(() => {
    if (!form.programmeId) return;

    fetch(`/api/lov/echelons/${form.programmeId}`)
      .then(res => res.json())
      .then(data => {
        setEchelons(data);
        setForm(prev => ({ ...prev, echelonId: "" }));
      });
  }, [form.programmeId]);

  /* -------------------- LOAD ENSEIGNANTS BY MATIERE -------------------- */
  useEffect(() => {
    if (!form.matiereId) return;

    fetch(`/api/lov/enseignants/matiere/${form.matiereId}`)
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
      programmeId: form.programmeId,
      echelonId: form.echelonId,
      matiereId: form.matiereId,
      enseignant: form.enseignantId,
      code: form.code,
      nom: form.nom,
      description: form.description,
      actif: form.actif,
    };

    try {
      const res = await fetch("/api/classes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de la création");

      const createdClasse = await res.json();
      // navigate(`/classes/${createdClasse.id}/students`);
      alert("Classe créée avec succès");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="rounded-2xl shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Créer une classe</h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">

            {/* Programme */}
            <select name="programmeId" value={form.programmeId} onChange={handleChange} required>
              <option value="">Programme</option>
              {programmes.map(p => (
                <option key={p.code} value={p.code}>{p.nom}</option>
              ))}
            </select>

            {/* Échelon */}
            <select name="echelonId" value={form.echelonId} onChange={handleChange} required disabled={!form.programmeId}>
              <option value="">Échelon</option>
              {echelons.map(e => (
                <option key={e.code} value={e.code}>{e.nom}</option>
              ))}
            </select>

            {/* Matière */}
            <select name="matiereId" value={form.matiereId} onChange={handleChange} required>
              <option value="">Matière</option>
              {matieres.map(m => (
                <option key={m.code} value={m.code}>{m.nom}</option>
              ))}
            </select>

            {/* Enseignant */}
            <select name="enseignantId" value={form.enseignantId} onChange={handleChange} required disabled={!form.matiereId}>
              <option value="">Enseignant</option>
              {enseignants.map(e => (
                <option key={e.code} value={e.code}>{e.nom}</option>
              ))}
            </select>

            <input name="code" placeholder="Code" value={form.code} onChange={handleChange} required />
            <input name="nom" placeholder="Nom de la classe" value={form.nom} onChange={handleChange} required />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              className="col-span-2"
            />

            <label className="flex items-center gap-2 col-span-2">
              <input type="checkbox" name="actif" checked={form.actif} onChange={handleChange} />
              Classe active
            </label>

            <div className="col-span-2 flex justify-end">
              <button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer la classe"}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
