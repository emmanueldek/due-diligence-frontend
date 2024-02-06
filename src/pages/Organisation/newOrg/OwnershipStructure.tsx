import React, { useState, useEffect } from "react";
import { InputText } from "@/components";
import { IoAddCircleOutline, IoChevronBack } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveDraftModal from "./SaveDraftModal";
import SavePublish from "./savePublish";
import { IDataProps, IShareHolderProps } from "@/interface/userCreation";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptRecOrg, acceptSugOrg, getOrgData, updateOrg } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { ClipLoader } from "react-spinners";

interface IInitialData {
  ownershipType?: string;
  governanceStructure?: string;
  shareHolders: IShareHolderProps[];
}

interface IactionProps {
  next: () => void;
  prev: () => void;
  data: IDataProps;
  setData: (data: IDataProps | ((prevData: IDataProps) => IDataProps)) => void;
  execDocID: string;
  sugDocId: string;
  recDocId: string;
}

const validationSchema = Yup.object({
  ownershipType: Yup.string().required("Please fill in this field"),
  governanceStructure: Yup.string().required("Please fill in this field"),
});

const OwnershipStructure: React.FC<IactionProps> = ({ next, prev, data, setData, execDocID, sugDocId, recDocId }) => {
  const { id } = useParams();
  const requestId = id || "";
  const [open, setOpen] = useState<number | null>(null);
  const [ownerData, setOwnerData] = useState<IInitialData>();
  const { data: owner, isLoading: incomingData } = useQuery(["ownership", "ownershipStructure", requestId], () =>
    getOrgData("ownershipStructure", requestId),
  );

  useEffect(() => {
    if (owner?.data?.ownershipStructure && Object.keys(owner.data.ownershipStructure).length > 0) {
      setOwnerData(owner?.data?.ownershipStructure);
    }
  }, [owner?.data?.ownershipStructure]);

  const { mutate: postOwner } = useMutation(updateOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("Management not saved");
    },
    onSuccess: () => {
      Toast.success("Saved Management successfully");
    },
  });

  const { mutate: acceptSuggest, isLoading: acceptLoading } = useMutation(acceptSugOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("Request failed to deliver");
    },
    onSuccess: () => {
      Toast.success(" Request accepted");
    },
  });

  const { mutate: acceptRecord, isLoading: recordLoading } = useMutation(acceptRecOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("Request failed to deliver");
    },
    onSuccess: () => {
      Toast.success("Record accepted");
    },
  });

  const initialValues: IInitialData = {
    ownershipType: ownerData?.ownershipType || "",
    governanceStructure: ownerData?.governanceStructure || "",
    shareHolders: data.ownershipStructure?.shareHolders || [{ name: "", percentage: 0 }],
  };

  const handleClose = () => {
    setOpen(null);
  };

  const onSubmit = async (data: IInitialData) => {
    const ownershipData = { ownershipStructure: data };
    if (sugDocId) {
      const payLoad = { flag: "ownershipStructure", data: ownershipData, orgId: sugDocId };
      acceptSuggest(payLoad);
    } else if (recDocId) {
      const payLoad = { flag: "ownershipStructure", data: ownershipData, orgId: recDocId };
      acceptRecord(payLoad);
    } else {
      const payload = {
        flag: "ownershipStructure",
        orgId: requestId,
        data: ownershipData,
        execOrgDocId: execDocID,
      };
      postOwner(payload);
    }
  };

  const { handleChange, values, handleSubmit, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const handleModal = (id: number) => {
    setOpen(JSON.stringify(errors).length !== 2 ? null : id);
  };

  const addShareHolder = () => {
    const newShareHolders = [...values.shareHolders, { name: "", percentage: 0 }];
    handleChange({ target: { name: "shareHolders", value: newShareHolders } });
  };

  const removeShareHolder = (index: number) => {
    const newShareHolders = [...values.shareHolders];
    newShareHolders.splice(index, 1);
    handleChange({ target: { name: "shareHolders", value: newShareHolders } });
  };

  const ownershipTypeData = { ownershipStructure: { ...data, shareHolders: values.shareHolders } };

  if (incomingData) {
    return (
      <div className="flex items-center justify-center h-full">
        <Circles color="#00000" width={40} />
      </div>
    );
  }

  return (
    <div>
      <p className="font-[700] text-2xl">Ownership Structure</p>
      <form action="" onSubmit={handleSubmit} className="my-5">
        <div>
          <InputText
            id="ownershipType"
            isRequired={true}
            label="Ownership Type"
            placeholder="Enter your Org name"
            value={values.ownershipType}
            // error={getError("ownershipType")}
            type="text"
            onChange={handleChange}
            name="ownershipType"
          />
        </div>
        {values.shareHolders.map((shareHolder, index) => (
          <div key={index} className="grid grid-cols-5 space-x-3 items-center ">
            <div className="col-span-2">
              <InputText
                label="Name"
                name={`shareHolders[${index}].name`}
                id={`name-${index}`}
                placeholder="Enter a Name"
                value={shareHolder.name}
                onChange={handleChange}
                isRequired={true}
                // error={getError(`shareHolders[${index}].name`)}
              />
            </div>
            <div className="col-span-2">
              <InputText
                label="Percentage"
                name={`shareHolders[${index}].percentage`}
                id={`percentage-${index}`}
                placeholder="Enter a percentage value"
                value={shareHolder.percentage}
                // error={getError(`shareHolders[${index}].percentage`)}
                onChange={handleChange}
                isRequired={true}
              />
            </div>
            {values.shareHolders.length > 1 && (
              <button type="button" onClick={() => removeShareHolder(index)}>
                <IoRemoveCircleOutline />
              </button>
            )}
          </div>
        ))}
        <button type="button" onClick={addShareHolder} className="flex items-center space-x-1">
          <IoAddCircleOutline />
          <span>Add More</span>
        </button>
        <div className="mt-5">
          <InputText
            id="governanceStructure"
            isRequired={true}
            label="Governance Structure"
            placeholder="Governance Structure"
            value={values.governanceStructure}
            // error={getError("governanceStructure")}
            type="text"
            onChange={handleChange}
            name="governanceStructure"
          />
        </div>
        <div className="flex justify-center my-7">
          <div className="flex items-center w-[60%] justify-between">
            <div className="flex space-x-1 items-center rounded-md border border-grey-100 cursor-pointer p-1 px-2">
              <div className="bg-grey-100 p-1 rounded" onClick={() => prev()}>
                <IoChevronBack size={10} />
              </div>
              <p>Previous</p>
            </div>
          </div>
        </div>
        <hr className="border-grey-100 mb-7" />
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-grey-100 rounded-md px-3 py-2 flex items-center justify-center active:bg-grey-900 active:text-white cursor-pointer"
          >
            {acceptLoading ? (
              <ClipLoader size={10} />
            ) : recordLoading ? (
              <ClipLoader size={10} />
            ) : (
              <p>{sugDocId ? "Accept Request" : recDocId ? "Accept Record" : "Save"}</p>
            )}
          </button>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              className="bg-grey-900 text-white rounded-md px-3 py-2 flex active:bg-grey-200 items-center justify-center"
              onClick={() => handleModal(2)}
            >
              <p>Publish Executive</p>
            </button>
          </div>
        </div>
        {open === 1 && <SaveDraftModal data={ownershipTypeData} onClose={handleClose} next={next} setData={setData} />}
        {open === 2 && (
          <SavePublish
            data={ownershipTypeData}
            onClose={handleClose}
            next={next}
            setData={setData}
            check="executive publish"
            execDocID={execDocID}
          />
        )}
      </form>
    </div>
  );
};

export default OwnershipStructure;
