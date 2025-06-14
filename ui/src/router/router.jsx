import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";
import App from "../app";
import GestionnaireLayout from "../layouts/gestionnaireLayout";
import EleveLayout from "../layouts/eleveLayout";
import EnseignantLayout from "../layouts/enseignantLayout";

export default createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "auth",
        Component: AuthLayout,
        children: [{ path: "login", Component: Login }],
      },
      {
        path: "gestionnaire",
        Component: GestionnaireLayout,
      },
      {
        path: "eleve",
        Component: EleveLayout,
      },
      {
        path: "enseignant",
        Component: EnseignantLayout,
      },
    ],
  },
]);
