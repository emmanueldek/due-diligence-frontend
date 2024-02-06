import React from "react";
import { Link } from "react-router-dom";
import { GrAttachment } from "react-icons/gr";
import { IoDocumentAttachSharp } from "react-icons/io5";
import EmptyState from "@/components/EmptyState";
import { formatDateString } from "@/utils/format";
interface IInsuranceProps {
  type?: string;
  coverageAmount?: string;
  coverageStatus?: string;
  expiryDate?: string;
  icDocuments?: string;
}

interface IDataInsurance {
  data: IInsuranceProps[];
}

type Column = {
  field: string;
  header: string;
};

const Insurance: React.FC<IDataInsurance> = ({ data }) => {
  const newData: IInsuranceProps[] = data ? data : [];

  const columns: Column[] = [
    { field: "type", header: "Type" },
    { field: "coverageAmount", header: "Coverage Amount" },
    { field: "coverageStatus", header: "Coverage Status" },
    { field: "expiryDate", header: "Expiry Date" },
    { field: "icDocuments", header: "" },
  ];

  if (data.length === 0) {
    return <EmptyState text="No insurance record yet" />;
  }

  return (
    <div>
      {data === undefined ? (
        <EmptyState title="No Records yet" />
      ) : (
        <>
          <div>
            <p className="font-[700] 2xl">Insurance Coverage</p>
            <hr className="border-grey-50 mt-2 mb-5" />
          </div>
          <table className="w-full">
            <thead>
              <tr className="h-[50px] px-8 rounded overflow-hidden bg-grey-50 w-full">
                {columns &&
                  columns.map((head, k) => (
                    <th key={k} className="px-2 text-left text-sm text-[#353740]">
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
                          {col.field === "icDocuments" ? (
                            <Link to={`${items[col.field]}`}>
                              <GrAttachment />
                            </Link>
                          ) : col.field === "expiryDate" ? (
                            <>{formatDateString(items[col.field] || "")}</>
                          ) : (
                            <>{items[col.field as keyof IInsuranceProps]}</>
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
                  <Link key={i} to={`${item.icDocuments}`}>
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

export default Insurance;
