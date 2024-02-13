import React, { useState, useEffect } from "react";
import { InputText } from "@/components";
import { IoChevronBack, IoChevronDown, IoChevronForward, IoChevronUp, IoRemoveOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveDraftModal from "./SaveDraftModal";
import SavePublish from "./savePublish";
import { IDataProps, IManagementProps } from "@/interface/userCreation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { acceptRecOrg, acceptSugOrg, getOrgData, updateOrg } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { ClipLoader } from "react-spinners";

interface IOrganisationProps {
  name?: string;
  position?: string;
  location?: string;
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
  name: Yup.string().required("Please fill in this field"),
  position: Yup.string().required("Please fill in this field"),
  location: Yup.string().required("Please fill in this field"),
});

const Management: React.FC<IactionProps> = ({ next, prev, data, setData, execDocID, sugDocId, recDocId }) => {
  const { id } = useParams();
  const requestId = id || "";
  const [dataTab, setDataTab] = useState<number | null>(null);
  const [newNext, setNext] = useState(false);
  const [dataList, setDataList] = useState<IOrganisationProps[]>(data.management || []);
  const [check, setCheck] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const managementData = { management: dataList };
  const [checkAdd, setCheckAdd] = useState(false);

  const { data: manageData, isLoading: incomingData } = useQuery(["management", "management", requestId], () =>
    getOrgData("management", requestId),
  );

  useEffect(() => {
    if (manageData?.data?.management && Object.keys(manageData.data.management).length > 0) {
      setDataList(manageData?.data?.management);
    }
  }, [manageData?.data?.management]);

  const { mutate: postManagement } = useMutation(updateOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("Management not saved");
    },
    onSuccess: () => {
      Toast.success("Saved Management successfully");
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

  const initialValues: IManagementProps = {
    name: "",
    position: "",
    location: "",
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleModal = (id: number) => {
    setOpen(JSON.stringify(errors).length !== 2 ? null : id);
  };

  const onSubmit = async (data: IOrganisationProps) => {
    if (dataTab !== null) {
      // Update existing entry in the dataList
      const updatedDataList = [...dataList];
      updatedDataList[dataTab] = data;
      setDataList(updatedDataList);
      setDataTab(null); // Clear the selected index
    } else {
      setDataList([...dataList, data]);
      if (checkAdd) {
        setCheckAdd(false);
        resetForm();
      }
    }
  };
  const handleQuerySubmit = () => {
    const data = { management: dataList };
    if (dataList.length !== 0) {
      if (sugDocId) {
        const payLoad = { flag: "management", data: data, orgId: sugDocId };
        acceptSuggest(payLoad);
      } else if (recDocId) {
        const payLoad = { flag: "management", data: data, orgId: recDocId };
        acceptRecord(payLoad);
      } else {
        const payload = {
          data: data,
          flag: "management",
          orgId: requestId,
          execOrgDocId: execDocID,
        };
        postManagement(payload);
      }
    } else Toast.error("Please add a record");
  };

  console.log(dataList);

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
      <p className="font-[700] text-2xl mb-2">Management/Regulatory</p>

      <div className="space-y-2">
        {dataList?.map((data, i) => (
          <div
            className="rounded-md bg-grey-100 p-3 flex items-center justify-between"
            key={i}
            onClick={() => handleEdit(i)} // Allow editing when a row is clicked
          >
            <p>{data.name}</p>
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
            id="name"
            isRequired={true}
            label="Name"
            placeholder="Enter the name"
            value={values.name}
            error={getError("name")}
            type="text"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div>
          <InputText
            id="position"
            isRequired={true}
            label="Position"
            placeholder="Enter your position"
            value={values.position}
            error={getError("position")}
            type="text"
            onChange={handleChange}
            name="position"
          />
        </div>
        <div>
          <InputText
            id="location"
            isRequired={true}
            label="Location"
            placeholder="Enter location"
            value={values.location}
            error={getError("location")}
            type="text"
            onChange={handleChange}
            name="location"
          />
        </div>
        {/* <div>
          <p className="text-sm mb-2 font-medium">Upload supporting document</p>
          <InputFile onChange={(e) => handleSelect(e)} />
        </div> */}

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
              <p>Publish Organization</p>
            </button>
          </div>
        </div>
        {open === 1 && <SaveDraftModal data={managementData} onClose={handleClose} next={next} setData={setData} />}
        {open === 2 && (
          <SavePublish
            data={managementData}
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

export default Management;
