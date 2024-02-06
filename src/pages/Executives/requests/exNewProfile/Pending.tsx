import { useState, useEffect } from "react";
import Table from "@/components/tables";
import { useQuery } from "@tanstack/react-query";
import { execPendingRequest } from "@/services/executiveService";
import useDebounce from "@/hooks/useDebounce";
import EmptyState from "@/components/EmptyState";

interface ISearchValue {
  searchValue: string | undefined;
}

const Pending = ({ searchValue }: ISearchValue) => {
  const columns = [
    { field: "name", header: "Executive Name" },
    { field: "position", header: "Position" },
    { field: "request", header: "Requested By" },
    { field: "dateRequested", header: "Date Requested" },
  ];
  const DATASIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const search = searchValue ?? "";
  const debouncedSearchValue = useDebounce(search, 500);
  const [newData, setNewData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  const { data: queryData, isLoading } = useQuery(["execPending", currentPage, debouncedSearchValue], () =>
    execPendingRequest(currentPage, "pending", debouncedSearchValue),
  );

  useEffect(() => {
    if (queryData?.data?.result && Object.keys(queryData.data?.result).length > 0) {
      console.log({ data: queryData?.data?.result, count: queryData?.data?.count });
      setNewData(queryData?.data?.result);
      setDataCount(queryData?.data?.count);
    }
  }, [queryData?.data?.count, queryData?.data?.result]);

  if (newData === undefined || newData?.length === 0) {
    return <EmptyState title="No records yet" />;
  }

  return (
    <div>
      <div>
        <Table
          columns={columns}
          rowData={newData}
          name="execNew"
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
