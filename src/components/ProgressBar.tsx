import React from "react";
interface IProgressbarProps {
  progress?: number;
  total?: number;
  percent?: string;
}

const ProgressBar: React.FC<IProgressbarProps> = ({ percent }) => {
  const percentage = percent?.toString();
  return (
    <div className="w-full bg-[#D7DDEA] rounded-full h-2">
      <div
        className={` bg-[#11BB88] h-2 rounded-full  transition-width duration-300 ease-in-out`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
