import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { orgSuggestion } from "@/services/organisationService";
import Table from "@/components/tables";
import EmptyState from "@/components/EmptyState";
import useDebounce from "@/hooks/useDebounce";

interface ISearchValue {
  searchValue: string | undefined;
}

const Pending: React.FC<ISearchValue> = ({ searchValue }) => {
  const columns = [
    { field: "name", header: "Organisation Name" },
    { field: "section", header: "Section" },
    { field: "request", header: "Requested By" },
    { field: "dateRequested", header: "Date Requested" },
  ];

  const DATASIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newData, setNewData] = useState([]);
  const [dataCount, setDataCount] = useState(0);
  const search = searchValue ?? "";
  const debouncedSearchValue = useDebounce(search, 500);

  const { data: queryData, isLoading } = useQuery(["orgSuggest", currentPage, debouncedSearchValue], () =>
    orgSuggestion(currentPage, "pending", debouncedSearchValue),
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
          name="orgSuggest"
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
