import { useLoaderData, useParams } from "react-router-dom";
import Modules from "../../features/enseignant/components/modules/modules";
import { Suspense } from "react";
import Loader from "../../components/loader/loader";

export default function Module() {
  const params = useParams();
  const { modules } = useLoaderData();

  return (
    <div>
      <Loader promise={modules}>
        <Modules />
      </Loader>
    </div>
  );
}
