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

/**
 *
 * @param {string} base64String
 * @returns {Blob}
 */
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

/**
 *
 * @returns {string}
 */
export function colorRand() {
  function rand() {
    return (Math.random() * 15).toFixed(0);
  }

  const values = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
  ];
  let color = "#";

  for (let i = 0; i <= 5; i++) {
    color = color.concat(values[rand()]);
  }

  return color;
}

export function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
