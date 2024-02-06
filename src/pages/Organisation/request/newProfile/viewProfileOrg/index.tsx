import { Wrapper } from "@/components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useQuery, useMutation } from "@tanstack/react-query";
import { acceptRequest, getSingleRequest } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { ClipLoader } from "react-spinners";
import RejectModal from "@/components/modal/RejectModal";
import { Circles } from "react-loader-spinner";
import { IoDocumentAttachSharp } from "react-icons/io5";

interface IRequestProps {
  avatar: string;
  _id: string;
  profileType: string;
  organizationName: string;
  organizationDesc: string;
  imageDesc: string;
  link: string;
  userId: string;
  partnerRequestId: string;
  requesterOrganizationName: string;
  organizationDoc: string;
  requesterPosition: string;
  requestedBy: string;
  status: string;
  updatedAt: string;
  createdAt: string;
}

const ProfileRequest: React.FC = () => {
  const [singleData, setSingleData] = useState<IRequestProps>();
  const [open, setOpen] = useState<number | null>();
  const [execOrgId, setExecOrgId] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const requestId = id || " ";

  const { data, isLoading } = useQuery(["singleOrgProfile"], () => getSingleRequest(requestId));

  const { mutate: accept, isLoading: loadRequest } = useMutation((requestID: string) => acceptRequest(requestID), {
    onError: (error: { statusCode: string; message: string }) => {
      console.log(error);
      Toast.error(`${error.message}`);
    },
    onSuccess: () => {
      Toast.success("Request accepted");
      navigate("/organisation/drafts");
    },
  });

  useEffect(() => {
    if (data?.data && Object.keys(data?.data).length > 0) {
      setSingleData(data?.data?.theRequest);
      setExecOrgId(data?.data?.theRequest?.execOrgDocId);
    }
  }, [data?.data]);

  console.log(singleData);

  const handleClick = () => {
    accept(execOrgId);
  };

  const handleModal = (id: number) => {
    setOpen(open === id ? null : id);
  };
  const handleClose = () => {
    setOpen(null);
  };

  return (
    <div>
      <Wrapper className="bg-white px-10 py-10">
        {isLoading ? (
          <div className="flex-1 flex items-center justify-center w-full">
            <Circles color="#00000" width={40} />
          </div>
        ) : (
          <>
            <p className="pt-2 cursor-pointer flex items-center space-x-1" onClick={() => navigate(-1)}>
              <IoIosArrowRoundBack />
              Back
            </p>
            <div>
              <p className="font-[700] text-xl my-5">New Organisation Request</p>
            </div>
            <Wrapper className="shadow-md px-5">
              <p className="font-[600]">Requested by</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-5">
                  {singleData?.avatar ? (
                    <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3">
                      <img src={singleData?.avatar} alt="" />
                    </div>
                  ) : (
                    <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3 text-[700] flex justify-center items-center bg-[#f59e0b] text-4xl text-white">
                      {singleData?.requestedBy?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-[700] text-2xl">{singleData?.requestedBy}</p>
                    <p>
                      {singleData?.requesterPosition} {singleData?.requesterOrganizationName}
                    </p>
                  </div>
                </div>
                {/* <p className="text-[#2F80ED] font-[600]">View Profile</p> */}
              </div>
            </Wrapper>
            <Wrapper className="px-5 shadow-md mt-10">
              <div className="w-[70%]">
                {/* <div>
                  <p className="font-[700] text-[lg] ">Organisation Name</p>
                  <p className="text-xl pt-2 ]">{singleData?.organizationName}</p>
                </div> */}
                <div className="flex items-center space-x-5">
                  {singleData?.avatar ? (
                    <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3">
                      <img src={singleData?.avatar} alt="" />
                    </div>
                  ) : (
                    <div className="rounded-lg overflow-hidden w-[72px] h-[72px] mt-3 text-[700] flex justify-center items-center bg-[#f59e0b] text-4xl text-white">
                      {singleData?.organizationName?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-[700] text-2xl">{singleData?.organizationName}</p>
                    {/* <p>{singleData?.organizationName}</p> */}
                  </div>
                </div>
                <hr className="my-5 border-grey-100 opacity-50" />
                <div>
                  <p className="font-[700] text-[lg]">Description</p>
                  <p className="text-xl font-[300] pt-2 text-justify">{singleData?.organizationDesc}</p>
                </div>
                <hr className="my-5 border-grey-100 opacity-50" />
                <p className="font-[700] text-[lg]">Supporting Document</p>
                <Link to={`${singleData?.organizationDoc}`}>
                  <div className="w-[248px] h-[124px] bg-grey-100 rounded-xl mt-3 flex items-center justify-center">
                    <IoDocumentAttachSharp size={40} color="#808080" />
                  </div>
                  <h1 className="text-xs mt-1 text-green-700">{singleData?.organizationDoc?.slice(81)}</h1>
                </Link>
                <p className="mt-3">{singleData?.imageDesc}</p>
                <hr className="my-5 border-grey-100 opacity-50" />
                <div>
                  <p className="font-[700] text-[lg]">Help link</p>
                  <p className="text-xl font-[300] pt-2 text-justify">{singleData?.link}</p>
                </div>
              </div>
              <hr className="my-5 border-grey-100 opacity-50" />
              <div className="pt-5 space-x-2 flex justify-end">
                <button
                  className="px-3 py-2 active:bg-[#EC2727] active:text-white border rounded-lg border-[#EC2727] text-[#ec2727] border-1 "
                  onClick={() => handleModal(1)}
                >
                  <span>Decline</span>
                </button>
                <button
                  className="px-3 py-2 active:bg-grey-700 bg-grey-900 text-white  rounded-lg border-1 "
                  onClick={handleClick}
                >
                  <>{loadRequest ? <ClipLoader size={20} color={"#ffffff"} /> : <span>Create Organisation</span>}</>
                </button>
              </div>
            </Wrapper>
          </>
        )}
      </Wrapper>
      {open === 1 && (
        <RejectModal
          requestId={execOrgId}
          title="Reject Suggestion"
          body="Are you sure you want to reject this suggestion? You can revisit it later."
          onClose={handleClose}
          buttonTitle="Decline"
          flag="org_exec"
        />
      )}
    </div>
  );
};

export default ProfileRequest;
