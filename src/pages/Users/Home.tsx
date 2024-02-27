import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Wrapper } from "@/components";
import InviteModal from "./InviteModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPartners } from "@/services/workspaceService";
import Skeleton from "react-loading-skeleton";
import Pagination from "@/components/pagination";
import { FiMoreVertical } from "react-icons/fi";
import { Toast } from "@/config/toast";
import { useNavigate } from "react-router-dom";
import useUser from "@/store/useUser";
import { useCreateUser } from "@/store/useCreateUser";
import { useEditUser } from "@/store/useEditUser";
import { deleteUser, suspendUser } from "@/services/organisationService";

interface IWorkspaceRow {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  role: string;
  status: string;
  adminId: string;
  createdBy: string;
  dateCreated: string;
  lastLoggedIn: string;
  duration: string;
  partnerId: string;
}
type MouseEventCallback = (e: MouseEvent) => void;

const Home: React.FC = () => {
  // const columns = [
  //   { field: "name", header: "Full name" },
  //   { field: "role", header: "Role" },
  //   { field: "email", header: "Email Address" },
  //   { field: "status", header: "Status" },
  // ];
  const columns = [
    { field: "firstName", header: "Name" },
    { field: "email", header: "Email" },
    { field: "status", header: "Status" },
    { field: "createdBy", header: "Created By" },
    { field: "createdOn", header: "Date Created" },
    { field: "lastLogin", header: "Last Login" },
    { field: "duration", header: "Duration" },
    { field: "action", header: "Action" },
  ];

  const DATASIZE = 10;
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalOpen, setModalOpen] = useState<{ [key: number]: boolean }>({});
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [dataCount] = useState(0);

  const navigate = useNavigate();

  const [open, setOpen] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const handleTableModalOpen = (rowIndex: number) => {
    setModalOpen((prevState) => ({
      ...prevState,
      [rowIndex]: true,
    }));
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

  const { data: partnersData, isLoading } = useQuery({
    queryKey: ["partners"],
    queryFn: () => getAllPartners(currentPage),
  });

  const { mutate: suspendPartner } = useMutation(suspendUser, {
    onSuccess: (data) => {
      setModalOpen({});
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      Toast.success(data?.message);
    },
    onError: (error) => {
      Toast.error((error as { message: string })?.message);
    },
  });

  const { mutate: deletePartner } = useMutation(deleteUser, {
    onSuccess: (data) => {
      setShowEditModal(false);
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      Toast.success(data?.message);
    },
    onError: (error) => {
      Toast.error((error as { message: string })?.message);
    },
  });

  const { setShowModal } = useCreateUser();
  const { setShowModal: setShowEditModal, setEditData } = useEditUser();
  return (
    <Wrapper className="bg-white rounded-xl">
      <div className="flex items-center justify-between">
        <p className="text-2xl font-[700]">Users</p>
        <div className="flex items-center space-x-2">
          <div
            onClick={() => setShowModal(true)}
            className={`flex border text-[12px] bg-grey-900 space-x-2 items-center text-white cursor-pointer rounded-md p-2 hover:bg-grey-100 hover:text-grey-900 hover:border-none ${
              user.isSuperAdmin ? "" : "hidden"
            }`}
          >
            <AiOutlinePlus />
            <span>Create User</span>
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
              : partnersData?.data?.result
              ? partnersData?.data?.result?.map((item: IWorkspaceRow, index: number) => (
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
                    <td>
                      <span className={`flex items-center space-x-2 capitalize`}>
                        <p>{item?.createdBy}</p>
                      </span>
                    </td>
                    <td>
                      <span className={`flex items-center space-x-2 capitalize`}>
                        <p>{item?.dateCreated}</p>
                      </span>
                    </td>
                    <td>
                      <span className={`flex items-center space-x-2 capitalize`}>
                        <p>{item?.lastLoggedIn}</p>
                      </span>
                    </td>
                    <td>
                      <span className={`flex items-center space-x-2 capitalize`}>
                        <p>{item?.duration}</p>
                      </span>
                    </td>
                    <td className="relative z-50" onClick={() => handleTableModalOpen(index)}>
                      <span className="flex justify-center">
                        <FiMoreVertical />
                      </span>
                      {modalOpen[index] && user?.email !== item?.email && (
                        <div
                          ref={menuRef}
                          className="bg-white shadow-md rounded-md overflow-hidden space-y-3 py-3 px-2 absolute w-[150px] z-[30000000000] top-[2em] right-[2em] cursor-pointer"
                        >
                          <span className="text-[12px] ">
                            <p
                              onClick={() => {
                                setShowEditModal(true);
                                setEditData(item);
                              }}
                              className={`p-2 hover:bg-grey-50/80`}
                            >
                              Edit
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() => {
                                suspendPartner(item?.partnerId);
                              }}
                              className={`p-2 hover:bg-grey-50/80`}
                            >
                              Suspend
                            </p>
                            <hr className="border-grey-100" />
                            <p
                              onClick={() => {
                                deletePartner(item?.partnerId);
                              }}
                              className={`text-red-500 p-2 hover:bg-grey-50/80`}
                            >
                              Delete
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
