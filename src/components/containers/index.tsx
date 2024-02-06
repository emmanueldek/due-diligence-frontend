import React from "react";

interface IContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Wrapper = ({ className, children }: IContainerProps) => {
  return <div className={`rounded-md p-4 w-full ${className}`}>{children}</div>;
};

export const Card = ({ className, children }: IContainerProps) => {
  return (
    <div
      className={`rounded-md p-4 w-full border-t-[1px] border-r-[3px] border-b-[3px] border-l-[1px] border-grey-100 ${className}`}
    >
      {children}
    </div>
  );
};
