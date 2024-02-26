import useManagementView from "@/store/useManagementView";
import { AnimatePresence, motion } from "framer-motion";
import close from "../../assets/icons/close.svg";

const ViewManagement = () => {
  const { managementData, isShow, setIsShow } = useManagementView();
  console.log(managementData);
  return (
    <AnimatePresence>
      {isShow && (
        <div className="bg-[#262626a3] fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-[3.1px] shadow-[0_4px_30px_#00000019] flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.6, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-[95%] lg:w-[80%] md:min-w-[400px] rounded-[0.4rem] md:rounded-[0.4rem] overflow-y-scroll lg:overflow-x-hidden h-[90%] p-6 flex gap-5 flex-col lg:flex-row relative"
          >
            <div className="bg-white justify-end items-center lg:hidden flex border-b py-1 border-[#9c9c9c]">
              <img
                src={close}
                alt="close_btn"
                className="w-[27px] cursor-pointer animate-bounce"
                onClick={() => setIsShow(false)}
              />
            </div>

            <div className="flex-1">
              <img
                src={managementData ? managementData?.imageUrl : ""}
                alt="management_image"
                className="h-full rounded-lg mx-auto"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="text-[24px] font-semibold">{managementData?.name || ""}</p>
                <img
                  src={close}
                  alt="close_btn"
                  className="w-[30px] cursor-pointer hidden lg:block"
                  onClick={() => setIsShow(false)}
                />
              </div>
              <p className="mt-3 text-[#666666] font-medium">{managementData?.position || ""}</p>
              <p className="mt-4">{managementData?.description || ""}</p>
            </div>
          </motion.div>{" "}
        </div>
      )}
    </AnimatePresence>
  );
};

export default ViewManagement;
