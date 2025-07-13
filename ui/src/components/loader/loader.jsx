import { cloneElement, Suspense } from "react";
import { Await } from "react-router-dom";
import Loading from "./loading";

export default function Loader({ children, promise, fallback = <Loading /> }) {
  return (
    <Suspense fallback={fallback}>
      <Await resolve={promise}>
        {(resolved) => cloneElement(children, { data: resolved })}
      </Await>
    </Suspense>
  );
}
