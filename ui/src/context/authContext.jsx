import { useNavigate } from "react-router";
import { useEffect, useState, createContext } from "react";
import useApi from "../hooks/api";
import USER from "../services/api/user";

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export default function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState();
  const { execute } = useApi();
  const navigate = useNavigate();

  const login = (user) => {
    console.log({ user });
    setUserData({ ...user });
    navigate("/");
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
