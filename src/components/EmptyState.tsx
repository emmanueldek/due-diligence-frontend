import React from "react";
import testing from "@/assets/images/testing.png";

interface IEmptyState {
  title?: string;
  text?: string;
}

const EmptyState: React.FC<IEmptyState> = ({ title, text }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center flex-1 space-y-2">
      <img src={testing} alt="" />
      <div className="text-center">
        <p className="text-4xl font-[700]">{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default EmptyState;
