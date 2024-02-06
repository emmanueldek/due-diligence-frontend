import React, { useState, useCallback, useRef, useEffect } from "react";
import { GoOrganization, GoPeople } from "react-icons/go";
import ProgressBar from "../ProgressBar";
import { FiMoreVertical } from "react-icons/fi";
import DeleteModal from "./DeleteModal";
import { useNavigate } from "react-router-dom";
import Pagination from "../pagination";
// import Skeleton from "react-loading-skeleton";
import RejectModal from "../modal/RejectModal";

interface IColumnProps {
  field: string;
  header: string;
}

interface IRowProps {
  _id?: string | undefined;
  name?: string;
  profileType?: string;
  organizationName?: string;
  organizationId?: string;
  executiveName?: string;
  executiveId?: string;
  execOrgDocId?: string;
  requesterPosition?: string;
  executivePosition?: string;
  recordSection?: string;
  recDocId?: string;
  position?: string;
  createdAt?: string;
  updatedAt?: string;
  sugDocId?: string;
  completionPercentage?: string;
  img?: string;
  assignees?: string[];
  requestedBy?: string;
  dateRequested?: string;
  requestImg?: string;
  section?: string;
  role?: string;
  status?: string;
  email?: string;
}

interface ItableDataProps {
  columns?: IColumnProps[];
  rowData?: IRowProps[];
  name?: string;
  loading: boolean;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  dataCount: number;
  dataSize: number;
}

interface IDataProps {
  data: IRowProps[];
  id?: string | number;
  index: number;
  link: string;
}
type MouseEventCallback = (e: MouseEvent) => void;

const Table: React.FC<ItableDataProps> = ({
  columns,
  rowData,
  name,
  loading,
  currentPage,
  setCurrentPage,
  dataCount,
  dataSize,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<number | null | boolean>(null);
  const [openModal, setOpenModal] = useState("");
  const [openRequestModal, setOpenRequestModal] = useState("");
  const [decline, setDecline] = useState("");
  const [reqFlag, setReqFlag] = useState("");
  const [profileIds, setProfileIds] = useState("");
  const [nameId, setNameId] = useState("");
  const [queryKeyData, setQueryKeyData] = useState("");
  const [queryKeyDecline, setQueryKeyDecline] = useState("");
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleModal = (id: number | null) => {
    setOpen(id);
  };

  const closeDropdown: MouseEventCallback = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setOpen(null);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [closeDropdown]);

  function formatDateString(inputDate: string) {
    const dateObject = new Date(inputDate);
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    const year = dateObject.getFullYear();
    return `${month}/${day}/${year}`;
  }

  const deleteItem = ({ id, profileId, queryKey }: { id: string; profileId?: string; queryKey?: string }) => {
    setOpenModal(openModal === id ? "" : id);
    if (profileId) {
      setProfileIds(profileId);
      setQueryKeyData(queryKey || "");
      setNameId(id);
    }
  };

  const deleteRequest = ({ id, queryKey }: { id: string; queryKey: string }) => {
    setOpenRequestModal(openModal === id ? "" : id);
    setQueryKeyData(queryKey);
  };
  const handleClose = () => {
    setOpenModal("");
    setOpenRequestModal("");
    setDecline("");
  };
  const handleOpen = ({ data, id, index, link }: IDataProps) => {
    const singleData = data[index];
    navigate(`${link}/${id ? id : index}`, { state: singleData });
  };

  const handleDecline = ({ id, flag, queryKey }: { id: string; flag: string; queryKey: string }) => {
    setDecline(id);
    setReqFlag(flag);
    setQueryKeyDecline(queryKey);
  };

  return (
    <div>
      <table className="w-[100%] mb-4 ">
        <thead className="h-[50px] text-s border-grey-100 border-b-[1px] ">
          <tr className="h-[50px]  rounded-[2px] overflow-hidden">
            {columns &&
              columns.map((head, i) => (
                <th key={i} className="px-2 text-left text-sm text-[#353740]">
                  {head.header}{" "}
                </th>
              ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            [1, 2, 3, 4, 5].map((_, index) => (
              <tr key={index}>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-left md:px-6 ">
                  <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-left hidden md:px-6 lg:table-cell">
                  <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-left hidden sm:table-cell md:px-6 ">
                  <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm "></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-left  hidden sm:table-cell md:px-6 ">
                  <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                </td>
                <td className="px-3 py-4 whitespace-nowrap text-sm text-left md:px-6 ">
                  <div className="bg-grey-50 w-full h-8 animate-pulse rounded-sm"></div>
                </td>
              </tr>
            ))
          ) : (
            <>
              {rowData &&
                rowData.map((row, i) => (
                  <tr
                    key={i}
                    className="h-[50px] border-b-[1px] text-sm text-[#404040] border-grey-100 font-[500]  rounded-[2px] "
                  >
                    {row.name && (
                      <td>
                        <span className="flex items-center space-x-2 font-[600]">
                          {row.img ? (
                            <span className="rounded-full overflow-hidden font-[600]">
                              <img src={row.img} alt="" className="w-[24px] h-[24px] object-cover" />
                            </span>
                          ) : (
                            <span className="text-black text-xs bg-[#f59e0b] w-[24px] h-[24px] flex items-center justify-center font-[600] text-white rounded-full">
                              {row.name.charAt(0)}
                            </span>
                          )}
                          <p>{row.name.slice(0, 20)}...</p>
                        </span>
                      </td>
                    )}
                    {row.executiveName && (
                      <>
                        {name === "workspaceDraft" ? (
                          ""
                        ) : (
                          <td
                            className="cursor-pointer"
                            onClick={() => {
                              navigate(
                                `${
                                  name === "exec" || name === "execDrafts"
                                    ? `/executives/view/${rowData[i].executiveId}`
                                    : name === "execNew"
                                    ? `/executives/request/profile/${row._id}`
                                    : name === "execAddRec"
                                    ? `/executives/request/record/${row._id}`
                                    : name === "dashExec"
                                    ? `/executives/view/${row.executiveId}`
                                    : name === "execSuggest"
                                    ? `/executives/request/suggestion/${row._id}`
                                    : ``
                                }`,
                                {
                                  state:
                                    name === "execNew"
                                      ? rowData[i]
                                      : name === "execSuggest"
                                      ? rowData[i]
                                      : name === "execAddRec"
                                      ? rowData[i]
                                      : "",
                                },
                              );
                            }}
                          >
                            <span className="flex items-center space-x-2 text-[#1B59AC]">
                              {row.img ? (
                                <span className="rounded-full overflow-hidden font-[600]">
                                  <img src={row.img} alt="" className="w-[24px] h-[24px] object-cover" />
                                </span>
                              ) : (
                                <span className="text-black text-xs bg-[#f59e0b] w-[24px] h-[24px] flex items-center justify-center font-[600] text-white rounded-full">
                                  {row.executiveName.charAt(0)}
                                </span>
                              )}
                              <p>{row.executiveName}</p>
                            </span>
                          </td>
                        )}
                      </>
                    )}
                    {row.organizationName && (
                      <td
                        onClick={() => {
                          navigate(
                            `${
                              name === "org" || name === "orgDraft"
                                ? `/organisation/view/${rowData[i].organizationId}`
                                : name === "orgNewProfile"
                                ? `/organisation/request/profile/${row._id}`
                                : name === "orgAddRec"
                                ? `/organisation/request/record/${row._id}`
                                : name === "orgSuggest"
                                ? `/organisation/request/suggestion/${row._id}`
                                : name === "dashOrg"
                                ? `/organisation/view/${row.organizationId}`
                                : name === "workspaceDraft"
                                ? `/${
                                    row.profileType === "organization"
                                      ? `organisation/view/${row.organizationId}`
                                      : `${`executives/view/${row.executiveId}`}`
                                  }`
                                : ""
                            }`,
                            {
                              state:
                                name === "orgNewProfile"
                                  ? rowData[i]
                                  : name === "orgSuggest"
                                  ? rowData[i]
                                  : name === "orgAddRec"
                                  ? rowData[i]
                                  : "",
                            },
                          );
                        }}
                        className="cursor-pointer"
                      >
                        <span
                          className={`flex items-center space-x-2 ${
                            name !== "exec" && name !== "execDrafts" ? "text-[#1B59AC]" : ""
                          }`}
                        >
                          {row.img ? (
                            <span className="rounded-full overflow-hidden font-[600]">
                              <img src={row.img} alt="" className="w-[24px] h-[24px] object-cover" />
                            </span>
                          ) : (
                            <span className="text-black text-xs bg-[#f59e0b] w-[24px] h-[24px] flex items-center justify-center font-[600] text-white rounded-full">
                              {row.organizationName.charAt(0)}
                            </span>
                          )}
                          <p>{row.organizationName}</p>
                        </span>
                      </td>
                    )}
                    {row.role && (
                      <td>
                        <span className="flex items-center space-x-2">
                          <p>{row.role}</p>
                        </span>
                      </td>
                    )}
                    {row.executivePosition && (
                      <td>
                        <span className="flex items-center space-x-2">
                          <p>{row.executivePosition}</p>
                        </span>
                      </td>
                    )}
                    {row.requesterPosition && (
                      <td>
                        <span className="flex items-center space-x-2">
                          <p>{row.requesterPosition}</p>
                        </span>
                      </td>
                    )}
                    {row.email && (
                      <td>
                        <span className="flex items-center space-x-2 ">
                          <p>{row.email}</p>
                        </span>
                      </td>
                    )}
                    {row.status && (
                      <td>
                        <span className={`${row.status === "pending" && "text-red-500"} flex items-center space-x-2`}>
                          <p>{row.status}</p>
                        </span>
                      </td>
                    )}
                    {row.position && (
                      <td>
                        <span className="flex items-center space-x-2">
                          <p>{row.position}</p>
                        </span>
                      </td>
                    )}
                    {row.section && (
                      <td>
                        <span className="flex items-center space-x-2">
                          <p>{row.section}</p>
                        </span>
                      </td>
                    )}
                    {row.profileType && (
                      <td>
                        <span className="flex items-center pl-2 space-x-2">
                          <span className="">
                            {row.profileType === "organization" ? <GoOrganization /> : <GoPeople />}
                          </span>
                          <p>{row.profileType}</p>
                        </span>
                      </td>
                    )}
                    {row.recordSection && (
                      <td>
                        <span className="flex items-center space-x-2">
                          <p>{row.recordSection}</p>
                        </span>
                      </td>
                    )}
                    {row.requestedBy && (
                      <td>
                        <span className="flex w-full items-center space-x-2 font-[600]">
                          {row.requestImg ? (
                            <span className={`rounded-full overflow-hidden font-[600]`}>
                              <img src={row.requestImg} alt="" className="w-[24px] h-[24px] object-cover" />
                            </span>
                          ) : (
                            <span className="text-black text-xs bg-[#f59e0b] w-[24px] h-[24px] flex items-center justify-center font-[600] text-white rounded-full">
                              {row.requestedBy.charAt(0)}
                            </span>
                          )}
                          <span>{row.requestedBy}</span>
                        </span>
                      </td>
                    )}
                    {row.createdAt && <td className="space-x-2">{formatDateString(row.createdAt)}</td>}
                    {row.updatedAt && <td className="space-x-2">{formatDateString(row.updatedAt)}</td>}
                    {row.completionPercentage && (
                      <td>
                        <span className="flex items-center space-x-2 w-[80%]">
                          <ProgressBar percent={row.completionPercentage} />
                          <p>{row.completionPercentage}%</p>
                        </span>
                      </td>
                    )}
                    {row.assignees && (
                      <td>
                        <span className="flex w-full pl-4">
                          {row.assignees?.map((el, i) => {
                            return (
                              <div key={i} className="ml-[-10px] overflow-hidden rounded-full">
                                <img src={el} alt="" className={`w-[24px] h-[24px] object-cover`} />
                              </div>
                            );
                          })}
                        </span>
                      </td>
                    )}
                    {row.dateRequested && <td className="space-x-2">{row.dateRequested}</td>}
                    <td className="relative" onClick={() => handleModal(i)}>
                      <span className="flex justify-center cursor-pointer">
                        <FiMoreVertical />
                      </span>

                      {name === "settings" && open === i ? (
                        <div className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer">
                          <span className="text-[12px] space-y-2">
                            <p>Make Member</p>
                            <hr className="border-grey-100" />
                            <p onClick={() => deleteItem({ id: name })}>Remove User</p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "orgDraft" && open === i ? (
                        <div
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                          ref={menuRef}
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/organisation/view/${rowData[i].organizationId}`)}>
                              View Profile
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                navigate(`/organisation/create/${rowData[i].organizationId}`, {
                                  state: rowData[i].execOrgDocId,
                                })
                              }
                            >
                              Edit Profile
                            </p>
                            {/* <hr className="border-grey-100" /> */}
                            {/* <p
                              onClick={() =>
                                deleteItem({ id: name, profileId: rowData[i].organizationId, queryKey: "orgDraft" })
                              }
                            >
                              Delete Profile
                            </p> */}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "org" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/organisation/view/${rowData[i].organizationId}`)}>
                              View Profile
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                navigate(`/organisation/create/${rowData[i].organizationId}`, {
                                  state: rowData[i].execOrgDocId,
                                })
                              }
                            >
                              Edit Profile
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                deleteItem({ id: name, profileId: rowData[i].organizationId, queryKey: "orgHome" })
                              }
                            >
                              Delete Profile
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "orgAddRec" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                handleOpen({
                                  data: rowData,
                                  id: row._id,
                                  index: i,
                                  link: "/organisation/request/record",
                                })
                              }
                            >
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                handleDecline({
                                  id: rowData[i].recDocId || "",
                                  flag: "add_record",
                                  queryKey: "recordOrg",
                                })
                              }
                            >
                              Decline Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "orgAddRecDecline" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                handleOpen({
                                  data: rowData,
                                  id: row._id,
                                  index: i,
                                  link: "/organisation/request/record",
                                })
                              }
                            >
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p onClick={() => deleteRequest({ id: rowData[i]._id || "", queryKey: "recDecline" })}>
                              Delete Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "orgNewProfile" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                handleOpen({
                                  data: rowData,
                                  id: row._id,
                                  index: i,
                                  link: "/organisation/request/profile",
                                })
                              }
                            >
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                handleDecline({
                                  id: rowData[i].execOrgDocId || "",
                                  flag: "org_exec",
                                  queryKey: "orgProfile",
                                })
                              }
                            >
                              Decline Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "orgNewProfileDecline" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                handleOpen({
                                  data: rowData,
                                  id: row._id,
                                  index: i,
                                  link: "/organisation/request/profile",
                                })
                              }
                            >
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p onClick={() => deleteRequest({ id: rowData[i]._id || "", queryKey: "profiledecline" })}>
                              Delete Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "orgSuggest" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                handleOpen({
                                  data: rowData,
                                  id: row._id,
                                  index: i,
                                  link: "/organisation/request/suggestion",
                                })
                              }
                            >
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                handleDecline({
                                  id: rowData[i].sugDocId || "",
                                  flag: "suggestion",
                                  queryKey: "orgSuggest",
                                })
                              }
                            >
                              Decline Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "orgSuggestDecline" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                handleOpen({
                                  data: rowData,
                                  id: row._id,
                                  index: i,
                                  link: "/organisation/request/suggestion",
                                })
                              }
                            >
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() => deleteRequest({ id: rowData[i]._id || "", queryKey: "orgSuggestdecline" })}
                            >
                              Delete Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "exec" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/executives/view/${rowData[i].executiveId}`)}>View Profile</p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                navigate(`/executives/create/${rowData[i].executiveId}`, {
                                  state: rowData[i].execOrgDocId,
                                })
                              }
                            >
                              Edit Profile
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                deleteItem({ id: name, profileId: rowData[i].executiveId, queryKey: "execHome" })
                              }
                            >
                              Delete Profile
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "execDrafts" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/executives/view/${rowData[i].executiveId}`)}>View Profile</p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                navigate(`/executives/create/${rowData[i].executiveId}`, { state: rowData[i] })
                              }
                            >
                              Edit Profile
                            </p>
                            {/* <hr className="border-grey-100" /> */}
                            {/* <p
                              onClick={() =>
                                deleteItem({ id: name, profileId: rowData[i].executiveId, queryKey: "orgDraft" })
                              }
                            >
                              Delete Profile
                            </p> */}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "execAddRec" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/executives/request/record/${rowData[i]._id}`)}>Open Request</p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                handleDecline({
                                  id: rowData[i].recDocId || "",
                                  flag: "add_record",
                                  queryKey: "orgrecords",
                                })
                              }
                            >
                              Decline Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "execAddRecDecline" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/executives/request/record/${rowData[i]._id}`)}>Open Request</p>
                            <hr className="border-grey-100" />
                            <p onClick={() => deleteRequest({ id: rowData[i]._id || "", queryKey: "orgrecords" })}>
                              Delete Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "execNew" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                handleOpen({
                                  data: rowData,
                                  id: row?._id,
                                  index: i,
                                  link: `/executives/request/profile`,
                                })
                              }
                            >
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                handleDecline({
                                  id: rowData[i].execOrgDocId || "",
                                  flag: "org_exec",
                                  queryKey: "execPending",
                                })
                              }
                            >
                              Decline Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "execNewDecline" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                handleOpen({
                                  data: rowData,
                                  id: row?._id,
                                  index: i,
                                  link: `/executives/request/profile`,
                                })
                              }
                            >
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p onClick={() => deleteRequest({ id: rowData[i]._id || "", queryKey: "execDeclined" })}>
                              Delete Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "execSuggest" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/executives/request/suggestion/${rowData[i]._id}`)}>
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                handleDecline({
                                  id: rowData[i].sugDocId || "",
                                  flag: "suggestion",
                                  queryKey: "execOrgSuggest",
                                })
                              }
                            >
                              Decline Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "execSuggestDecline" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/executives/request/suggestion/${rowData[i]._id}`)}>
                              Open Request
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() => deleteRequest({ id: rowData[i]._id || "", queryKey: "orgSuggestDecline" })}
                            >
                              Delete Request
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "dashDraft" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                navigate(
                                  `/${rowData[i].profileType === "organization" ? "organisation" : "executives"}/view/${
                                    rowData[i]._id
                                  }`,
                                )
                              }
                            >
                              View Profile
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                navigate(
                                  `/${
                                    rowData[i].profileType === "organization" ? "organisation" : "executives"
                                  }/create/${rowData[i]._id}`,
                                )
                              }
                            >
                              Edit Profile
                            </p>
                            {/* <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                console.log({
                                  id: rowData[i].profileType === "organization" ? "org" : "exec",
                                  profileId: rowData[i].profileType === "organization" ? rowData[i]._id : rowData[i],
                                  queryKey: "dashDraft",
                                })
                              }
                            >
                              Delete Profile
                            </p> */}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "workspaceDraft" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p
                              onClick={() =>
                                navigate(
                                  `/${
                                    rowData[i].profileType === "organization"
                                      ? `organisation/view/${row.organizationId}`
                                      : `executives/view/${row.executiveId}`
                                  }`,
                                )
                              }
                            >
                              View Profile
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                navigate(
                                  `/${
                                    rowData[i].profileType === "organization" ? "organisation" : "executives"
                                  }/create/${rowData[i]._id}`,
                                )
                              }
                            >
                              Edit Profile
                            </p>
                            {/* <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                console.log({
                                  id: rowData[i].profileType === "organization" ? "org" : "exec",
                                  profileId: rowData[i],
                                  queryKey: "dashDraft",
                                })
                              }
                            >
                              Delete Profile
                            </p> */}
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "dashExec" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/executives/view/${rowData[i].executiveId}`)}>View Profile</p>
                            <hr className="border-grey-100" />
                            <p onClick={() => navigate(`/executives/create/${rowData[i].executiveId}`)}>Edit Profile</p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                deleteItem({ id: "exec", profileId: rowData[i].executiveId, queryKey: "dashExec" })
                              }
                            >
                              Delete Profile
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                      {name === "dashOrg" && open === i ? (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-4 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] space-y-2">
                            <p onClick={() => navigate(`/organisation/view/${rowData[i].organizationId}`)}>
                              View Profile
                            </p>
                            <hr className="border-grey-100" />
                            <p onClick={() => navigate(`/organisation/create/${rowData[i].organizationId}`)}>
                              Edit Profile
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() =>
                                deleteItem({ id: "org", profileId: rowData[i].organizationId, queryKey: "dashOrg" })
                              }
                            >
                              Delete Profile
                            </p>
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </td>
                    {openModal !== "" && (
                      <DeleteModal
                        title={`${openModal === "settings" ? "Remove User" : "Delete Profile"}`}
                        body={`${
                          openModal === "Settings"
                            ? "Are you sure you want to remove this user from this workspace?"
                            : "Are you sure you want to delete this profile? It cannot be reversed."
                        }`}
                        queryKey={queryKeyData}
                        id={profileIds}
                        name={nameId}
                        onClose={handleClose}
                      />
                    )}
                    {openRequestModal !== "" && (
                      <DeleteModal
                        id={openRequestModal}
                        title="Delete Request"
                        body="Are you sure you want to delete this request"
                        flag="declineRequest"
                        queryKey={queryKeyData}
                        onClose={handleClose}
                      />
                    )}
                    {decline && (
                      <RejectModal
                        title="Reject Suggestion"
                        body="Are you sure you want to reject this suggestion? You can revisit it later."
                        onClose={handleClose}
                        buttonTitle="Reject"
                        requestId={decline}
                        queryKey={queryKeyDecline}
                        flag={reqFlag}
                      />
                    )}
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
      <div className="flex justify-center items-center my-8">
        <Pagination
          onPageChange={(page) => setCurrentPage(page)}
          currentPage={currentPage}
          dataCount={dataCount}
          dataSize={dataSize}
          siblingCount={1}
        />
      </div>
    </div>
  );
};

export default Table;
