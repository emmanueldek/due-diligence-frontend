import React from "react";
import dangote from "@/assets/images/dangote.jpeg";

interface IDataStructureProps {
  data: any;
}
const Management: React.FC<IDataStructureProps> = ({ data }) => {
  return (
    <div>
      {" "}
      <p className="font-[700] 2xl">Managements</p>
      <hr className="border-grey-50 mt-2 mb-5" />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[2rem]">
        {data.map((data: any, index: number) => {
          return (
            <div className="relative h-[230px] flex items-start" key={index}>
              <img src={data.imageUrl ? data.imageUrl : dangote} className="rounded-[5px] object-cover h-[160px]" />

              <div className="absolute bottom-0 w-full text-center min-h-[60px] flex items-center justify-center">
                <p className="text-[0.9rem] font-bold absolute top-0">{data?.name}</p>
                <p className="text-[0.7rem] mt-2 leading-tight">{data?.position}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Management;
