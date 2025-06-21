import { useState } from "react";
import USER from "../services/api/user";

export default function useApi() {
  const [requestState, setRequestState] = useState({
    loading: false,
    error: false,
    result: null,
  });

  const execute = async (config) => {
    setRequestState((state) => ({
      ...state,
      loading: true,
      error: null,
    }));

    let result;

    try {
      result = await sendRequest(config);
      if (result.ok) {
        return result.body;
      }
      if (result.errorData.code === 401) {
      }
    } catch (err) {
      const message =
        err instanceof TypeError
          ? "Network error: please check your internet connection."
          : err.message || "Erreur inconnue";
      setRequestState((state) => ({
        ...state,
        loading: false,
        error: message,
      }));
    } finally {
      setRequestState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  return { execute, requestState };
}

const sendRequest = async ({ method = "GET", body, url }) => {
  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return { ok: false, errorData };
  }

  const responseData = await response.json();
  return { ok: true, body: responseData.data };
};
