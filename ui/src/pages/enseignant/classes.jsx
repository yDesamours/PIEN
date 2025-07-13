import { Await, useLoaderData, useNavigate } from "react-router-dom";
import { Suspense, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import Classes from "../../features/enseignant/components/classes/classes";
import Title from "../../components/title/title";
import Loader from "../../components/loader/loader";

export default function EnseignantClasses() {
  const { user } = useContext(AuthContext);
  const { classes } = useLoaderData();

  return (
    <>
      <div className="p-2">
        <form className=" max-w-3xl flex flex-col gap-2 mb-8">
          <input name="search" className="h-8 border w-full" />
          <fieldset className="flex gap-2">
            <label className=" border h-8 p-2 flex justify-center items-center">
              <span>Matiere</span>
              <select
                name="matiere"
                className="border-none focus:outline-none focus:ring-0"
              ></select>
            </label>
            <label className=" border h-8 p-2 flex justify-center items-center">
              <span>Niveau</span>
              <select
                name="niveau"
                className="border-none focus:outline-none focus:ring-0"
              ></select>
            </label>
          </fieldset>
        </form>

        <Loader promise={classes}>
          <Classes />
        </Loader>
      </div>
    </>
  );
}
