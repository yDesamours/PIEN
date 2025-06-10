import { useState } from "react";

export default function useApi() {
  const [requestState, setRequestState] = useState({
    loading: false,
    error: false,
    result: null,
  });

  const execute = async (apiCall) => {
    setRequestState((state) => ({
      ...state,
      loading: true,
      error: null,
    }));

    try {
      const result = await apiCall();
      // Ici tu peux afficher un toast succès si tu veux
      return result;
    } catch (err) {
      setError(err.message || "Erreur inconnue");
      // Ici tu peux afficher un toast erreur
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, requestState };
}
