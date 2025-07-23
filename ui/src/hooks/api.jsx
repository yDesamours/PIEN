import { useState } from "react";

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
        return { data: result.body };
      }
      if (result.errorData.code === 401) {
        return;
      }
      if (!result.ok && result.code === 404) {
        return { error: result.errorData };
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

  const responseData = await response.json();

  if (!response.ok) {
    return { ok: false, errorData: responseData, code: response.status };
  }

  return { ok: true, body: responseData.data };
};
