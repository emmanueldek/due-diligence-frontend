import { Wrapper } from "@/components";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import RejectModal from "@/components/modal/RejectModal";
import { getSingleRequest } from "@/services/organisationService";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { Circles } from "react-loader-spinner";

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
  requesterPosition: string;
  requesterOrganizationName: string;
  suggestionInput: string;
  suggestionDoc: string;
  requestedBy: string;
  status: string;
  updatedAt: string;
  createdAt: string;
  recordSection: string;
  organizationId: string;
}

interface IOrgInfo {
  industry?: string;
  location?: string;
  theRequest?: IRequestProps;
}

const SuggestionView: React.FC = () => {
  const [open, setOpen] = useState<number | null | boolean>(null);
  const [sugDocId, setSugDocId] = useState("");
  const [OrgId, setOrgId] = useState("");
  const [orgInfo, setOrgInfo] = useState<IOrgInfo>();
  const [singleData, setSingleData] = useState<IRequestProps>();
  const navigate = useNavigate();
  const { id } = useParams();
  const requestId = id || " ";

  const { data, isLoading } = useQuery(["singleOrgSuggestion"], () => getSingleRequest(requestId));

  useEffect(() => {
    if (data?.data && Object.keys(data?.data).length > 0) {
      setSingleData(data?.data?.theRequest);
      setOrgInfo(data?.data);
      setSugDocId(data?.data?.theRequest?.sugDocId);
      setOrgId(data?.data?.theRequest?.organizationId);
    }
  }, [data?.data]);

  const handleClick = () => {
    navigate(`/organisation/create/${OrgId}`, { state: { sug: sugDocId } });
  };

  const handleModal = (id: number) => {
    setOpen(open === id ? null : id);
  };
  const handleClose = () => {
    setOpen(!open);
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
        <p className="pt-2 cursor-pointer flex items-center space-x-1" onClick={() => navigate(-1)}>
          <IoIosArrowRoundBack />
          Back
        </p>
        <div>
          <p className="font-[700] text-xl my-5">Suggestion View</p>
        </div>
        <Wrapper className="shadow-md px-5">
          <p className="font-[600]">Suggested by</p>
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
                <p className="flex items-center">
                  {singleData?.requesterPosition}{" "}
                  <ul className="list-disc ml-7">
                    <li>{singleData?.requesterOrganizationName}</li>{" "}
                  </ul>
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
                  <p className="font-[700] text-2xl">{singleData?.organizationName}</p>
                  <p className="flex items-center">
                    {orgInfo?.industry}{" "}
                    <ul className="list-disc ml-7">
                      {" "}
                      <li>{orgInfo?.location}</li>
                    </ul>
                  </p>
                </div>
              </div>
              {/* <Link to={`/organisation/view/${singleData?.organizationId}`} className="text-[#2F80ED] font-[600]">
                View Profile
              </Link> */}
            </div>
            <div></div>
            <hr className="my-5 border-grey-100 opacity-50" />
            <div>
              <p className="font-[700] text-[lg]">Requested Section</p>
              <p className="text-xl font-[300] pt-2 text-justify">{singleData?.recordSection}</p>
            </div>
            <div className="w-[70%]">
              <hr className="my-5 border-grey-100 opacity-50" />
              <p className="font-[700] text-[lg]">Suggestion</p>
              <p className="text-xl font-[300] pt-2 text-justify">{singleData?.suggestionInput}</p>
              <hr className="my-5 border-grey-100 opacity-50" />
              <p className="font-[700] text-[lg]">Supporting Document</p>
              <Link to={`${singleData?.suggestionDoc}`}>
                <div className="w-[248px] h-[124px] bg-grey-100 rounded-xl mt-3 flex items-center justify-center">
                  <IoDocumentAttachSharp size={40} color="#808080" />
                </div>
                <h1 className="text-xs mt-1 text-green-700">{singleData?.suggestionDoc.slice(81)}</h1>
              </Link>
              <p className="mt-3">Inputed document description</p>
              <hr className="my-5 border-grey-100 opacity-50" />
              <div>
                <p className="font-[700] text-[lg]">Help link</p>
                <p className="text-xl font-[300] pt-2 text-justify">{singleData?.link}</p>
              </div>
            </div>
          </div>
          <hr className="my-5 border-grey-100 opacity-50" />
          <div className="pt-5 space-x-2 flex justify-end">
            <button
              className="px-3 py-2 active:bg-[#EC2727] active:text-white border rounded-lg border-[#EC2727] text-[#EC2727] border-1 "
              onClick={() => handleModal(1)}
            >
              Reject
            </button>
            <button
              className="px-3 py-2 active:bg-grey-700 bg-grey-900 text-white  rounded-lg border-1"
              onClick={handleClick}
            >
              <span>Accept suggestion</span>
            </button>
          </div>
        </Wrapper>
      </Wrapper>
      {open === 1 && (
        <RejectModal
          title="Reject Suggestion"
          body="Are you sure you want to reject this suggestion? You can revisit it later."
          onClose={handleClose}
          buttonTitle="Reject"
          requestId={sugDocId}
          flag="suggestion"
        />
      )}
    </div>
  );
};

export default SuggestionView;
