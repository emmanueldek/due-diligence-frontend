import React from "react";
import dangote from "@/assets/images/dangote.jpeg";
import useManagementView from "@/store/useManagementView";

interface IDataStructureProps {
  data: any;
}
const Management: React.FC<IDataStructureProps> = ({ data }) => {
  const { setIsShow, setManagementData } = useManagementView();
  return (
    <div>
      {" "}
      <p className="font-[700] 2xl">Managements</p>
      <hr className="border-grey-50 mt-2 mb-5" />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[2rem]">
        {data.map((data: any, index: number) => {
          return (
            <div
              className="relative h-[230px] flex items-center cursor-pointer flex-col gap-2"
              key={index}
              onClick={() => {
                setIsShow(true);
                setManagementData(data);
              }}
            >
              <div className="">
                <img src={data.imageUrl ? data.imageUrl : dangote} className="rounded-[5px] object-cover h-[160px]" />
              </div>

              <div className=" w-full text-center min-h-[60px] flex flex-col items-center justify-start">
                <p className="text-[0.9rem] font-bold leading-tight">{data?.name}</p>
                <p className="text-[0.65rem] mt-1 leading-tight">{data?.position}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Management;
