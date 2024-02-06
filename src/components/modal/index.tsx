import React from "react";
import { FaTimes } from "react-icons/fa";

interface IModalProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  className?: string;
}

const Modal: React.FC<IModalProps> = ({ children, title, onClose, subtitle, className }) => {
  return (
    <div
      className={`bg-modalGrey  backdrop-blur-[5px] fixed top-0 bottom-0 left-0 h-[100vh] w-full flex justify-center items-center z-[999]`}
    >
      <div className={`bg-white text-[#292D32] rounded-[8px] p-6 ${className}`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[24px] font-bold">{title || null}</p>
            <p className="text-sm">{subtitle || null}</p>
          </div>
          <div
            className="text-[#737373] bg-[#ECECECB2] h-[30px] w-[30px] flex items-center justify-center rounded-full text-[20px] cursor-pointer"
            onClick={onClose}
          >
            <FaTimes className="w-[10px] " />
          </div>
        </div>
        <hr className="border-grey-100 mt-3" />
        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
