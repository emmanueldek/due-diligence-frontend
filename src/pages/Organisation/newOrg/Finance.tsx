import React, { useState, useEffect } from "react";
import { InputFile, InputText } from "@/components";
import { IoChevronBack, IoChevronDown, IoChevronForward, IoChevronUp, IoRemoveOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
// import SaveDraftModal from "./SaveDraftModal";
import SavePublish from "./savePublish";
import { IDataProps, IFinancialProps } from "@/interface/userCreation";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  acceptRecOrg,
  acceptSugOrg,
  getOrgData,
  updateOrg,
  // useUploadImage,
  useUploadPdf,
} from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useParams } from "react-router-dom";
import { IoDocumentAttach } from "react-icons/io5";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Circles, ProgressBar } from "react-loader-spinner";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

interface IOrganisationProps {
  year?: string;
  audFinancials?: string;
  audBy?: string;
  source?: string;
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
  year: Yup.string().required("Please fill in this field"),
  audFinancials: Yup.string().required("Please fill in this field"),
  audBy: Yup.string().required("Please fill in this field"),
  source: Yup.string().required("Please fill in this field"),
});

const Finance: React.FC<IactionProps> = ({ next, prev, data, setData, execDocID, sugDocId, recDocId }) => {
  const { id } = useParams();
  const requestId = id || "";
  const [dataTab, setDataTab] = useState<number | null>(null);
  const [newNext, setNext] = useState(false);
  const [file, setFile] = useState<Array<string>>([]);
  const [dataList, setDataList] = useState<IFinancialProps[]>(data.financial || []);
  const [check, setCheck] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const financialData = { financial: dataList };
  const [checkAdd, setCheckAdd] = useState(false);

  const { data: finData, isLoading: incomingData } = useQuery(
    ["financialStatements", "financialStatements", requestId],
    () => getOrgData("financialStatements", requestId),
  );

  useEffect(() => {
    if (finData?.data?.financialStatements && Object.keys(finData.data.financialStatements).length > 0)
      setDataList(finData?.data?.financialStatements);
    console.log(finData?.data?.financialStatements);
  }, [finData?.data?.financialStatements]);

  // const { mutate: postImage, isLoading: progressLoading } = useMutation(useUploadImage, {
  //   onSuccess: ({ data: uploadRes }) => {
  //     Toast.success("File uploaded successfully");
  //     setFile((prev: any) => {
  //       return [...prev, uploadRes?.url];
  //     });
  //   },

  //   onError: (error) => {
  //     Toast.error("something went wrong");
  //     console.log(error);
  //   },
  // });
  const { mutate: postPdf, isLoading: pdfUploading } = useMutation(useUploadPdf, {
    onSuccess: ({ data: uploadRes }) => {
      Toast.success("File uploaded successfully");
      setFile((prev: any) => {
        return [...prev, uploadRes?.name];
      });
    },

    onError: (error) => {
      Toast.error("something went wrong");
      console.log(error);
    },
  });

  const { mutate: postFinance } = useMutation(updateOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("Financials not saved");
    },
    onSuccess: () => {
      Toast.success("Saved financials successfully");
      if (newNext) {
        next();
      }
    },
  });

  const { mutate: acceptSuggest, isLoading: acceptLoading } = useMutation(acceptSugOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("profile request failed to deliver");
    },
    onSuccess: () => {
      Toast.success(" profile request accepted");
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
      let documentArray = Array.from(e.target.files);
      documentArray.forEach((doc) => {
        const imageFile = new FormData();
        imageFile.append("file", doc);
        postPdf({ imageFile, flags: "organizationDocuments" });
      });
    }
  };
  const initialValues: IFinancialProps = {
    year: "",
    audFinancials: "",
    audBy: "",
    source: "",
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleModal = (id: number) => {
    setOpen(JSON.stringify(errors).length !== 2 ? null : id);
  };

  // const onSubmit = async (data: IOrganisationProps) => {
  //   const newData = {
  //     ...data,
  //     fsDocuments: file,
  //   };
  //   if (dataTab !== null) {
  //     // Update existing entry in the dataList
  //     const updatedDataList = [...dataList];
  //     updatedDataList[dataTab] = newData;
  //     setDataList(updatedDataList);
  //     setDataTab(null); // Clear the selected index
  //     resetForm();
  //     console.log("first", updatedDataList, dataList);
  //   } else {

  //     console.log("second");
  //   }
  // };

  const onSubmit = async (data: IOrganisationProps) => {
    let isDataExist: boolean;

    const checkIfDataExist: () => boolean = () => {
      let res = false;
      dataList.forEach((item) => {
        if (item.year !== data.year) {
          res = false;
        } else {
          res = true;
        }
      });
      return res;
    };

    isDataExist = checkIfDataExist();
    console.log(checkIfDataExist());

    const newData = {
      ...data,
      fsDocuments: file,
    };
    if (dataTab !== null && isDataExist) {
      // Update existing entry in the dataList
      const updatedDataList = [...dataList];
      updatedDataList[dataTab] = newData;
      setDataList(updatedDataList);
      setDataTab(null); // Clear the selected index
      resetForm();
      setFile([]);
    } else if (dataTab === null && !isDataExist) {
      setDataList([...dataList, newData]);
      if (checkAdd) {
        setCheckAdd(false);
        resetForm();
        setFile([]);
      }
    } else if (dataTab === null && isDataExist) {
      toast.error("Data already exist");
    }
  };

  const handleQuerySubmit = () => {
    const data = { financialStatements: dataList };
    if (dataList.length !== 0) {
      if (sugDocId) {
        const payLoad = { flag: "financialStatements", data: data, orgId: sugDocId };
        acceptSuggest(payLoad);
      } else if (recDocId) {
        const payLoad = { flag: "financialStatements", data: data, orgId: recDocId };
        acceptRecord(payLoad);
      } else {
        const payload = {
          data: data,
          flag: "financialStatements",
          orgId: requestId,
          execOrgDocId: execDocID,
        };
        postFinance(payload);
      }
    } else Toast.error("Please add a record");
  };

  const { handleChange, setValues, values, handleSubmit, errors, touched, resetForm } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const handleEdit = (index: number) => {
    setValues(dataList[index]);
    setCheck(index);
    setDataTab(index);
    setFile((prev: any) => {
      if (dataList[index]?.fsDocuments) {
        return [dataList[index]?.fsDocuments];
      } else {
        return prev;
      }
    });
  };

  const handleDelete = (index: number) => {
    const updatedDataList = [...dataList];
    updatedDataList.splice(index, 1);
    setDataList(updatedDataList);
    setDataTab(null);
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
      <p className="font-[700] text-2xl">Financial Statements</p>

      <div className="space-y-2">
        {dataList?.map((data, i) => (
          <div
            className="rounded-md bg-grey-100 p-3 flex items-center justify-between"
            key={i}
            onClick={() => handleEdit(i)} // Allow editing when a row is clicked
          >
            <p>{data.year}</p>
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
            id="year"
            isRequired={true}
            label="Year"
            placeholder="FY 16"
            value={values.year}
            error={getError("year")}
            type="text"
            onChange={handleChange}
            name="year"
          />
        </div>
        <div>
          <InputText
            id="audFinancials"
            isRequired={true}
            label="Audited Financials"
            placeholder="https://auditlink.com/3787g37ss"
            value={values.audFinancials}
            error={getError("audFinancials")}
            type="text"
            onChange={handleChange}
            name="audFinancials"
          />
        </div>
        <div>
          <InputText
            id="auditBy"
            isRequired={true}
            label="Audited by"
            placeholder="FIRS"
            value={values.audBy}
            error={getError("audBy")}
            type="text"
            onChange={handleChange}
            name="audBy"
          />
        </div>
        <div>
          <InputText
            id="source"
            isRequired={true}
            label="Source"
            placeholder="Enter source"
            value={values.source}
            error={getError("source")}
            type="text"
            onChange={handleChange}
            name="source"
          />
        </div>
        <div>
          <p className="text-sm mb-2 font-medium">Upload supporting document</p>
          <div className="mb-6">
            <InputFile onChange={(e) => handleUploads(e)} fileType=".pdf" />
            {pdfUploading && (
              <div>
                <ProgressBar height={30} width={""} borderColor="#000000" barColor="#008000" />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {file &&
              file.map((f: any, i: number) => {
                return (
                  <div key={i}>
                    <div className="flex items-center space-x-3">
                      <div className="bg-grey-100 rounded w-[100px] h-[128px] flex items-center justify-center">
                        <IoDocumentAttach size={50} color="#808080" />
                      </div>
                      <div
                        className="rounded-full flex items-center justify-center bg-red-500 w-[20px] h-[20px] active:bg-red-800 cursor-pointer"
                        onClick={() => setFile((prev: Array<string>) => prev.filter((_, index: number) => index !== i))}
                      >
                        <RiDeleteBin5Fill size={10} color="#ffffff" />
                      </div>
                    </div>
                    <p className="text-xs text-green-600 my-2">{f.slice(81)}</p>
                  </div>
                );
              })}
          </div>
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
              <p>Publish changes</p>
            </button>
          </div>
        </div>
        {/* {open === 1 && <SaveDraftModal data={financialData} onClose={handleClose} next={next} setData={setData} />} */}
        {open === 2 && (
          <SavePublish data={financialData} onClose={handleClose} next={next} setData={setData} execDocID={execDocID} />
        )}
      </form>
    </div>
  );
};

export default Finance;
