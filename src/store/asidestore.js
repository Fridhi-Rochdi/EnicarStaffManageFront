import { create } from "zustand";

const useAsideStore = create((set) => ({
  openaside: false,
  setOpenaside: () => set((state) => ({ openaside: !state.openaside })),
}));

export default useAsideStore;

