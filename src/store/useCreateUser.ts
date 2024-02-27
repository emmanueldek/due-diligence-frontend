import { create } from "zustand";

type TGlobalSearchState = {
  showModal: boolean;
  setShowModal: (arg: boolean) => void;
};

export const useCreateUser = create<TGlobalSearchState>()((set) => ({
  showModal: false,
  setShowModal: (arg) => set(() => ({ showModal: arg })),
}));
