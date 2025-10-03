import { useEffect, useState, createContext } from "react";
import useApi from "../hooks/api";
import USER from "../services/api/user";
import { storage } from "../utils/utils";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState();
  const { execute } = useApi();

  const login = (user) => {
    storage.setUser(user);
    setUserData({ ...user });
  };

  const logout = () => {
    setUserData(null);
  };

  useEffect(() => {
    const checkAuth = async () => {
      const user = await execute(USER.ME);
      if (user) {
        login(user);
      } else {
        setUserData(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
