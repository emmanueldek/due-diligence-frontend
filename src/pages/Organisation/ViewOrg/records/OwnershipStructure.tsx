import React from "react";

interface IDataStructureProps {
  data: any;
}

const OwnershipStructure: React.FC<IDataStructureProps> = ({ data }) => {
  console.log(data);
  return (
    <div>
      <p className="font-[700] 2xl">Ownership Structure</p>
      <hr className="border-grey-50 mt-2 mb-5" />

      <p className="font-[500] text-[1rem]">Ownership Type</p>
      <p className="text-[0.85rem] font-light">{data?.ownershipType}</p>

      <p className="font-[500] text-[1rem] mt-5">Shareholders</p>
      <ul>
        {data &&
          data?.shareHolders &&
          data?.shareHolders.map((item: any, index: number) => {
            return (
              <li key={index} className="text-[0.85rem] font-light list-disc flex items-center gap-[1rem] my-1">
                <p>{item?.name} :</p>
                <p>{item?.percentage}%</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default OwnershipStructure;
