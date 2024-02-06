import Modal from "@/components/modal";
import React, { useState } from "react";
import createNote from "@/assets/images/createNote.png";
import {
  IFinancialProps,
  IProfileProps,
  IDataProps,
  ICreditHistoryProps,
  ITaxProps,
  ILegalProps,
  IContractProps,
  IInsuranceProps,
  IReferenceProps,
  IManagementProps,
  IEnvironComplianceProps,
  ISupplyChainInfo,
  IOwnerShipStructure,
} from "@/interface/userCreation";

interface IOrganisationProps {
  profile?: IProfileProps;
  creditHistory?: ICreditHistoryProps[];
  financial?: IFinancialProps[];
  tax?: ITaxProps[];
  legal?: ILegalProps[];
  contract?: IContractProps[];
  insurance?: IInsuranceProps[];
  reference?: IReferenceProps[];
  management?: IManagementProps[];
  environCompliance?: IEnvironComplianceProps[];
  supplyChainInfo?: ISupplyChainInfo[];
  ownershipStructure?: IOwnerShipStructure;
}

interface IDraftProps {
  onClose: () => void;
  next?: () => void;
  data: IOrganisationProps;
  setData: (data: IDataProps | ((prevData: IDataProps) => IDataProps)) => void;
}

const SaveDraftModal: React.FC<IDraftProps> = ({ onClose, data, next, setData }) => {
  const [open, setOpen] = useState<number | null>(null);
  const handleClick = (id: number) => {
    setOpen(id);
    setData((prevData: IDataProps) => ({
      ...prevData,
      ...data,
    }));

    console.log(data);
  };
  const handleClose = () => {
    setOpen(null);
  };
  const handleCont = () => {
    if (next) {
      next();
    }
  };
  return (
    <Modal title="Save to Drafts" className="w-[416px]" onClose={onClose}>
      <div>
        <p className="py-5">Are you sure you want to save and exit this profile? You can resume editing at anytime.</p>
      </div>
      <hr className="border-grey-100" />
      <div className="pt-5 space-x-2 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-3 py-2 active:bg-grey-100 active:border-none border rounded-lg border-1 "
        >
          cancel
        </button>
        <button
          type="submit"
          className="px-3 py-2 active:bg-red-600 active:border-none border text-white bg-grey-900  rounded-lg border-1"
          onClick={() => handleClick(1)}
        >
          Save to draft
        </button>
      </div>
      {open === 1 && (
        <Modal title=" " onClose={handleClose} className="w-[480px]">
          <div className="my-5">
            <div className="flex justify-center">
              <img src={createNote} alt="create note" className="w-[80px] h-[80px]" />
            </div>
            <p className="pt-3 font-[700] text-xl text-center">Saved Changes Successfully</p>
            <p className="text-center">
              The executive profile has been saved to drafts and can be edited at a later time.
            </p>
          </div>
          <hr className="border-grey-100" />
          <div className="pt-5  justify-center">
            <button
              type="button"
              className="px-3 py-2 active:bg-grey-600 active:border-none border text-white bg-grey-900  rounded-lg border-1 w-full"
              onClick={handleCont}
            >
              continue
            </button>
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default SaveDraftModal;
