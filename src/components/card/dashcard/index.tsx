import React from "react";

interface IDashCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode | string;
}

const DashCard: React.FC<IDashCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-3 rounded-lg px-5 min-w-[238px] w-fit">
      <div className="flex items-center justify-between">
        <p className=" font-500 text-base">{title}</p>
        {icon}
      </div>
      <p className="text-[36px] font-[700]">{value}</p>
    </div>
  );
};

export default DashCard;
