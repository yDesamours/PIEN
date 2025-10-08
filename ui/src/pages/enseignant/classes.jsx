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
      <section className="py-6 px-4 bg-primary text-white">
        <h2 className="text-2xl font-bold">Mes Classes</h2>
      </section>
      <section className="px-4 mt-5">
        <form className=" max-w-4xl flex flex-col gap-2 mb-8  bg-white shadow-xl rounded-xl p-6">
          <fieldset className="w- border-1 p-1 border-gray-400 rounded-sm flex">
            <input name="search" className="h-8 border-none flex-1 " />
            <button className="bg-primary rounded-sm w-8">🔎</button>
          </fieldset>

          <fieldset className="flex justify-start gap-2 text-sm">
            <label className="p-2 flex flex-col w-60 gap-1">
              <span>Matiere</span>
              <select
                name="matiere"
                className=" focus:outline-none focus:ring-0 w-full border-1 border-gray-400 rounded-sm h-7"
              ></select>
            </label>

            <label className="p-2 flex flex-col w-60 gap-1">
              <span>Niveau</span>
              <select
                name="niveau"
                className=" focus:outline-none focus:ring-0 w-full h-7 border-1 border-gray-400 rounded-sm"
              ></select>
            </label>
          </fieldset>
          <fieldset className="flex w-full justify-end text-xs text-primary">
            <button className="cursor-pointer" type="reset">
              Effacer les filtres
            </button>
          </fieldset>
        </form>
      </section>

      <section className="py-6 px-4">
        <Loader promise={classes}>
          <Classes />
        </Loader>
      </section>
    </>
  );
}
