import React from "react";
import RecordLogo from "@/assets/images/RecordLogo.png";
import { EnvelopeSimpleOpen } from "@/components/svgs/EnvelopeSimpleOpen";

interface IVerifyProps {
  title: string;
  text: string;
  email: string | null;
  flag?: string;
}

const VerifyEmail: React.FC<IVerifyProps> = ({ title, text, email }) => {
  return (
    <div>
      <div className="w-[564px] flex flex-col items-center rounded-xl shadow-lg p-10">
        <div className="ml-[-18px] sm:ml-[-1px] scale-75 cursor-pointer flex space-x-2 items-center">
          <img src={RecordLogo} alt="" />
        </div>
        <div className="mt-5">
          <EnvelopeSimpleOpen />
        </div>
        <div className="text-center">
          <p className="font-[700] text-4xl">{title}</p>
          <p className="text-lg font-[400] mt-5">{text}</p>
        </div>
        <div className="w-full mt-8 flex justify-center">
          <div className="p-3 rounded-md bg-grey-100">
            <p className="text-lg font-[600]">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
