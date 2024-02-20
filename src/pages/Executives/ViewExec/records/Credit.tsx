import React from "react";
import { Link } from "react-router-dom";
import { GrAttachment } from "react-icons/gr";
import { IoDocumentAttachSharp } from "react-icons/io5";
import EmptyState from "@/components/EmptyState";
import { formatDateString } from "@/utils/format";

interface ICreditHistoryProps {
  type?: string;
  date?: string;
  assetsLiquidated?: string;
  debtsDischarged?: string;
  crdDocuments?: string;
}
interface ICredit {
  data: ICreditHistoryProps[];
}

type Column = {
  field: string;
  header: string;
};

const Credit: React.FC<ICredit> = ({ data }) => {
  const newData: ICreditHistoryProps[] = data ? data : [];

  const columns: Column[] = [
    { field: "type", header: "Type" },
    { field: "date", header: "Date" },
    { field: "assetsLiquidated", header: "Assets Liquidated" },
    { field: "debtsDischarged", header: "Debts Discharged" },
    { field: "crdDocuments", header: "" },
  ];

  return (
    <div>
      {data.length === 0 ? (
        <EmptyState text="No Records yet" />
      ) : (
        <>
          <div>
            <p className="font-[700] 2xl">Credit History</p>
            <hr className="border-grey-50 mt-2 mb-5" />
          </div>
          <table className="w-full">
            <thead>
              <tr className="h-[50px] px-8 rounded overflow-hidden bg-grey-50 w-full">
                {columns &&
                  columns.map((head, i) => (
                    <th key={i} className="px-2 text-left text-sm text-[#353740]">
                      {head.header}{" "}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody className="divide divide-y divide-grey-50">
              {newData?.map((items, i) => (
                <tr key={i} className="">
                  {columns.map((col: Column, j) => {
                    return (
                      <>
                        <td
                          key={j}
                          className={`px-2 text-grey-500 py-2 ${col.field === "audFinancials" ? "text-[#144D98]" : ""}`}
                        >
                          {col.field === "crdDocuments" ? (
                            <Link to={`${items[col.field]}`}>
                              <GrAttachment />
                            </Link>
                          ) : col.field === "date" ? (
                            <>{formatDateString(items[col.field] || "")}</>
                          ) : (
                            <>{items[col.field as keyof ICreditHistoryProps]}</>
                          )}
                        </td>
                      </>
                    );
                  })}
                  <hr />
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <div>
              <p className="font-[700] 2xl mt-5">Documents</p>
              <hr className="border-grey-50 mt-2 mb-5" />
            </div>
            <div className="grid grid-cols-2 gap-5">
              {newData?.map((item, i) => {
                return (
                  <Link key={i} to={`${item.crdDocuments}`}>
                    <div className="bg-grey-100 rounded-xl w-full h-[128px] flex items-center justify-center">
                      <IoDocumentAttachSharp size={40} color="#808080" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Credit;
