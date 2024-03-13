import React, { useState } from "react";
import { InputFile, InputText } from "@/components";
import { IoChevronBack, IoChevronDown, IoChevronForward, IoChevronUp, IoRemoveOutline } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveDraftModal from "./SaveDraftModal";
import SavePublish from "./savePublish";
import { ICreditHistoryProps, IDataProps } from "@/interface/userCreation";

interface IOrganisationProps {
  type?: string;
  date?: string;
  assetLiquidated?: string;
  debtsDischarged?: string;
}

interface IactionProps {
  next: () => void;
  prev: () => void;
  data: IDataProps;
  setData: (data: IDataProps | ((prevData: IDataProps) => IDataProps)) => void;
  execDocID: string;
}

const validationSchema = Yup.object({
  type: Yup.string().required("Please fill in this field"),
  date: Yup.string().required("Please fill in this field"),
  assetLiquidated: Yup.string().required("Please fill in this field"),
  debtsDischarged: Yup.string().required("Please fill in this field"),
});

const Bankruptcy: React.FC<IactionProps> = ({ next, prev, data, setData, execDocID }) => {
  const [dataTab, setDataTab] = useState<number | null>(null);
  const [dataList, setDataList] = useState<IOrganisationProps[]>(data.creditHistory || []);
  const [check, setCheck] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const creditHistoryData = { creditHistory: dataList };

  console.log(creditHistoryData);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Please select only one file");
      return;
    }

    console.log(e.target.files[0]);

    // Rest of your file upload logic
  };

  const initialValues: ICreditHistoryProps = {
    type: "",
    date: "",
    assetsLiquidated: "",
    debtsDischarged: "",
    crdDocuments: "",
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
      setDataList([...dataList, data]); // Add new entry to the dataList
    }
  };

  console.log(dataList);

  const { handleChange, setValues, values, handleSubmit, errors, touched } = useFormik({
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

  return (
    <div>
      <p className="font-[700] text-2xl">Bankruptcy</p>

      <div className="space-y-2">
        {dataList.map((data, i) => (
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
            placeholder="Type"
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
            id="assetLiquidated"
            isRequired={true}
            label="Asset Liquidated"
            placeholder="ENter asset"
            value={values.assetLiquidated}
            error={getError("assetLiquidated")}
            type="text"
            onChange={handleChange}
            name="assetLiquidated"
          />
        </div>
        <div>
          <InputText
            id="debtsDischarged"
            isRequired={true}
            label="Debts Discharged"
            placeholder="Enter date discharged"
            value={values.debtsDischarged}
            error={getError("debtsDischarged")}
            type="text"
            onChange={handleChange}
            name="debtsDischarged"
          />
        </div>
        <div>
          <p className="text-sm mb-2 font-medium">Upload supporting document</p>
          <InputFile onChange={(e) => handleSelect(e)} fileType=".pdf" />
        </div>

        <button
          type="submit"
          className="border-dotted w-full border-2 border-grey-900 rounded-md p-3 my-3 flex items-center justify-center active:bg-grey-400"
        >
          <p>Add another record</p>
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
            <div className="flex space-x-1 items-center rounded-md border border-grey-100 p-1" onClick={() => next()}>
              <p className="pl-2">Save and continue</p>
              <div className="bg-grey-100 p-1 rounded">
                <IoChevronForward size={10} />
              </div>
            </div>
          </div>
        </div>
        <hr className="border-grey-100 mb-7" />
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => handleModal(1)}
            className="border rounded-md px-3 py-2 active:bg-grey-900 active:border-none active:text-white cursor-pointer flex items-center justify-center"
          >
            <p>Save to draft</p>
          </button>
          <div className="flex items-center space-x-2">
            <button
              type="submit"
              className="bg-grey-100 rounded-md px-3 py-2 flex items-center justify-center active:bg-grey-900 active:text-white cursor-pointer"
            >
              <p>Save</p>
            </button>
            <button
              type="submit"
              onClick={() => handleModal(2)}
              className="bg-grey-900 text-white rounded-md px-3 py-2 flex active:bg-grey-200 items-center justify-center"
            >
              <p>Publish Executive</p>
            </button>
          </div>
        </div>
        {open === 1 && <SaveDraftModal data={creditHistoryData} onClose={handleClose} next={next} setData={setData} />}
        {open === 2 && (
          <SavePublish
            data={creditHistoryData}
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

export default Bankruptcy;
