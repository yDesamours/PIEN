import { Outlet } from "react-router-dom";
import Title from "../../components/title/title";

export default function EnseignantClasseLayout() {
  return (
    <>
      {/* <div className=" flex-1 flex flex-col"> */}
      <Outlet />
      {/* </div> */}
    </>
  );
}
