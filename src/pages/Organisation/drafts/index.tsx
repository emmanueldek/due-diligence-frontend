import Table from "@/components/tables";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
// import { BiFilterAlt } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { getOrgDrafts } from "@/services/organisationService";
import { Wrapper } from "@/components";
import { useNavigate } from "react-router";
import useDebounce from "@/hooks/useDebounce";
import EmptyState from "@/components/EmptyState";

const Drafts: React.FC = () => {
  const navigate = useNavigate();
  const columns = [
    { field: "organizationName", header: "Organisation Name" },
    { field: "createdAt", header: "Date Created" },
    { field: "updatedAt", header: "Last Modified" },
    { field: "completionPercentage", header: "Profile Completed" },
    { field: "assignees", header: "Assignees" },
  ];

  const DATASIZE = 10;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [newData, setNewData] = useState([]);
  const [dataCount, setDataCount] = useState(0);

  const { data: queryDraft, isLoading } = useQuery(["orgDraft", currentPage, debouncedSearchValue], () =>
    getOrgDrafts(currentPage, "draft", debouncedSearchValue),
  );

  useEffect(() => {
    setNewData(queryDraft?.data?.result);
    setDataCount(queryDraft?.data?.count);
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
            onClick={() => navigate("/organisation/create")}
          >
            <AiOutlinePlus />
            <span>New Organisation</span>
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
            name="orgDraft"
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
