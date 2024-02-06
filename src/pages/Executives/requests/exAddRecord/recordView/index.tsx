import { Wrapper } from "@/components";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import RejectModal from "@/components/modal/RejectModal";
import { getSingleExecRequest } from "@/services/executiveService";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";

interface IRequestProps {
  avatar: string;
  _id: string;
  profileType: string;
  organizationName: string;
  requesterPosition: string;
  requesterOrganizationName: string;
  executiveDoc: string;
  executiveId: string;
  executiveDesc: string;
  executiveName: string;
  recordSection: string;
  recordInput: string;
  recDocId: string;
  imageDesc: string;
  link: string;
  userId: string;
  partnerRequestId: string;
  requestedBy: string;
  status: string;
  updatedAt: string;
  createdAt: string;
}

interface IExecPosition {
  executivePosition: string;
  theRequest: IRequestProps;
}

const RecordView: React.FC = () => {
  const [open, setOpen] = useState<number | null | boolean>(null);
  const [singleData, setSingleData] = useState<IRequestProps>();
  const [execPosition, setExecPosition] = useState<IExecPosition>();
  const navigate = useNavigate();
  const { id } = useParams();
  const requestId = id || " ";

  const { data, isLoading } = useQuery(["singleRequestRecords"], () => getSingleExecRequest(requestId));

  useEffect(() => {
    if (data?.data && Object.keys(data?.data).length > 0) {
      setSingleData(data?.data.theRequest);
      setExecPosition(data?.data);
    }
  }, [data?.data]);
  const execId = singleData?.executiveId;
  const recOrgDocId = singleData?.recDocId;

  const handleModal = (id: number) => {
    setOpen(open === id ? null : id);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    navigate(`/executives/create/${execId}`, { state: { rec: recOrgDocId } });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Circles color="#00000" width={40} />
      </div>
    );
  }

  return (
    <div>
      <Wrapper className="bg-white px-10 py-10">
        <p className="mt-2 cursor-pointer flex items-center space-x-1" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack />
          Back
        </p>
        <div>
          <p className="font-[700] text-xl my-5">Executive Record Request</p>
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
                  {singleData?.organizationName?.charAt(0)}
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
          <div>
            <div className="flex items-center justify-between">
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
                  <p className="font-[700] text-2xl">{singleData?.executiveName}</p>
                  <p>{execPosition?.executivePosition}</p>
                </div>
              </div>
              {/* <Link to={`/executives/view/${singleData?.executiveId}`} className="text-[#2F80ED] font-[600]">
                View profile
              </Link> */}
            </div>
            <div></div>
            <hr className="my-5 border-grey-100 opacity-50" />
            <div>
              <p className="font-[700] text-[lg]">Requested Section</p>
              <p className="text-xl font-[300] pt-2 text-justify">{singleData?.recordSection}</p>
            </div>
            <hr className="my-5 border-grey-100 opacity-50" />
            <div>
              <p className="font-[700] text-[lg]">Record Input</p>
              <p className="text-xl font-[300] pt-2 text-justify">{singleData?.recordInput}</p>
            </div>
          </div>
          <hr className="my-5 border-grey-100 opacity-50" />
          <div className="pt-5 space-x-2 flex justify-end">
            <button
              className="px-3 py-2 active:bg-[#EC2727] active:text-white border rounded-lg border-[#EC2727] text-[#EC2727] border-1 "
              onClick={() => handleModal(1)}
            >
              Decline
            </button>
            <button
              className="px-3 py-2 active:bg-grey-700 bg-grey-900 text-white  rounded-lg border-1 "
              onClick={handleClick}
            >
              Add Record
            </button>
          </div>
        </Wrapper>
      </Wrapper>
      {open === 1 && (
        <RejectModal
          title="Reject Suggestion"
          body="Are you sure you want to reject this suggestion? You can revisit it later."
          onClose={handleClose}
          buttonTitle="Decline"
          flag="add_record"
          requestId={singleData?.recDocId || ""}
        />
      )}
    </div>
  );
};

export default RecordView;
