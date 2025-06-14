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
      return result.data;
    } catch (err) {
      setRequestState((state) => ({
        ...state,
        loading: false,
        error: err.message || "Erreur inconnue",
      }));
      throw err;
    } finally {
      setRequestState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  return { execute, requestState };
}
