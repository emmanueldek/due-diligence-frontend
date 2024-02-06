import { useState, useEffect } from "react";
import Table from "@/components/tables";
import { useQuery } from "@tanstack/react-query";
import { getExecSuggestions } from "@/services/executiveService";
import { Circles } from "react-loader-spinner";
import EmptyState from "@/components/EmptyState";
import useDebounce from "@/hooks/useDebounce";

interface ISearchValue {
  searchValue: string | undefined;
}

const Declined: React.FC<ISearchValue> = ({ searchValue }) => {
  const columns = [
    { field: "name", header: "Executive Name" },
    { field: "section", header: "Section" },
    { field: "request", header: "Requested By" },
    { field: "dateRequested", header: "Date Requested" },
  ];
  const DATASIZE = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [newData, setNewData] = useState();
  const [dataCount, setDataCount] = useState(20);
  const search = searchValue ?? "";
  const debouncedSearchValue = useDebounce(search, 500);

  const { data: querySuggest, isLoading } = useQuery(["orgSuggestDecline", currentPage, debouncedSearchValue], () =>
    getExecSuggestions(currentPage, "declined", debouncedSearchValue),
  );

  useEffect(() => {
    if (querySuggest?.data?.result && Object.keys(querySuggest?.data?.result).length > 0) {
      setNewData(querySuggest?.data?.result);
      console.log(querySuggest?.data?.result);
      setDataCount(querySuggest?.data?.count);
    }
  }, [querySuggest?.data?.count, querySuggest?.data?.result]);

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
          name="execSuggestDecline"
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
