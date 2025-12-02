import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AuthContextProvider, { AuthContext } from "./context/authContext";
import { SideViewerProvider } from "./components/sideViewer/sideViewer";
import { useContext, useEffect } from "react";

export default function App() {
  const { user } = useContext(AuthContext);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;
    if (user === null) {
      navigate("/auth/login");
    }
    if (pathname === "/") {
      const path = `/${user.role.toLowerCase()}/dashboard`;
      navigate(path);
    }
  }, [user]);

  return <Outlet />;
}
