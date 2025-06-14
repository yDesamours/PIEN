import { useEffect, useState } from "react";
import { createContext } from "react";

export const AuthContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

function decode(token) {
  return JSON.parse(atob(token.split(".")[1]));
}

export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState({});

  const login = ({ token }) => {
    const { user } = decode(token);

    localStorage.setItem("jwt", token);
    setUserData({ user, token });
  };

  const logout = () => {
    setUserData({});
  };

  const isAuthenticated = userData.user !== null;

  useEffect(() => {
    const savedToken = localStorage.getItem("jwt");
    if (!savedToken) {
      setUserData({ user: null });
      return;
    }

    const { user, exp } = decode(savedToken);
    const expirationDate = new Date(exp * 1000);

    if (expirationDate < new Date()) {
      logout();
      return;
    }
    console.log(expirationDate);
    setUserData({ user, token: savedToken });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user: userData.user, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
