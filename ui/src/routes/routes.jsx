import Login from "../pages/Login";
import Home from "../pages/home";
import EnseignantLayout from "../layouts/enseignant/enseignantMainLayout";
import Dashboard from "../pages/enseignant/dashboard";
import Cours from "../pages/enseignant/editerCours";
import PrivateOnly from "../features/auth/components/privateRoute";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../app";
import EnseignantClasseLayout from "../layouts/enseignant/enseignantClasseLayout";
import EnseignantClasses from "../pages/enseignant/classes";
import EnseignantClasse from "../pages/enseignant/classe";
import EnseignantCours from "../pages/enseignant/lecons";
import ClassesLoader from "../features/enseignant/loaders/classes";
import ClasseLoader from "../features/enseignant/loaders/class";

export default createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "enseignant",
        element: (
          <PrivateOnly role="ENSEIGNANT">
            <EnseignantLayout />
          </PrivateOnly>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="dashboard" />,
          },
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "classes",
            element: <EnseignantClasseLayout />,
            children: [
              {
                index: true,
                loader: ClassesLoader,
                element: <EnseignantClasses />,
              },
              {
                path: ":classeId",
                loader: ClasseLoader,
                element: <EnseignantClasse />,
              },
              { path: ":classeId/cours", element: <EnseignantCours /> },
              { path: ":classeId/cours/:coursId", element: <Cours /> },
            ],
          },
        ],
      },
    ],
  },
]);
