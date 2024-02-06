import React from "react";
interface IcountProps {
  count: number | string;
  active?: boolean;
  className?: string;
}

const CountCard: React.FC<IcountProps> = ({ count, active, className }) => {
  return (
    <div
      className={`${
        active ? "bg-red-500 text-white " : "bg-grey-100 text-grey-900"
      } flex justify-center items-center font-[600] px-1 text-sm rounded ${className}`}
    >
      {count}
    </div>
  );
};

export default CountCard;
