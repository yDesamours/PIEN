import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import { BrowserRouter } from "react-router";

import AuthContextProvider from "./context/authContext.jsx";
import { SideViewerProvider } from "./components/sideViewer/sideViewer.jsx";
import App from "./app.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SideViewerProvider>
          <App />
        </SideViewerProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
