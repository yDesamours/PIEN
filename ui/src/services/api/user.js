const host = "/api";

const USER = {};

USER.LOGIN = async ({ email, password, role }) => {
  const body = { email, password, role };
  return await sendRequest({
    method: "POST",
    path: "login",
    body,
  });
};

const sendRequest = async ({ method = "GET", body, path }) => {
  const url = host + path;
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "API request failed");
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("Network error: please check your internet connection.");
    }
    throw error;
  }
};

export default USER;
