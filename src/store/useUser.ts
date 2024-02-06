import { create } from "zustand";
import { TUserResponseSchema } from "@/interface/userCreation";

interface ICreatorStore {
  user: Partial<TUserResponseSchema>;
  setUser: (arg: Partial<TUserResponseSchema>) => void;
}

const useUser = create<ICreatorStore>((set) => ({
  user: {},
  setUser: (arg: Partial<TUserResponseSchema>) => {
    set(() => ({ user: arg }));
  },
}));

export default useUser;
