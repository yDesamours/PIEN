import { Outlet } from "react-router-dom";
import AuthContextProvider from "./context/authContext";
import { SideViewerProvider } from "./components/sideViewer/sideViewer";

export default function App() {
  return (
    <AuthContextProvider>
      <SideViewerProvider>
        <Outlet />
      </SideViewerProvider>
    </AuthContextProvider>
  );
}
