import { useState, useEffect } from "react";

import Table from "@/components/tables";
import { useQuery } from "@tanstack/react-query";
import { orgPendingRequest } from "@/services/organisationService";
import useDebounce from "@/hooks/useDebounce";
import EmptyState from "@/components/EmptyState";

interface ISearchValue {
  searchValue: string | undefined;
}

const Declined = ({ searchValue }: ISearchValue) => {
  const columns = [
    { field: "name", header: "Organisation Name" },
    { field: "request", header: "Requested By" },
    { field: "dateRequested", header: "Date Requested" },
  ];

  const DATASIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const search = searchValue ?? "";
  const debouncedSearchValue = useDebounce(search, 500);
  const [newData, setNewData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  const { data: queryData, isLoading } = useQuery(["profiledecline", currentPage, debouncedSearchValue], () =>
    orgPendingRequest(currentPage, "declined", debouncedSearchValue),
  );

  useEffect(() => {
    console.log(queryData?.data?.result);
    setNewData(queryData?.data?.result);
    setDataCount(queryData?.data?.count);
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
          name="orgNewProfileDecline"
          loading={isLoading}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          dataCount={dataCount}
          dataSize={DATASIZE}
        />
      </div>
      {/* )} */}
    </div>
  );
};

export default Declined;
