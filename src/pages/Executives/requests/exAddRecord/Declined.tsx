import { useState, useEffect } from "react";
import Table from "@/components/tables";
import { useQuery } from "@tanstack/react-query";
import { getExecRecords } from "@/services/executiveService";
import { Circles } from "react-loader-spinner";
import EmptyState from "@/components/EmptyState";
import useDebounce from "@/hooks/useDebounce";

interface ISearchValue {
  searchValue: string | undefined;
}

const Declined = ({ searchValue }: ISearchValue) => {
  const columns = [
    { field: "name", header: "Executive Name" },
    { field: "section", header: "Section" },
    { field: "request", header: "Requested By" },
    { field: "dateRequested", header: "Date Requested" },
  ];
  const DATASIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const search = searchValue ?? "";
  const debouncedSearchValue = useDebounce(search, 500);
  const [newData, setNewData] = useState();
  const [dataCount, setDataCount] = useState(0);

  const { data: queryRecords, isLoading } = useQuery(
    ["orgrecords", currentPage, "declined", debouncedSearchValue],
    () => getExecRecords(currentPage, "declined", debouncedSearchValue),
  );

  useEffect(() => {
    if (queryRecords?.data?.result && Object.keys(queryRecords?.data?.result).length > 0) {
      setNewData(queryRecords?.data?.result);
      console.log(queryRecords?.data?.result);
      setDataCount(queryRecords?.data?.count);
    }
  }, [queryRecords?.data?.count, queryRecords?.data?.result]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Circles color="#00000" width={40} />
      </div>
    );
  }

  if (newData === undefined) {
    return <EmptyState title="No records yet" />;
  }

  return (
    <div>
      <div>
        <Table
          columns={columns}
          rowData={newData}
          name="execAddRecDecline"
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

export default Declined;
