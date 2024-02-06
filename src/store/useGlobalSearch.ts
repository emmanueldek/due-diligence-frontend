import { create } from "zustand";

type TGlobalSearchState = {
  value: string;
  isSearching: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleIsSearching: (arg: boolean) => void;
};

export const useGlobalSearch = create<TGlobalSearchState>()((set) => ({
  value: "",
  isSearching: false,
  handleChange: (event) =>
    set(() => ({
      value: event.target.value,
      isSearching: event.target.value !== "" ? true : false,
    })),
  handleIsSearching: (arg) => set(() => ({ isSearching: arg })),
}));

// export const Params = create((set)=>({
//   param:0,
//   handleChange:(event)=> set(()=>)
// }))
