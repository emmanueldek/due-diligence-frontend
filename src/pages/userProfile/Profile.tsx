// import OranisationLogo from "@/assets/images/organisation_logo.png";
import useUser from "@/store/useUser";
import { useFormik } from "formik";
import { InputText, LoadingBtn } from "@/components";
// import { SetStateAction } from "react";
import { TUpdateProfile, updateProfileValidationSchema } from "@/utils/validationSchemas";
import { useMutation } from "@tanstack/react-query";
import { useUploadImage } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { editProfile } from "@/services/workspaceService";
import { useNavigate } from "react-router-dom";

// interface IProfileProps {
//   setOpenModal: React.Dispatch<SetStateAction<boolean>>;
// }

interface IProfile {
  avatar: string;
  email: string;
  firstName: string;
  lastName: string;
  position: string;
}

function Profile() {
  const { user } = useUser();
  const navigate = useNavigate();

  const initialValues: TUpdateProfile = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    position: user?.position || "",
    avatar: user?.avatar || ",",
  };
  const { mutate: profileEdit, isLoading } = useMutation(editProfile, {
    onSuccess: () => {
      Toast.success("profile updated successfully");
      navigate(0);
    },
    onError: (error) => {
      Toast.error(`${error}`);
    },
  });

  const { mutate: postImage } = useMutation(useUploadImage, {
    onSuccess: ({ data: uploadRes }) => {
      const userData: Partial<IProfile> = {
        ...initialValues,
        avatar: uploadRes?.url,
      };
      profileEdit(userData as IProfile);
    },

    onError: (error) => {
      Toast.error("something went wrong");
      console.log(error);
    },
  });

  const onSubmit = (profileData: TUpdateProfile) => {
    const payload = { ...profileData };
    profileEdit(payload as IProfile);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: updateProfileValidationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof TUpdateProfile) => {
    return touched[key] && errors[key];
  };

  const handleUploads = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      console.error("Please select only one image");
      return;
    } else {
      const imageFile = new FormData();
      imageFile.append("file", e.target.files[0]);
      postImage({ imageFile, flags: "avatars" });
    }
  };

  return (
    <div className="px-6">
      <h2 className="mb-4 md:mb-0 font-bold text-xl">Profile</h2>

      <div className="my-4 flex items-start">
        <figure className="w-[64px] h-[64px] overflow-hidden rounded-md mb-2">
          <img className="w-full h-full object-cover" src={user.avatar} alt="" />
        </figure>

        <div className="ml-3">
          <p className="text-sm leading-[20px] mb-2">Change profile picture</p>

          <label htmlFor="upload_logo" className="cursor-pointer flex rounded-md border w-fit border-grey-300 p-1">
            <p className="text-xs text-grey-400">Upload photo</p>
            <input className="hidden" id="upload_logo" type="file" onChange={(e) => handleUploads(e)} />
          </label>
        </div>
      </div>

      <form action="" onSubmit={handleSubmit} className="space-y-1">
        <InputText
          id={"first_name"}
          isRequired={true}
          name={"firstName"}
          placeholder={user?.firstName || ""}
          label={"First Name"}
          value={values.firstName}
          type={"text"}
          onChange={handleChange}
          error={getError("firstName")}
        />

        <InputText
          id={"last_name"}
          isRequired={true}
          name={"lastName"}
          placeholder={user?.lastName || ""}
          label={"Last Name"}
          value={values.lastName}
          type={"text"}
          onChange={handleChange}
          error={getError("lastName")}
        />

        <InputText
          id={"work_email"}
          isRequired={true}
          name={"email"}
          placeholder={user?.email || ""}
          label={"Work Email"}
          value={values.email}
          type={"text"}
          onChange={handleChange}
          error={getError("email")}
        />
        <InputText
          id={"position"}
          isRequired={true}
          name={"position"}
          placeholder={""}
          label={"Position"}
          value={values.position}
          type={"text"}
          onChange={handleChange}
          error={getError("position")}
        />

        {/* <p onClick={() => setOpenModal(true)} className="text-link cursor-pointer hover:underline transition-all my-4">
          Change password
        </p> */}

        <LoadingBtn isLoading={isLoading} type="submit" className="w-full h-10" text="Save" />
      </form>
    </div>
  );
}

export default Profile;
