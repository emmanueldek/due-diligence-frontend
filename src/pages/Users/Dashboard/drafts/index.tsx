import Table from "@/components/tables";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
// import { HiOutlineChevronDown } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { workspaceDrafts } from "@/services/workspaceService";
import useDebounce from "@/hooks/useDebounce";
import EmptyState from "@/components/EmptyState";

const SettingsDrafts: React.FC = () => {
  const columns = [
    { field: "name", header: "Name" },
    { field: "profileType", header: "Profile Type" },
    { field: "createdAt", header: "Date Created" },
    { field: "updatedAt", header: "Last Modified" },
    { field: "percentageCompleted", header: "Percentage Completed" },
  ];
  const DATASIZE = 10;
  const { id } = useParams();
  const userId = id || "";
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [newData, setNewData] = useState([]);
  const [dataCount, setDataCount] = useState(20);

  const { data: darftData, isLoading } = useQuery(["workspaceDraft", currentPage, userId, debouncedSearchValue], () =>
    workspaceDrafts(currentPage, userId, debouncedSearchValue),
  );
  useEffect(() => {
    console.log(darftData?.data?.result);
    setNewData(darftData?.data?.result);
    setDataCount(darftData?.data?.count);
  }, [darftData?.data?.count, darftData?.data?.result]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-2xl font-[700]">Your Drafts</p>
        <div className="flex items-center space-x-2">
          <div className="flex bg-grey-100 space-x-2 items-center rounded-md p-2">
            <CiSearch />
            <input
              type="text"
              className="bg-grey-100 active:outline-none text-[12px] focus:outline-none"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
          {/* <div className="flex border text-[12px] border-grey-100 space-x-2 items-center rounded-md p-2">
            All Drafts
            <HiOutlineChevronDown />
          </div> */}
        </div>
      </div>
      <hr className="border-grey-100 my-5" />
      <div>
        {newData?.length === 0 ? (
          <EmptyState title="No records yet" />
        ) : (
          <Table
            columns={columns}
            rowData={newData}
            name="workspaceDraft"
            loading={isLoading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            dataCount={dataCount}
            dataSize={DATASIZE}
          />
        )}
      </div>
    </div>
  );
};

export default SettingsDrafts;
