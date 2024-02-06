import { useState, useEffect } from "react";
// import executiveImg from "@/assets/images/executive_img.png";
// import newsImg from "@/assets/images/news_img.png";
// import organisationLogo from "@/assets/images/records_logo.svg";
import Table from "@/components/tables";
import { useQuery } from "@tanstack/react-query";
import { orgRecord } from "@/services/organisationService";
import EmptyState from "@/components/EmptyState";
import useDebounce from "@/hooks/useDebounce";

interface ISearchValue {
  searchValue: string | undefined;
}

const Pending = ({ searchValue }: ISearchValue) => {
  const columns = [
    { field: "name", header: "Organisation Name" },
    { field: "recordSection", header: "Section" },
    { field: "request", header: "Requested By" },
    { field: "dateRequested", header: "Date Requested" },
  ];

  const DATASIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const search = searchValue ?? "";
  const debouncedSearchValue = useDebounce(search, 500);
  const [newData, setNewData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  const { data: queryData, isLoading } = useQuery(["recordOrg", currentPage, debouncedSearchValue], () =>
    orgRecord(currentPage, "pending", debouncedSearchValue),
  );

  useEffect(() => {
    setNewData(queryData?.data?.result);
    setDataCount(queryData?.data?.count);
  }, [queryData?.data?.count, queryData?.data?.result]);

  if (newData?.length === 0) {
    return <EmptyState title="No records yet" />;
  }

  return (
    <div>
      <div>
        <Table
          columns={columns}
          rowData={newData}
          name="orgAddRec"
          loading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          dataCount={dataCount}
          dataSize={DATASIZE}
        />
      </div>
    </div>
  );
};

export default Pending;
