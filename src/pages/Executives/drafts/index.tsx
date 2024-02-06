import Table from "@/components/tables";
import { useNavigate } from "react-router";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
// import { BiFilterAlt } from "react-icons/bi";
import { Wrapper } from "@/components";
import { getExecDrafts } from "@/services/executiveService";
import { useQuery } from "@tanstack/react-query";
// import { Circles } from "react-loader-spinner";
import useDebounce from "@/hooks/useDebounce";
import EmptyState from "@/components/EmptyState";

const Drafts: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { field: "name", header: "Name" },
    { field: "organisation", header: "Organisation" },
    { field: "position", header: "Position" },
    { field: "createdAt", header: "Date Created" },
    { field: "updatedAt", header: "Last Modified" },
    { field: "percentageCompleted", header: "Profile Completed" },
    { field: "assignees", header: "Assignees" },
  ];
  const DATASIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [newData, setNewData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  const { data: queryDraft, isLoading } = useQuery(["execDraft", currentPage, debouncedSearchValue], () =>
    getExecDrafts(currentPage, "draft", debouncedSearchValue),
  );

  useEffect(() => {
    if (queryDraft?.data?.result && Object.keys(queryDraft?.data?.result).length > 0) {
      setNewData(queryDraft?.data?.result);
      setDataCount(queryDraft?.data?.count);
    }
  }, [queryDraft?.data?.count, queryDraft?.data?.result]);

  return (
    <Wrapper className="bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-[700]">Drafts</p>
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
          {/* <div className="flex border text-[12px] border-grey-100 space-x-1 items-center rounded-md p-2">
            <BiFilterAlt />
            <span>Filter</span>
          </div> */}
          <div
            className="flex border text-[12px] bg-grey-900 space-x-2 items-center text-white rounded-md p-2 cursor-pointer hover:bg-grey-100 hover:text-grey-900 hover:border-none"
            onClick={() => navigate("/executives/create")}
          >
            <AiOutlinePlus />
            <span>New Executives</span>
          </div>
        </div>
      </div>
      <hr className="border-grey-100 my-5" />
      <div>
        {newData === undefined || newData?.length === 0 ? (
          <EmptyState title="No records yet" />
        ) : (
          <Table
            columns={columns}
            rowData={newData}
            name="execDrafts"
            loading={isLoading}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            dataCount={dataCount}
            dataSize={DATASIZE}
          />
        )}
      </div>
    </Wrapper>
  );
};

export default Drafts;
