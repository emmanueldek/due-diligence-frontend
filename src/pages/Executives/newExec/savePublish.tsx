import Modal from "@/components/modal";
import React, { useState, useEffect } from "react";
import publish1 from "@/assets/images/publish.png";
import addUser from "@/assets/images/addUser.png";
import {
  IContractProps,
  ICreditHistoryProps,
  IDataProps,
  IFinancialProps,
  IInsuranceProps,
  ILegalProps,
  IProfileProps,
  IReferenceProps,
  ITaxProps,
} from "@/interface/userCreation";
import { getSingleExec, pusblishExec } from "@/services/executiveService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Toast } from "@/config/toast";
import { ClipLoader } from "react-spinners";

interface IOrganisationProps {
  profile?: IProfileProps;
  creditHistory?: ICreditHistoryProps[];
  financial?: IFinancialProps[];
  tax?: ITaxProps[];
  legal?: ILegalProps[];
  contract?: IContractProps[];
  insurance?: IInsuranceProps[];
  reference?: IReferenceProps[];
}

interface IPublishExecProps {
  profile?: IProfileProps;
  creditHistory?: ICreditHistoryProps[];
  financialStatements?: IFinancialProps[];
  taxCompliance?: ITaxProps[];
  legalRegulatory?: ILegalProps[];
  contractualObligations?: IContractProps[];
  insuranceCoverage?: IInsuranceProps[];
  referencesReputation?: IReferenceProps[];
}

interface IDraftProps {
  onClose: () => void;
  next?: () => void;
  data: IOrganisationProps;
  setData: (data: IDataProps | ((prevData: IDataProps) => IDataProps)) => void;
  check?: string;
  execDocID: string;
}

const SavePublish: React.FC<IDraftProps> = ({ onClose, check, execDocID }) => {
  const [open, setOpen] = useState<number | null>(null);
  const [execDoc, setExecDoc] = useState<IPublishExecProps>();
  const { id } = useParams();
  const requestId = id || "undefined";
  const handleClick = (id: number) => {
    setOpen(id);
  };

  const { data: getData } = useQuery(["singleRequest"], () => {
    if (requestId) {
      return getSingleExec(requestId);
    }
    return null;
  });
  useEffect(() => {
    if (getData?.data && Object.keys(getData.data).length > 0) {
      console.log(getData?.data?.theExecutive);
      setExecDoc(getData?.data?.theExecutive);
    }
  }, [getData?.data]);

  const { mutate: publish, isLoading } = useMutation(pusblishExec, {
    onError: (error) => {
      console.log(error);
      Toast.error("document not published");
    },
    onSuccess: (data) => {
      console.log(data);
      Toast.success("publish document successfully");
      handleClick(1);
    },
  });

  const handlePublish = () => {
    const publishData = {
      profile: execDoc?.profile || [],
      financialStatements: execDoc?.financialStatements || [],
      creditHistory: execDoc?.creditHistory || [],
      taxCompliance: execDoc?.taxCompliance || [],
      legalRegulatory: execDoc?.legalRegulatory || [],
      contractualObligations: execDoc?.contractualObligations || [],
      insuranceCoverage: execDoc?.insuranceCoverage || [],
      referencesReputation: execDoc?.referencesReputation || [],
    };
    const payload = {
      data: publishData,
      orgId: requestId,
      execOrgDocId: execDocID,
    };
    publish(payload);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleCont = () => {
    setOpen(null);
    onClose();
  };

  return (
    <Modal
      title={`${check === "executive publish" ? "Publish Executives" : "Publish changes"}`}
      className="w-[416px]"
      onClose={onClose}
    >
      <div>
        <p className="py-5">Are you sure you want to publish the changes to this profile now?</p>
      </div>
      <hr className="border-grey-100" />
      <div className="pt-5 space-x-2 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 active:bg-grey-100 active:border-none border rounded-lg border-1 text-sm "
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-3 py-2 active:bg-red-600 active:border-none border text-white bg-grey-900  rounded-lg border-1"
          onClick={handlePublish}
        >
          {isLoading ? <ClipLoader color="#fffff" size={20} /> : <p className="text-sm">Publish</p>}
        </button>
      </div>
      {open === 1 && (
        <Modal title=" " onClose={handleClose} className="w-[480px]">
          <div className="my-5">
            <div className="flex justify-center">
              {check === "executive publish" ? (
                <img src={addUser} alt="add user" className="w-[80px] h-[80px]" />
              ) : (
                <img src={publish1} alt="publish" className="w-[80px] h-[80px]" />
              )}
            </div>
            <p className="pt-3 font-[700] text-xl text-center">Published Successfully</p>
            <p className="text-center">The executive profile has been published</p>
          </div>
          <hr className="border-grey-100" />
          <div className="pt-5  justify-center">
            <button
              type="button"
              className="px-3 py-2 active:bg-grey-600 active:border-none border text-white bg-grey-900  rounded-lg border-1 w-full text-sm"
              onClick={handleCont}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default SavePublish;
