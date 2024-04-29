import React from "react";

import EmptyState from "@/components/EmptyState";
import { BACKEND_URL } from "@/utils/urls";

export interface ILegalProps {
  year?: string;
  filingStatus?: string;
  totalTaxLiability?: string;
  lgrDocuments: string[];
}

interface IDataLegalProps {
  data: ILegalProps[];
}
type Column = {
  field: string;
  header: string;
};

const Legal: React.FC<IDataLegalProps> = ({ data }) => {
  const newData: ILegalProps[] = data ? data : [];

  const columns: Column[] = [
    { field: "year", header: "Year" },
    { field: "fillingStatus", header: "Filing Status" },
    { field: "totalTaxLiability", header: "Litigation Description" },
    { field: "lgrDocuments", header: "" },
  ];

  const userAuth = JSON.parse(sessionStorage.getItem("token") as string);
  const token = userAuth.auth;

  const downloadPdf = async (fileName: string | undefined) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_NOMDEK_ADMIN_URL}${BACKEND_URL.VERSION.v1}${
          BACKEND_URL.RETRIEVEPDF
        }?fileName=${fileName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/pdf",
            Authorization: `Bearer ${token}`,
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

  return (
    <div>
      {newData.length === 0 ? (
        <EmptyState text="No Records yet" />
      ) : (
        <>
          <div>
            <p className="font-[700] 2xl">Legal</p>
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
                      <td
                        key={j}
                        className={`px-2 text-grey-500 py-2 ${col.field === "audFinancials" ? "text-[#144D98]" : ""}`}
                      >
                        {col.field === "lgrDocuments" ? (
                          <div className="flex flex-col justify-start gap-3">
                            {items.lgrDocuments &&
                              items.lgrDocuments.map((item: string, i: number) => {
                                return (
                                  <p
                                    className="text-xs text-[#0029FD] text-left cursor-pointer"
                                    onClick={() => downloadPdf(item)}
                                    key={i}
                                  >
                                    {item}
                                  </p>
                                );
                              })}
                          </div>
                        ) : (
                          // <Link to={`${items[col.field]}`}>
                          //   <GrAttachment />
                          // </Link>
                          <>{items[col.field as keyof ILegalProps]}</>
                        )}
                      </td>
                    );
                  })}
                  <hr />
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Legal;
