import React from "react";
import { InputText, LoadingBtn, SelectInput, TextArea } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
// import { useUploadImage } from "@/services/organisationService";
import { createOrg } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useNavigate } from "react-router-dom";
import { transformToLableValue } from "@/utils";
import countryData from "@/assets/data/countries.json";
import stateData from "@/assets/data/states.json";
import industryData from "@/assets/data/industries.json";
import organizationSizeData from "@/assets/data/org_size.json";

interface IInitialData {
  organizationName?: string;
  organizationDescription?: string;
  organizationSize?: string;
  industry?: string;
  location?: string;
  country?: string;
  website?: string;
}

const validationSchema = Yup.object({
  organizationName: Yup.string().required("Please fill in this field"),
  organizationDescription: Yup.string().required("Please fill in this field"),
  organizationSize: Yup.string().required("Please fill in this field"),
  industry: Yup.string().required("Please fill in this field"),
  location: Yup.string().required("Please fill in this field"),
  country: Yup.string().required("Please fill in this field"),
  website: Yup.string().required("Please fill in this field"),
});

const CreateOrg: React.FC = () => {
  // const [imageUrl, setImageUrl] = useState("");

  const initialValues: IInitialData = {
    organizationName: "",
    organizationDescription: "",
    organizationSize: "",
    industry: "",
    location: "",
    country: "",
    website: "",
  };

  const navigate = useNavigate();

  const { mutate } = useMutation(createOrg, {
    onSuccess: (data) => {
      console.log(data);
      Toast.success("Organisation created");
      setTimeout(() => {
        navigate("/organisation/drafts");
      }, 1000);
    },
    onError: (error) => {
      Toast.error(`${error}`);
      console.log(error);
    },
  });

  // const { mutate: postImage } = useMutation(useUploadImage, {
  //   onSuccess: ({ data: uploadRes }) => {
  //     setImageUrl(uploadRes?.url);
  //     Toast.success("upload success");
  //   },

  //   onError: (error) => {
  //     Toast.error("something went wrong");
  //     console.log(error);
  //   },
  // });

  const transformedCountryData = transformToLableValue(countryData, "name");

  const getStatesForCountry = (countryName: string) => {
    const data = stateData.find((country) => country.name === countryName)?.states || [{}];
    return transformToLableValue(data, "name");
  };

  const { isLoading: loadCreate } = useMutation(createOrg, {
    onSuccess: (data) => {
      console.log(data);
      Toast.success("Organization created");

      console.log(data);
    },
    onError: (error) => {
      Toast.error("Create organization failed");
      console.log(error);
    },
  });

  const onSubmit = async (data: IInitialData) => {
    const profile = {
      profile: {
        organizationName: data.organizationName,
        organizationDescription: data.organizationDescription,
        organizationSize: data.organizationSize,
        industry: data.industry,
        location: data.location + ", " + data.country,
        website: data.website,
      },
    };
    mutate(profile);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  // const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files || e.target.files.length === 0) {
  //     console.error("Please select only one image");
  //     return;
  //   } else {
  //     const imageFile = new FormData();
  //     imageFile.append("file", e.target.files[0]);
  //     postImage({ imageFile, flags: "organizationProfiles" });
  //   }
  // };

  const getError = (key: keyof IInitialData) => {
    return touched[key] && errors[key];
  };
  return (
    <div className="w-[70%]">
      {/* <p className="font-[700] text-2xl">Profile</p>
      <div className="flex space-x-3 mt-5">
        <div className="rounded-lg overflow-hidden w-[64px] h-[64px] mt-3 text-[700] flex justify-center items-center bg-white text-4xl text-white">
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="" />
            </div>
          )}
        </div>
        <div className="space-y-2">
          <p className="font-[600] ">Organisation Logo</p>
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
      </div> */}
      <form action="" onSubmit={handleSubmit} className="my-5">
        <div>
          <InputText
            id="organizationName"
            isRequired={true}
            label="Organisation Name"
            placeholder="Enter organisation name"
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
            placeholder="A forward-thinking tech company specializing in cutting-edge solutions for a smarter, more connected world."
            id="organizationDescription"
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
            placeholder="Enter website link"
            value={values.website}
            error={getError("website")}
            type="text"
            onChange={handleChange}
            name="website"
          />
        </div>
        <>
          {loadCreate ? (
            <div className="w-full">
              <LoadingBtn text="Loading" isLoading={loadCreate} />
            </div>
          ) : (
            <button
              type="submit"
              className="bg-grey-900 text-white rounded-md w-full px-3 py-2 flex active:bg-grey-200 items-center justify-center"
            >
              <p>Create organisation</p>
            </button>
          )}
        </>
      </form>
    </div>
  );
};

export default CreateOrg;
