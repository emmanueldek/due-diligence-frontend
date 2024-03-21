import React from "react";

interface IDataStructureProps {
  data: any;
}

const OwnershipStructure: React.FC<IDataStructureProps> = ({ data }) => {
  console.log(data);
  const columns = [
    { field: "name", header: "Name" },
    { field: "percentage", header: "Percentage (%)" },
  ];
  return (
    <div>
      <p className="font-[700] 2xl">Ownership Structure</p>
      <hr className="border-grey-50 mt-2 mb-5" />

      <p className="font-[500] text-[1rem]">Ownership Type</p>
      <p className="text-[0.85rem] font-light">{data?.ownershipType}</p>

      <p className="font-[500] text-[1rem] mt-5">Shareholders</p>
      {/* <ul>
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
      </ul> */}
      <table className="w-full">
        <thead className="text-sm text-grey-400 font-normal bg-grey-50">
          <tr className=" h-[45px] px-7 text-left">
            {columns &&
              columns.map((head, i) => (
                <th key={i} className="pl-4">
                  {head.header}{" "}
                </th>
              ))}
          </tr>
        </thead>
        <tbody className="w-full">
          {data &&
            data.shareHolders?.map((row: any, i: number) => (
              <tr key={i} className="h-[40px] text-sm text-[#151515] font-[500]">
                {columns?.map((col: any, i) => (
                  <td key={i} className="pl-4 font-light text-textGrey">
                    {row[col.field as keyof any]}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default OwnershipStructure;
