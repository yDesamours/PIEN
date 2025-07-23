export function capltalize(s) {
  return s[0].toUpperCase().concat(s.substring(1));
}

export const storage = {
  getUser: () => sessionStorage.getItem("user"),
  setUser: (user) => sessionStorage.setItem("user", JSON.stringify(user)),
};

export function deepCopyJSON(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 *
 * @param {String} string
 * @returns {Boolean}
 */
export function isEmpty(string) {
  return !!string && string.trim().length > 0;
}

export function base64ToBlob(base64String) {
  if (!base64String.startsWith("data:")) {
    throw new Error("Chaîne data: URL attendue.");
  }

  const [meta, rawBase64] = base64String.split(",");
  const mimeMatch = meta.match(/^data:(.+);base64$/);

  if (!mimeMatch) {
    throw new Error("Format d'en-tête invalide.");
  }

  const mimeType = mimeMatch[1];
  const cleanedBase64 = rawBase64.replace(/[\r\n\s]/g, "");

  const binary = atob(cleanedBase64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }

  return new Blob([buffer], { type: mimeType });
}
