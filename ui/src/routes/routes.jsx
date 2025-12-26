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
import ClasseLoader from "../loaders/enseignant/class";
import Module from "../pages/enseignant/module";
import StudentProfile from "../pages/enseignant/studentProfile";
import MesElevesPanel from "../pages/enseignant/students";
import leconLoader from "../loaders/enseignant/lecon";
import Lecon from "../pages/enseignant/lecon";

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
          { path: "eleves", element: <MesElevesPanel /> },
          {
            path: "eleves/:id",
            element: <StudentProfile />,
          },
          {
            path: "classes",
            element: <EnseignantClasseLayout />,
            children: [
              {
                index: true,
                element: <EnseignantClasses />,
              },
              {
                path: ":classeId",
                children: [
                  {
                    index: true,
                    element: <EnseignantClasse />,
                    loader: ClasseLoader,
                  },
                  {
                    path: "modules",
                    children: [
                      {
                        path: ":moduleId",
                        children: [
                          {
                            index: true,
                            element: <EnseignantCours />,
                          },
                          {
                            path: "lecons/:leconId",
                            element: <Lecon />,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "enseignant/classes/:classeId/modules/:moduleId/lecons/:leconId/contenus/:versionId",
        loader: leconLoader,
        element: <Cours />,
      },
    ],
  },
]);
