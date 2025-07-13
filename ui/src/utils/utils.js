export function capltalize(s) {
  return s[0].toUpperCase().concat(s.substring(1));
}

export const storage = {
  getUser: () => sessionStorage.getItem("user"),
  setUser: (user) => sessionStorage.setItem("user", JSON.stringify(user)),
};
