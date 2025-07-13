import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";

import AuthContextProvider from "./context/authContext.jsx";
import { SideViewerProvider } from "./components/sideViewer/sideViewer.jsx";
import App from "./app.jsx";
import routes from "./routes/routes.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
