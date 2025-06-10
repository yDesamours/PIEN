import { createBrowserRouter } from "react-router";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Login";

export default createBrowserRouter([
  {
    path: "/auth",
    Component: AuthLayout,
    children: [{ path: "login", Component: Login }],
  },
]);
