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
import { IContractProps, IDataProps } from "@/interface/userCreation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useUploadImage } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useParams } from "react-router-dom";
import { Circles, ProgressBar } from "react-loader-spinner";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { acceptRecExec, acceptSugExec, getExecData, updateExec } from "@/services/executiveService";
import { ClipLoader } from "react-spinners";

interface IOrganisationProps {
  date?: string;
  type?: string;
  assetsLiquidated?: string;
  debtsDischarged?: string;
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
  date: Yup.string().required("Please fill in this field"),
  type: Yup.string().required("Please fill in this field"),
  assetsLiquidated: Yup.string().required("Please fill in this field"),
  debtsDischarged: Yup.string().required("Please fill in this field"),
});

const Credit: React.FC<IactionProps> = ({ next, prev, data, setData, execDocID, sugDocId, recDocId }) => {
  const { id } = useParams();
  const requestId = id || "";
  const [newNext, setNext] = useState(false);
  const [file, setFile] = useState<string>("");
  const [dataTab, setDataTab] = useState<number | null>(null);
  const [dataList, setDataList] = useState<IOrganisationProps[]>(data.contract || []);
  const [check, setCheck] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const contractData = { contract: dataList };
  const [checkAdd, setCheckAdd] = useState(false);

  const { data: contractualData, isLoading: incomingData } = useQuery(
    ["contract", "contractualObligations", requestId],
    () => getExecData("contractualObligations", requestId),
  );

  useEffect(() => {
    if (
      contractualData?.data?.contractualObligations &&
      Object.keys(contractualData?.data?.contractualObligations).length > 0
    ) {
      setDataList(contractualData?.data?.contractualObligations);
    }
  }, [contractualData?.data?.contractualObligations]);

  const { mutate: postImage, isLoading: progressLoading } = useMutation(useUploadImage, {
    onSuccess: ({ data: uploadRes }) => {
      Toast.success("File uploaded successfully");
      setFile(uploadRes?.url);
    },

    onError: (error) => {
      Toast.error("something went wrong");
      console.log(error);
    },
  });
  console.log(file);

  const { mutate: postObligation } = useMutation(updateExec, {
    onError: (error) => {
      console.log(error);
      Toast.error("document not saved");
    },
    onSuccess: () => {
      Toast.success("Saved document successfully");
      if (newNext) {
        next();
      }
    },
  });
  const { mutate: acceptSuggest, isLoading: acceptLoading } = useMutation(acceptSugExec, {
    onError: (error) => {
      console.log(error);
      Toast.error("Request failed to deliver");
    },
    onSuccess: () => {
      Toast.success(" Request accepted");
    },
  });
  const { mutate: acceptRecord, isLoading: recordLoading } = useMutation(acceptRecExec, {
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
      coDocuments: file,
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
    const data = { contractualObligations: dataList };
    if (dataList.length !== 0) {
      if (sugDocId) {
        const payLoad = { flag: "contractualObligations", data: data, orgId: sugDocId };
        acceptSuggest(payLoad);
      } else if (recDocId) {
        const payLoad = { flag: "contractualObligations", data: data, orgId: recDocId };
        acceptRecord(payLoad);
      } else {
        const payload = {
          data: data,
          flag: "contractualObligations",
          orgId: requestId,
          execOrgDocId: execDocID,
        };
        postObligation(payload);
      }
    } else Toast.error("Please add a record");
  };

  const initialValues: IContractProps = {
    date: "",
    type: "",
    assetsLiquidated: "",
    debtsDischarged: "",
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
      <p className="font-[700] text-2xl">Contractual Obligations</p>

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
            id="date"
            isRequired={true}
            label="Date"
            placeholder=""
            value={values.date}
            error={getError("date")}
            type="date"
            onChange={handleChange}
            name="date"
          />
        </div>
        <div>
          <InputText
            id="assetsLiquidated"
            isRequired={true}
            label="Asset Liquidated"
            placeholder="state your liquidated assets"
            value={values.assetsLiquidated}
            error={getError("assetsLiquidated")}
            type="text"
            onChange={handleChange}
            name="assetsLiquidated"
          />
        </div>
        <div>
          <InputText
            id="debtsDischarged"
            isRequired={true}
            label="Debts Discharged"
            placeholder="Enter Debts discharged"
            value={values.debtsDischarged}
            error={getError("debtsDischarged")}
            type="text"
            onChange={handleChange}
            name="debtsDischarged"
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
        {open === 1 && <SaveDraftModal data={contractData} onClose={handleClose} next={next} setData={setData} />}
        {open === 2 && (
          <SavePublish data={contractData} onClose={handleClose} next={next} setData={setData} execDocID={execDocID} />
        )}
      </form>
    </div>
  );
};

export default Credit;
