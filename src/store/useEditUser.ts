import { create } from "zustand";

type TGlobalSearchState = {
  editData: any;
  showModal: boolean;
  setEditData: (arg: any) => void;
  setShowModal: (arg: boolean) => void;
};

export const useEditUser = create<TGlobalSearchState>()((set) => ({
  editData: null,
  showModal: false,
  setEditData: (arg) => set(() => ({ editData: arg })),
  setShowModal: (arg) => set(() => ({ showModal: arg })),
}));
