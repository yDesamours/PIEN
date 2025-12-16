import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
} from "react";

const context = createContext({ set: () => {}, get: () => {} });

const cacheReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return { ...state, [action.path]: action.payload };
  }
};

const initialCache = {};

export default function CacheContextProvider({ children }) {
  const [state, dispatch] = useReducer(cacheReducer, initialCache);

  const get = useCallback(
    (path) => {
      return state[path];
    },
    [state]
  );

  const set = useCallback(
    (path, payload) => {
      dispatch({ type: "UPDATE", action: { path, payload } });
    },
    [dispatch]
  );

  const contextValue = useMemo(() => ({ set, get }), [set, get]);

  return <context.Provider value={contextValue}>{children}</context.Provider>;
}

export function useCache() {
  return useContext(context);
}
