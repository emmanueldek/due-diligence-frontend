import { create } from "zustand";

interface IGetShareHokder {
  shareHolder: string;
  currentUrl: string;
  setCurrentUrl: (value: string) => void;
  setShareHolder: (value: string) => void;
}
const useGetShareHolder = create<IGetShareHokder>((set) => ({
  shareHolder: "",
  currentUrl: "",
  setCurrentUrl: (value: string) => set({ currentUrl: value }),
  setShareHolder: (value: string) => set({ shareHolder: value }),
}));

export default useGetShareHolder;
