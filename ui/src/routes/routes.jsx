import Login from "../pages/Login";
import Home from "../pages/home";
import EnseignantLayout from "../layouts/enseignant/enseignantLayout";
import Dashboard from "../pages/enseignant/dashboard";
import Cours from "../pages/enseignant/cours";

export default [
  {
    path: "/",
    Component: Home,
  },
  {
    path: "auth/login",
    Component: Login,
  },
  {
    path: "/enseignant",
    Component: EnseignantLayout,
    children: [
      {
        path: "dashboard",
        Component: Dashboard,
      },
      {
        path: "cours",
        Component: Cours,
      },
    ],
  },
];
