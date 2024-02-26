import { create } from "zustand";

interface IManagementViewProps {
  isShow: boolean;
  setIsShow: (data: boolean) => void;
  managementData: any;
  setManagementData: (data: any) => void;
}

const useManagementView = create<IManagementViewProps>((set) => ({
  isShow: false,
  managementData: null,
  setIsShow: (data: boolean) => set(() => ({ isShow: data })),
  setManagementData: (data: any) => set(() => ({ managementData: data })),
}));

export default useManagementView;
