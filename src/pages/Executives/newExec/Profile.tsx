import React, { useState, useEffect } from "react";
import { InputText, SelectInput, TextArea } from "@/components";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
import SaveDraftModal from "./SaveDraftModal";
import SavePublish from "./savePublish";
import { IDataProps } from "@/interface/userCreation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { useUploadImage } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useNavigate, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import { acceptRecExec, acceptSugExec, getSingleExec, updateExec } from "@/services/executiveService";
import { IExecData } from "@/interface/executiveTypes";
import { ClipLoader } from "react-spinners";
import { transformToLableValue } from "@/utils";
import countryData from "@/assets/data/countries.json";
import stateData from "@/assets/data/states.json";
import industryData from "@/assets/data/industries.json";
import organizationSizeData from "@/assets/data/org_size.json";

interface IInitialData {
  executiveName?: string;
  organizationName?: string;
  executiveDescription?: string;
  organizationSize?: string;
  executiveAvatar?: string;
  industry?: string;
  location?: string;
  country?: string;
  website?: string;
  executivePosition?: string;
}

interface IActionProps {
  next: () => void;
  prev: () => void;
  data: IDataProps;
  setData: (data: IDataProps | ((prevData: IDataProps) => IDataProps)) => void;
  execDocID: string;
  sugDocId: string;
  recDocId: string;
}

const validationSchema = Yup.object({
  executiveName: Yup.string().required("Please fill in this field"),
  organizationName: Yup.string().required("Please fill in this field"),
  // executiveDescription: Yup.string().required("Please fill in this field"),
  // organizationSize: Yup.string().required("Please fill in this field"),
  // industry: Yup.string().required("Please fill in this field"),
  // location: Yup.string().required("Please fill in this field"),
  // country: Yup.string().required("Please fill in this field"),
  // website: Yup.string().required("Please fill in this field"),
  executivePosition: Yup.string().required("Please fill in this field"),
});

const Profile: React.FC<IActionProps> = ({ next, prev, setData, execDocID, sugDocId, recDocId }) => {
  const [getPrev, setGetPrev] = useState<IExecData>();
  const [open, setOpen] = useState<number | null>(null);
  const [newNext, setNext] = useState(false);
  const [loadProfile, setLoadProfile] = useState(false);
  const { id } = useParams();
  const requestId = id || "undefined";
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const transformedCountryData = transformToLableValue(countryData, "name");

  const getStatesForCountry = (countryName: string) => {
    const data = stateData.find((country) => country.name === countryName)?.states || [{}];
    return transformToLableValue(data, "name");
  };

  const { data: getData, isLoading: getLoading } = useQuery(["singleRequest"], () => {
    if (requestId) {
      return getSingleExec(requestId);
    }
    return null;
  });
  useEffect(() => {
    if (getData?.data && Object.keys(getData.data).length > 0) {
      setGetPrev(getData?.data?.theExecutive);
    }
  }, [getData?.data]);

  console.log(getPrev?.profile?.location?.split(",")[1]);

  const initialValues: IInitialData = {
    executiveName: getPrev?.profile?.executiveName || "",
    organizationName: getPrev?.profile?.organizationName || "",
    executiveAvatar: getPrev?.profile?.executiveAvatar || "",
    executiveDescription: getPrev?.profile?.executiveDescription || "",
    organizationSize: getPrev?.profile?.organizationSize || "",
    industry: getPrev?.profile?.industry || "",
    location: getPrev?.profile?.location?.split(",")[0] || "",
    country: getPrev?.profile?.location?.split(",")[1] || "",
    website: getPrev?.profile?.website || "",
    executivePosition: getPrev?.profile?.executivePosition || "",
  };

  const handleClose = () => {
    setOpen(null);
  };

  const { mutate: postProfile } = useMutation(updateExec, {
    onError: () => {
      Toast.error("failed to save profile");
    },
    onSuccess: () => {
      Toast.success("profile saved");
      loadProfile && navigate(0);
      if (newNext) {
        next();
      }
    },
  });

  const { mutate: postImage } = useMutation(useUploadImage, {
    onSuccess: ({ data: uploadRes }) => {
      const userData = {
        profile: {
          ...initialValues,
          executiveAvatar: uploadRes?.url,
        },
      };
      const payload = { data: userData, orgId: requestId, flag: "profile" };
      postProfile(payload);
      Toast.success("upload success");
      queryClient.invalidateQueries({ queryKey: ["singleRequest"] });
      setLoadProfile(true);
    },

    onError: (error) => {
      Toast.error("something went wrong");
      console.log(error);
    },
  });

  const { mutate: acceptSuggest, isLoading: acceptLoading } = useMutation(acceptSugExec, {
    onError: () => {
      Toast.error("Request failed to deliver");
    },
    onSuccess: () => {
      Toast.success(" Request accepted");
    },
  });

  const { mutate: acceptRecord, isLoading: recordLoading } = useMutation(acceptRecExec, {
    onError: () => {
      Toast.error("Request failed to deliver");
    },
    onSuccess: () => {
      Toast.success("Record accepted");
    },
  });

  const onSubmit = async (data: IInitialData) => {
    const profile = {
      profile: {
        executiveName: data.executiveName,
        executiveAvatar: data.executiveAvatar,
        organizationName: data.organizationName,
        executiveDescription: data.executiveDescription,
        organizationSize: data.organizationSize,
        industry: data.industry,
        location: data.location + ", " + data.country,
        website: data.website,
        executivePosition: data.executivePosition,
      },
    };

    if (sugDocId) {
      const payLoad = { flag: "profile", data: profile, orgId: sugDocId };
      acceptSuggest(payLoad);
    } else if (recDocId) {
      const payLoad = { flag: "profile", data: profile, orgId: recDocId };
      acceptRecord(payLoad);
    } else {
      const payLoad = { flag: "profile", data: profile, orgId: requestId, execOrgDocId: execDocID || "" };
      postProfile(payLoad);
    }
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const handleModal = (id: number) => {
    setOpen(JSON.stringify(errors).length !== 2 ? null : id);
  };

  const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Please select only one image");
      return;
    } else {
      const imageFile = new FormData();
      imageFile.append("file", e.target.files[0]);
      postImage({ imageFile, flags: "organizationProfiles" });
    }
  };

  const profile = {
    profile: {
      executiveName: values.executiveName,
      organizationName: values.organizationName,
      executiveDescription: values.executiveDescription,
      organizationSize: values.organizationSize,
      industry: values.industry,
      location: values.location + ", " + values.country,
      website: values.website,
    },
  };

  const getError = (key: keyof IInitialData) => {
    return touched[key] && errors[key];
  };
  if (getLoading) {
    return (
      <div className="flex w-full h-screen justify-center items-center">
        <Circles color="#000000" />
      </div>
    );
  }

  return (
    <div>
      <p className="font-[700] text-2xl">Profile</p>
      <div className="flex space-x-3 mt-5">
        {getPrev?.profile?.executiveAvatar ? (
          <div className="w-[64px] h-[64px] rounded-lg overflow-hidden ">
            <img src={getPrev?.profile?.executiveAvatar} alt="" className="object-cover w-[64px] h-[64px]" />
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden w-[64px] h-[64px] mt-3 text-[700] flex justify-center items-center bg-[#f59e0b] text-4xl text-white">
            {getPrev?.profile?.executiveName?.charAt(0)}
          </div>
        )}
        <div className="space-y-2">
          <p className="font-[600] ">Executive Profile Image</p>
          <div className="">
            <label
              htmlFor="dropzone-file"
              className="rounded-2xl text-xs flex w-fit p-1 px-2 items-center justify-center border cursor-pointer "
            >
              <div className="flex flex-col items-center justify-center">
                <p className="text-xs text-grey-500">Upload logo</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={(e) => handleUploads(e)} />
            </label>
          </div>
        </div>
      </div>
      <form action="" onSubmit={handleSubmit} className="my-5">
        <div>
          <InputText
            id="executiveName"
            isRequired={true}
            label="Executive Name"
            placeholder="Enter Executive name"
            value={values.executiveName}
            error={getError("executiveName")}
            type="text"
            onChange={handleChange}
            name="executiveName"
          />
        </div>
        <div>
          <InputText
            id="executivePosition"
            isRequired={true}
            label="Position"
            placeholder="Enter the executive ranking position"
            value={values.executivePosition}
            error={getError("executivePosition")}
            type="text"
            onChange={handleChange}
            name="executivePosition"
          />
        </div>
        <div>
          <TextArea
            label="Executive Description"
            name="executiveDescription"
            placeholder={values?.executiveDescription ? values?.executiveDescription : "Briefly describe the executive"}
            id="executiveDescription"
            isRequired={true}
            onChange={handleChange}
            type="text"
            error={getError("executiveDescription")}
            className="h-[123px]"
          />
        </div>
        <div>
          <div>
            <InputText
              id="organizationName"
              isRequired={true}
              label="Organization Name"
              placeholder="Enter organization name"
              value={values.organizationName}
              error={getError("organizationName")}
              type="text"
              onChange={handleChange}
              name="organizationName"
            />
          </div>
          <SelectInput
            label="Organisation Size"
            name="organizationSize"
            id="organizationSize"
            value={values.organizationSize}
            options={organizationSizeData}
            onChange={handleChange}
            isRequired={true}
            error={getError("organizationSize")}
          />
        </div>
        <div className="mt-5">
          <SelectInput
            label="Industry"
            name="industry"
            id="industry"
            value={values.industry}
            options={industryData}
            error={getError("industry")}
            onChange={handleChange}
            isRequired={true}
          />
        </div>
        <div className="grid grid-cols-2 space-x-3 items-center mt-5">
          <div>
            <SelectInput
              label="Country"
              name="country"
              id="country"
              value={values.country}
              options={transformedCountryData}
              error={getError("country")}
              onChange={handleChange}
              isRequired={true}
            />
          </div>

          <div>
            <SelectInput
              label="State"
              name="location"
              id="location"
              value={values.location}
              options={getStatesForCountry(values.country as string)}
              onChange={handleChange}
              isRequired={true}
              error={getError("location")}
            />
          </div>
        </div>
        <div className="mt-5">
          <InputText
            id="website"
            isRequired={true}
            label="Website"
            placeholder="Enter your Org name"
            value={values.website}
            error={getError("website")}
            type="text"
            onChange={handleChange}
            name="website"
          />
        </div>
        <>
          <div className="flex justify-center my-7">
            <div className="flex items-center w-[60%] justify-between">
              <div className="flex space-x-2 items-center rounded-md border border-grey-100 cursor-pointer p-1 px-2">
                <div className="bg-grey-100 p-1 rounded" onClick={() => prev()}>
                  <IoChevronBack size={10} />
                </div>
                <p className="text-sm">Previous</p>
              </div>
              <button
                type="submit"
                className="flex space-x-2 items-center rounded-md border border-grey-100 cursor-pointer p-1"
                onClick={() => setNext(true)}
              >
                <p className="pl-2 text-sm">Save and continue</p>
                <div className="bg-grey-100 p-1 rounded">
                  <IoChevronForward size={10} />
                </div>
              </button>
            </div>
          </div>
          <hr className="border-grey-100 mb-7" />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-grey-100 rounded-md px-3 py-2 flex items-center justify-center active:bg-grey-900 active:text-white cursor-pointer text-sm"
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
                className="bg-grey-900 text-white rounded-md px-3 py-2 flex active:bg-grey-200 items-center justify-center text-sm"
                onClick={() => handleModal(2)}
              >
                <p>Publish Executive</p>
              </button>
            </div>
          </div>
        </>
        {open === 1 && <SaveDraftModal data={profile} onClose={handleClose} next={next} setData={setData} />}
        {open === 2 && (
          <SavePublish
            data={profile}
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

export default Profile;
