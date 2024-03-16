import React from "react";
import { GrAttachment } from "react-icons/gr";
import { IoDocumentAttachSharp } from "react-icons/io5";
import EmptyState from "@/components/EmptyState";
import { BACKEND_URL } from "@/utils/urls";
import { getToken } from "@/helpers/authHelpers";

export interface ITaxProps {
  year?: string;
  fillingStatus?: string;
  totalTaxLiability?: string;
  tcDocuments?: any;
}
interface IDataTaxProps {
  data: ITaxProps[];
}

const Tax: React.FC<IDataTaxProps> = ({ data }) => {
  const newData: ITaxProps[] = data;

  const authToken = getToken()?.auth;

  const downloadPdf = async (fileName: string | undefined) => {
    try {
      const response = await fetch(
        `${BACKEND_URL.baseURL}${BACKEND_URL.VERSION.v1}${BACKEND_URL.RETRIEVEPDF}?fileName=${fileName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      const data = await response.blob();
      const hrefUrl = URL.createObjectURL(data);
      window.open(hrefUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { field: "year", header: "Year" },
    { field: "fillingStatus", header: "Filing Status" },
    { field: "totalTaxLiability", header: "Total tax liability" },
    { field: "tcDocuments", header: "" },
  ];

  return (
    <div>
      {newData.length === 0 ? (
        <EmptyState text="No Records yet" />
      ) : (
        <>
          <div>
            <p className="font-[700] 2xl">Tax Compliance</p>
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
                  {columns.map((col, j) => {
                    return (
                      <>
                        <td
                          key={j}
                          className={`px-2 text-grey-500 py-2 ${col.field === "audFinancials" ? "text-[#144D98]" : ""}`}
                        >
                          {col.field === "tcDocuments" ? <GrAttachment /> : <>{items[col.field as keyof ITaxProps]}</>}
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
              {newData.map((item, i) => {
                return (
                  <span key={i}>
                    {item.tcDocuments && item.tcDocuments?.length > 0 ? (
                      <button
                        onClick={() => {
                          downloadPdf(item.tcDocuments);
                        }}
                      >
                        <div className="bg-grey-100 rounded-xl w-full h-[128px] flex items-center justify-center">
                          <IoDocumentAttachSharp size={40} color="#808080" />
                        </div>
                      </button>
                    ) : null}
                  </span>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Tax;
