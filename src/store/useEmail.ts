import { create } from "zustand";

interface ICreatorStore {
  email: string;
  setEmail: (arg: string) => void;
}

const useEmail = create<ICreatorStore>((set) => ({
  email: "",
  setEmail: (arg: string) => {
    set(() => ({ email: arg })); // Update 'email' instead of 'user'
  },
}));

export default useEmail;
