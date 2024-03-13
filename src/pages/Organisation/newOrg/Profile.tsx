import React, { useState, useEffect } from "react";
import { InputFile, InputText, SelectInput, TextArea } from "@/components";
import { IoChevronBack, IoChevronForward, IoDocumentAttach } from "react-icons/io5";
import { useFormik } from "formik";
import * as Yup from "yup";
// import SaveDraftModal from "./SaveDraftModal";
import SavePublish from "./savePublish";
import { IDataProps } from "@/interface/userCreation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import {
  acceptRecOrg,
  acceptSugOrg,
  getSingleOrg,
  updateOrg,
  useUploadImage,
  useUploadPdf,
} from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useNavigate, useParams } from "react-router-dom";
import { Circles, ProgressBar } from "react-loader-spinner";
import { IOrganisationProps } from "@/interface/organisationTypes";
import { ClipLoader } from "react-spinners";
import { transformToLableValue } from "@/utils";
import countryData from "@/assets/data/countries.json";
import stateData from "@/assets/data/states.json";
import industryData from "@/assets/data/industries.json";
import organizationSizeData from "@/assets/data/org_size.json";
import { RiDeleteBin5Fill } from "react-icons/ri";

interface IInitialData {
  organizationName?: string;
  organizationDescription?: string;
  organizationSize?: string;
  organizationLogo?: string;
  industry?: string;
  location?: string;
  country?: string;
  website?: string;
  cacNumber?: string;
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
  organizationName: Yup.string().required("Please fill in this field"),
  // organizationDescription: Yup.string().required("Please fill in this field"),
  // organizationSize: Yup.string().required("Please fill in this field"),
  industry: Yup.string().required("Please fill in this field"),
  // location: Yup.string().required("Please fill in this field"),
  // country: Yup.string().required("Please fill in this field"),
  website: Yup.string().required("Please fill in this field"),
  cacNumber: Yup.string().required("Please fill in this field"),
});

const Profile: React.FC<IactionProps> = ({ next, prev, setData, execDocID, sugDocId, recDocId }) => {
  const [getPrev, setGetPrev] = useState<IOrganisationProps>();
  const [open, setOpen] = useState<number | null>(null);
  const [loadProfile, setLoadProfile] = useState(false);
  const [newNext, setNext] = useState(false);
  const [file, setFile] = useState<string>("");
  const [showEdit, setShowEdit] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const requestId = id || "undefined";
  const queryClient = useQueryClient();

  const { data: getData, isLoading: getLoading } = useQuery(["singleRequest"], () => {
    if (requestId) {
      return getSingleOrg(requestId);
    }
    return null;
  });

  useEffect(() => {
    if (getData?.data && Object.keys(getData.data).length > 0) {
      setGetPrev(getData?.data);
    }
    if (getData?.data?.theOrganization?.profile?.cacDocument) {
      setFile(getData?.data?.theOrganization?.profile?.cacDocument);
    }
  }, [getData?.data]);

  console.log(getData?.data);
  console.log(getPrev);

  const initialValues: IInitialData = {
    organizationName: getPrev?.theOrganization?.profile?.organizationName || "",
    organizationDescription: getPrev?.theOrganization?.profile?.organizationDescription || "",
    organizationSize: getPrev?.theOrganization?.profile?.organizationSize || "",
    industry: getPrev?.theOrganization?.profile?.industry || "",
    location: getPrev?.theOrganization?.profile?.location || "",
    country: getPrev?.theOrganization?.profile?.country || "",
    website: getPrev?.theOrganization?.profile?.website || "",
    organizationLogo: getPrev?.theOrganization?.profile?.organizationLogo || "",
    cacNumber: getPrev?.theOrganization?.profile?.cacNumber || "",
  };

  const handleClose = () => {
    setOpen(null);
  };

  const { mutate: postProfile } = useMutation(updateOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("failed to save profile");
    },
    onSuccess: (data) => {
      console.log(data);
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
          organizationLogo: uploadRes?.url,
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

  const { mutate: uploadCAC, isLoading: progressLoading } = useMutation(useUploadPdf, {
    onSuccess: ({ data: uploadRes }) => {
      setFile(uploadRes?.name);
      Toast.success("File uploaded successfully");
    },

    onError: (error) => {
      Toast.error("something went wrong");
      console.log(error);
    },
  });

  const { mutate: acceptSuggest, isLoading: acceptLoading } = useMutation(acceptSugOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("Request failed to deliver");
    },
    onSuccess: (data) => {
      console.log(data);
      Toast.success("Request accepted");
    },
  });

  const { mutate: acceptRecord, isLoading: recordLoading } = useMutation(acceptRecOrg, {
    onError: (error) => {
      console.log(error);
      Toast.error("Request failed to deliver");
    },
    onSuccess: (data) => {
      console.log(data);
      Toast.success("Request accepted");
    },
  });

  const transformedCountryData = transformToLableValue(countryData, "name");

  const getStatesForCountry = (countryName: string) => {
    const data = stateData.find((country) => country.name === countryName)?.states || [{}];
    return transformToLableValue(data, "name");
  };

  const onSubmit = async (data: IInitialData) => {
    const profile = {
      profile: {
        organizationName: data.organizationName,
        organizationDescription: data.organizationDescription,
        organizationSize: data.organizationSize,
        industry: data.industry,
        organizationLogo: data.organizationLogo,
        location: `${data.location} , ${data.country}`,
        website: data.website,
        cacNumber: data.cacNumber,
        cacDocument: file,
      },
    };
    setData((prevData: IDataProps) => ({
      ...prevData,
      ...profile,
    }));

    if (sugDocId) {
      const payLoad = { flag: "profile", data: profile, orgId: sugDocId };
      acceptSuggest(payLoad);
    } else if (recDocId) {
      const payLoad = { flag: "profile", data: profile, orgId: recDocId };
      acceptRecord(payLoad);
    } else {
      const payLoad = { flag: "profile", data: profile, orgId: requestId, execOrgDocId: execDocID };
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

  const handleCACFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      Toast.error("Please select only one file");
      return;
    } else {
      const imageFile = new FormData();
      imageFile.append("file", e.target.files[0]);
      uploadCAC({ imageFile, flags: "organizationProfiles" });
    }
  };

  const profile = {
    profile: {
      organizationName: values.organizationName,
      organizationDescription: values.organizationDescription,
      organizationSize: values.organizationSize,
      industry: values.industry,
      location: values.location + ", " + values.country,
      website: values.website,
      cacNumber: values.cacNumber,
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
        {getPrev?.theOrganization?.profile?.organizationLogo ? (
          <div className="w-[64px] h-[64px] rounded-lg overflow-hidden">
            <img
              src={getPrev?.theOrganization?.profile?.organizationLogo}
              alt=""
              className="object-cover w-[64px] h-[64px]"
            />
          </div>
        ) : (
          <div className="rounded-lg overflow-hidden w-[64px] h-[64px] mt-3 text-[700] flex justify-center items-center bg-[#f59e0b] text-4xl text-white">
            {getPrev?.theOrganization?.profile?.organizationName?.charAt(0)}
          </div>
        )}
        <div className="space-y-2">
          <p className="font-[600] ">Organisation Logo</p>
          <div className="">
            <label
              htmlFor="dropzone-file"
              className="rounded-2xl text-xs flex w-fit p-1 px-2 items-center justify-center border cursor-pointer "
            >
              <div className="flex flex-col items-center justify-center">
                <p
                  className="text-xs text-grey-500"
                  onClick={() => {
                    if (getPrev?.theOrganization?.profile?.organizationLogo) {
                      if (showEdit) {
                        setShowEdit(false);
                      } else {
                        setShowEdit(true);
                      }
                    } else {
                      setShowEdit(true);
                    }
                  }}
                >
                  Upload logo
                </p>
              </div>
              {showEdit && (
                <input id="dropzone-file" type="file" className="hidden" onChange={(e) => handleUploads(e)} />
              )}
            </label>
          </div>
        </div>
      </div>
      <form action="" onSubmit={handleSubmit} className="my-5">
        <div>
          <InputText
            id="organizationName"
            isRequired={true}
            label="Organisation Name"
            placeholder="Enter your Organisation name"
            value={values.organizationName}
            error={getError("organizationName")}
            type="text"
            onChange={handleChange}
            name="organizationName"
          />
        </div>
        <div>
          <TextArea
            label="Organisation Description"
            name="organizationDescription"
            placeholder={
              values?.organizationDescription ? values?.organizationDescription : "Briefly describe the organisation"
            }
            value={values.organizationDescription}
            isRequired={true}
            onChange={handleChange}
            type="text"
            error={getError("organizationDescription")}
            className="h-[123px]"
          />
        </div>
        <div>
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
        <div className="mt-5">
          <InputText
            id="cacNumber"
            isRequired={true}
            label="CAC Registration Number"
            placeholder="Enter your CAC Registration Number"
            value={values.cacNumber}
            error={getError("cacNumber")}
            type="text"
            onChange={handleChange}
            name="cacNumber"
          />
        </div>

        <div>
          <p className="text-sm mb-2 font-medium">Upload CAC document</p>
          <div className="mb-6">
            <InputFile onChange={(e) => handleCACFileUpload(e)} fileType=".pdf" />
            {progressLoading && (
              <div>
                <ProgressBar height={30} width={""} borderColor="#000000" barColor="#008000" />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {file && (
              <div>
                <div className="flex items-center space-x-3">
                  <div className="bg-grey-100 rounded w-[100px] h-[128px] flex items-center justify-center">
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
            )}
          </div>
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
                <p>Publish Organisation</p>
              </button>
            </div>
          </div>
        </>

        {/* {open === 1 && <SaveDraftModal data={profile} onClose={handleClose} next={next} setData={setData} />} */}
        {open === 2 && (
          <SavePublish
            data={profile}
            onClose={handleClose}
            next={next}
            setData={setData}
            // check="executive publish"
            check="organization publish"
            execDocID={execDocID}
          />
        )}
      </form>
    </div>
  );
};

export default Profile;
