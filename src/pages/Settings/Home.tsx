import React, { useCallback, useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
// import { HiOutlineChevronDown } from "react-icons/hi";
import { Wrapper } from "@/components";
import InviteModal from "./InviteModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllWorkspaceMembers, makeAdmin, makeMember, removeMember } from "@/services/workspaceService";
import Skeleton from "react-loading-skeleton";
import Pagination from "@/components/pagination";
import { FiMoreVertical } from "react-icons/fi";
import useDebounce from "@/hooks/useDebounce";
import { Toast } from "@/config/toast";
import { useNavigate } from "react-router-dom";
import useUser from "@/store/useUser";

interface IWorkspaceRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  role: string;
  status: string;
  adminId: string;
}
type MouseEventCallback = (e: MouseEvent) => void;

const Home: React.FC = () => {
  const columns = [
    { field: "name", header: "Full name" },
    { field: "role", header: "Role" },
    { field: "email", header: "Email Address" },
    { field: "status", header: "Status" },
  ];

  const DATASIZE = 10;
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [modalOpen, setModalOpen] = useState<{ [key: number]: boolean }>({});
  const menuRef = useRef<HTMLDivElement | null>(null);
  // const [data, setData] = useState<TUserResponseSchema>();
  const [dataCount] = useState(0);

  console.log(user);

  const navigate = useNavigate();

  const [open, setOpen] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const handleTableModalOpen = (rowIndex: number) => {
    setModalOpen((prevState) => ({
      ...prevState,
      [rowIndex]: true,
    }));
  };

  const handleClick = (id: number) => {
    setOpen(open === id ? null : id);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const closeDropdown: MouseEventCallback = useCallback((e) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setModalOpen({});
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", closeDropdown);
    return () => {
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, [closeDropdown]);
  const { data: workspaceData, isLoading } = useQuery({
    queryKey: ["workspace", currentPage, debouncedSearchValue],
    queryFn: () => getAllWorkspaceMembers(currentPage, debouncedSearchValue),
  });
  const { mutate: deleteMember } = useMutation(removeMember, {
    onSuccess: (data) => {
      setModalOpen({});
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      Toast.success(data?.message);
    },
    onError: () => {
      Toast.error(`cannot delete member`);
    },
  });
  const { mutate: changeRole } = useMutation(makeAdmin, {
    onSuccess: (data) => {
      setModalOpen({});
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      Toast.success(data?.message);
    },
    onError: (error) => {
      Toast.error((error as { message: string })?.message);
    },
  });
  const { mutate: changeRoleMember } = useMutation(makeMember, {
    onSuccess: (data) => {
      setModalOpen({});
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      Toast.success(data?.message);
    },
    onError: (error) => {
      Toast.error((error as { message: string })?.message);
    },
  });

  return (
    <Wrapper className="bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-[700]">Settings</p>
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
            <span>All messages</span>
            <HiOutlineChevronDown />
          </div> */}
          <div
            onClick={() => handleClick(1)}
            className={`flex border text-[12px] bg-grey-900 space-x-2 items-center text-white cursor-pointer rounded-md p-2 hover:bg-grey-100 hover:text-grey-900 hover:border-none ${
              user.isSuperAdmin ? "" : "hidden"
            }`}
          >
            <AiOutlinePlus />
            <span>Invite Members</span>
          </div>
        </div>
      </div>
      <hr className="border-grey-100 my-5" />
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
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <tr
                    key={i}
                    className="h-[50px] border-b-[1px] text-sm text-[#404040] border-grey-100 font-[500]  rounded-[2px] "
                  >
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                    <td>
                      <Skeleton />
                    </td>
                  </tr>
                ))
              : workspaceData?.data?.result
              ? workspaceData?.data?.result?.map((item: IWorkspaceRow, index: number) => (
                  <tr
                    key={index}
                    className="h-[50px] border-b-[1px] text-sm text-[#404040] border-grey-100 font-[500]  rounded-[2px] cursor-pointer "
                  >
                    <td
                      onClick={() =>
                        item.status === "pending"
                          ? Toast.error("No information about users yet")
                          : navigate(`/settings/${item.adminId}`)
                      }
                    >
                      <span className="flex items-center space-x-2 font-[600]">
                        {item?.img ? (
                          <span className="rounded-full overflow-hidden font-[600]">
                            <img src={item?.img} alt="" className="w-[24px] h-[24px] object-cover" />
                          </span>
                        ) : (
                          <span className="text-black text-xs bg-[#f59e0b] w-[24px] h-[24px] flex items-center justify-center font-[600] text-white rounded-full">
                            {item.firstName?.charAt(0) ?? "N"}
                          </span>
                        )}
                        <p>
                          {item?.firstName ?? "New"} {item?.lastName ?? item?.role}
                        </p>
                      </span>
                    </td>
                    <td>
                      <span className="flex items-center space-x-2 capitalize">
                        <p>{item?.role}</p>
                      </span>
                    </td>
                    <td>
                      <span className="flex items-center space-x-2 ">
                        <p>{item?.email}</p>
                      </span>
                    </td>
                    <td>
                      <span
                        className={`${
                          item.status === "pending" && "text-red-500"
                        } flex items-center space-x-2 capitalize`}
                      >
                        <p>{item?.status}</p>
                      </span>
                    </td>
                    <td className="relative z-50" onClick={() => handleTableModalOpen(index)}>
                      <span className="flex justify-center">
                        <FiMoreVertical />
                      </span>
                      {modalOpen[index] && user?.email !== item?.email && (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-2 absolute w-[150px] z-[10] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] ">
                            <p
                              onClick={() => {
                                user?.role?.toLowerCase() === "member"
                                  ? ""
                                  : item?.role?.toLowerCase() === "member"
                                  ? changeRole(item?.adminId)
                                  : changeRoleMember(item?.adminId);
                              }}
                              className={`${user?.role === "member" && "text-grey-100"} p-2 hover:bg-grey-50/80`}
                            >
                              Make {item?.role == "member" ? "Admin" : "Member"}
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              className={`${user?.isSuperAdmin ? "" : "text-grey-100"} p-2 hover:bg-grey-50/80 `}
                              onClick={() => {
                                !user?.isSuperAdmin ? "" : deleteMember(item?.adminId);
                              }}
                            >
                              Remove User
                            </p>
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
        <div className="flex justify-center items-center my-8">
          <Pagination
            onPageChange={(page) => setCurrentPage(page)}
            currentPage={currentPage}
            dataCount={dataCount}
            dataSize={DATASIZE}
            siblingCount={1}
          />
        </div>
      </div>
      {open === 1 && (
        <InviteModal
          title="Invite new members"
          subtitle="Enter the email and role of the user to invite."
          onClose={handleClose}
        />
      )}
    </Wrapper>
  );
};

export default Home;
