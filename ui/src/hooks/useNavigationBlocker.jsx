import { useEffect } from "react";
import { unstable_useBlocker as useBlocker } from "react-router-dom";

export function useNavigationBlocker(when, onBlock) {
  const blocker = useBlocker(when);

  useEffect(() => {
    console.log(blocker);
    if (blocker.state === "blocked") {
      // run your code BEFORE navigation happens
      onBlock();

      // then you choose to continue navigation:
      blocker.proceed();
      // or blocker.reset() to cancel
    }
  }, [blocker, onBlock]);
}
