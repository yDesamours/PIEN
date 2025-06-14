import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import { Navigate, Outlet } from "react-router";
import Loading from "./layouts/loading";

export default function App() {
  const { user } = useContext(AuthContext);

  let component;

  if (user === undefined) return <Loading />;

  if (user === null) {
    component = <Navigate to="/auth/login" />;
  } else if (user.role === "GESTIONNAIRE") {
    component = <Navigate to="/gestionnaire" />;
  } else if (user.role === "ELEVE") {
    component = <Navigate to="/eleve" />;
  } else if (user.role === "ENSEIGNANT") {
    component = <Navigate to="/enseignant" />;
  }

  return (
    <>
      {component}
      <Outlet />
    </>
  );
}
