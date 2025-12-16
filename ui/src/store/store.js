import { create } from "zustand";

const useStore = create((set) => ({
  classes: [],
  setClasses: (c) => set({ classes: c }),
  modules: [],
  setModules: (c) => set({ modules: c }),
  lecons: [],
  setLecons: (c) => set({ lecons: c }),
}));

export default useStore;
