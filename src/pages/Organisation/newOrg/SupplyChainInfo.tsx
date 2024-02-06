import React, { useState, useEffect } from "react";
import { InputFile, InputText } from "@/components";
import {
  IoChevronBack,
  IoChevronDown,
  IoChevronForward,
  IoChevronUp,
  IoDocumentAttach,
  IoRemoveOutline,
} from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveDraftModal from "./SaveDraftModal";
import SavePublish from "./savePublish";
import { IDataProps, ISupplyChainInfo } from "@/interface/userCreation";
import { acceptRecOrg, acceptSugOrg, getOrgData, updateOrg, useUploadImage } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useParams } from "react-router-dom";
import { Circles, ProgressBar } from "react-loader-spinner";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";

interface IOrganisationProps {
  type?: string;
  coverageAmount?: string;
  coverageStatus?: string;
  expiryDate?: string;
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
  coverageAmount: Yup.string().required("Please fill in this field"),
  type: Yup.string().required("Please fill in this field"),
  coverageStatus: Yup.string().required("Please fill in this field"),
  expiryDate: Yup.string().required("Please fill in this field"),
});

const SupplyChainInfo: React.FC<IactionProps> = ({ next, prev, data, setData, execDocID, sugDocId, recDocId }) => {
  const { id } = useParams();
  const requestId = id || "";
  const [newNext, setNext] = useState(false);
  const [file, setFile] = useState<string>("");
  const [dataTab, setDataTab] = useState<number | null>(null);
  const [dataList, setDataList] = useState<IOrganisationProps[]>(data.supplyChainInfo || []);
  const [check, setCheck] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const supplyChainData = { supplyChainInfo: dataList };
  const [checkAdd, setCheckAdd] = useState(false);

  const { data: supplyData, isLoading: incomingData } = useQuery(
    ["supplyChain", "supplyChainInformation", requestId],
    () => getOrgData("supplyChainInformation", requestId),
  );

  useEffect(() => {
    if (supplyData?.data?.supplyChainInformation && Object.keys(supplyData?.data?.supplyChainInformation).length > 0) {
      setDataList(supplyData?.data?.supplyChainInformation);
      console.log(supplyData?.data?.supplyChainInformation);
    }
  }, [supplyData?.data?.supplyChainInformation]);

  const { mutate: postImage, isLoading: progressLoading } = useMutation(useUploadImage, {
    onSuccess: ({ data: uploadRes }) => {
      console.log(uploadRes);
      Toast.success("File uploaded successfully");
      setFile(uploadRes?.url);
    },

    onError: (error) => {
      Toast.error("something went wrong");
      console.log(error);
    },
  });
  console.log(file);

  const { mutate: postSupply } = useMutation(updateOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("document not saved");
    },
    onSuccess: (data) => {
      console.log(data);
      Toast.success("Saved document successfully");
      if (newNext) {
        next();
      }
    },
  });

  const { mutate: acceptSuggest, isLoading: acceptLoading } = useMutation(acceptSugOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("Request failed to deliver");
    },
    onSuccess: (data) => {
      console.log(data);
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

  const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Please select only one image");
      return;
    } else {
      const imageFile = new FormData();
      imageFile.append("file", e.target.files[0]);
      postImage({ imageFile, flags: "organizationDocuments" });
    }
  };

  const onSubmit = async (data: IOrganisationProps) => {
    const newData = {
      ...data,
      sciDocuments: file,
    };
    if (dataTab !== null) {
      // Update existing entry in the dataList
      const updatedDataList = [...dataList];
      updatedDataList[dataTab] = newData;
      setDataList(updatedDataList);
      setDataTab(null); // Clear the selected index
    } else {
      setDataList([...dataList, newData]);
      if (checkAdd) {
        setCheckAdd(false);
        resetForm();
        setFile("");
      }
    }
  };

  const handleQuerySubmit = () => {
    const data = { supplyChainInformation: dataList };
    if (dataList.length !== 0) {
      if (sugDocId) {
        const payLoad = { flag: "supplyChainInformation", data: data, orgId: sugDocId };
        acceptSuggest(payLoad);
      } else if (recDocId) {
        const payLoad = { flag: "supplyChainInformation", data: data, orgId: recDocId };
        acceptRecord(payLoad);
      } else {
        const payload = {
          data: data,
          flag: "supplyChainInformation",
          orgId: requestId,
          execOrgDocId: execDocID,
        };
        postSupply(payload);
      }
    } else Toast.error("Please add a record");
  };

  const initialValues: ISupplyChainInfo = {
    type: "",
    coverageAmount: "",
    coverageStatus: "",
    expiryDate: "",
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleModal = (id: number) => {
    setOpen(JSON.stringify(errors).length !== 2 ? null : id);
  };

  const { handleChange, setValues, values, handleSubmit, errors, touched, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const handleEdit = (index: number) => {
    // Set the form fields with data from the selected index
    setValues(dataList[index]);
    setCheck(index);
    setDataTab(index); // Set the selected index
  };

  const handleDelete = (index: number) => {
    // Remove the data entry from the dataList
    const updatedDataList = [...dataList];
    updatedDataList.splice(index, 1);
    setDataList(updatedDataList);
    setDataTab(null); // Clear the selected index
  };

  const getError = (key: keyof IOrganisationProps) => {
    return touched[key] && errors[key];
  };

  if (incomingData) {
    return (
      <div className="flex items-center justify-center h-full">
        <Circles color="#00000" width={40} />
      </div>
    );
  }

  return (
    <div>
      <p className="font-[700] text-2xl">SupplyChainInfo Coverage</p>

      <div className="space-y-2">
        {dataList?.map((data, i) => (
          <div
            className="rounded-md bg-grey-100 p-3 flex items-center justify-between"
            key={i}
            onClick={() => handleEdit(i)} // Allow editing when a row is clicked
          >
            <p>{data.type}</p>
            <div className="flex space-x-1">
              {check === i ? <IoChevronDown /> : <IoChevronUp />}
              <IoRemoveOutline onClick={() => handleDelete(i)} />
            </div>
          </div>
        ))}
      </div>

      <form action="" onSubmit={handleSubmit} className="my-5 space-y-5">
        <div>
          <InputText
            id="type"
            isRequired={true}
            label="Type"
            placeholder="Enter type"
            value={values.type}
            error={getError("type")}
            type="text"
            onChange={handleChange}
            name="type"
          />
        </div>
        <div>
          <InputText
            id="coverageAmount"
            isRequired={true}
            label="Coverage Amount"
            placeholder="Enter coverage amount"
            value={values.coverageAmount}
            error={getError("coverageAmount")}
            type="text"
            onChange={handleChange}
            name="coverageAmount"
          />
        </div>
        <div>
          <InputText
            id="coverageStatus"
            isRequired={true}
            label="Coverage Status"
            placeholder="Enter coverage status"
            value={values.coverageStatus}
            error={getError("coverageStatus")}
            type="text"
            onChange={handleChange}
            name="coverageStatus"
          />
        </div>
        <div>
          <InputText
            id="expiryDate"
            isRequired={true}
            label="Expiry Date"
            placeholder=""
            value={values.expiryDate}
            error={getError("expiryDate")}
            type="date"
            onChange={handleChange}
            name="expiryDate"
          />
        </div>
        <div>
          <p className="text-sm mb-2 font-medium">Upload supporting document</p>
          {file ? (
            <div>
              <div className="flex items-center space-x-3">
                <div className="bg-grey-100 rounded w-[20%] h-[128px] flex items-center justify-center">
                  <IoDocumentAttach size={50} color="#808080" />
                </div>
                <div
                  className="rounded-full flex items-center justify-center bg-red-500 w-[20px] h-[20px] active:bg-red-800 cursor-pointer"
                  onClick={() => setFile("")}
                >
                  <RiDeleteBin5Fill size={10} color="#ffffff" />
                </div>
              </div>
              <p className="text-xs text-green-600 my-2">{file.slice(81)}</p>
            </div>
          ) : (
            <div>
              <InputFile onChange={(e) => handleUploads(e)} />
              {progressLoading && (
                <div>
                  <ProgressBar height={30} width={""} borderColor="#000000" barColor="#008000" />
                </div>
              )}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="border-dotted w-full border-2 border-grey-900 rounded-md p-3 my-3 flex items-center justify-center active:bg-grey-400"
          onClick={() => setCheckAdd(true)}
        >
          <p>Add record</p>
        </button>
        <div className="flex justify-center my-7">
          <div className="flex items-center w-[60%] justify-between">
            <div
              className="flex space-x-1 items-center rounded-md border border-grey-100 p-1 px-2"
              onClick={() => prev()}
            >
              <div className="bg-grey-100 p-1 rounded">
                <IoChevronBack size={10} />
              </div>
              <p>Previous</p>
            </div>
            <button
              type="button"
              className="flex space-x-1 items-center rounded-md border border-grey-100 p-1"
              onClick={() => {
                handleQuerySubmit();
                setNext(true);
              }}
            >
              <p className="pl-2">Save and continue</p>
              <div className="bg-grey-100 p-1 rounded">
                <IoChevronForward size={10} />
              </div>
            </button>
          </div>
        </div>
        <hr className="border-grey-100 mb-7" />
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="bg-grey-100 rounded-md px-3 py-2 flex items-center justify-center active:bg-grey-900 active:text-white cursor-pointer"
            onClick={handleQuerySubmit}
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
              onClick={() => handleModal(2)}
              className="bg-grey-900 text-white rounded-md px-3 py-2 flex active:bg-grey-200 items-center justify-center"
            >
              <p>Publish Executive</p>
            </button>
          </div>
        </div>
        {open === 1 && <SaveDraftModal data={supplyChainData} onClose={handleClose} next={next} setData={setData} />}
        {open === 2 && (
          <SavePublish
            data={supplyChainData}
            onClose={handleClose}
            next={next}
            setData={setData}
            execDocID={execDocID}
          />
        )}
      </form>
    </div>
  );
};

export default SupplyChainInfo;
