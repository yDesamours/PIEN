import { Outlet } from "react-router-dom";
import Title from "../../components/title/title";

export default function EnseignantClasseLayout() {
  return (
    <>
      <Title title="Mes Classes" />
      <div className="p-2">
        <Outlet />
      </div>
    </>
  );
}
