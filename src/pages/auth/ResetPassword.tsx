import React from "react";
import RecordLogo from "@/assets/images/RecordLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { InputPassword, LoadingBtn, PrimaryBtn } from "@/components";
import { Back } from "@/components/svgs/Back";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createNewPassword } from "@/services/authServices";
import { Toast } from "@/config/toast";

interface IDataProps {
  password: string;
}

const initialValues: IDataProps = {
  password: "",
};
// Password must be at least 8 characters long, with at least 1 uppercase letter, 1 lowercase letter, and 1 symbol

const validationSchema = Yup.object({
  password: Yup.string()
    .required("Please fill in this field")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Your password must have at least 1 lowercase letter")
    .matches(/[A-Z]/, "Your password must have at least 1 uppercase letter")
    .matches(/[!@#$%^&*()_+{}[\]:;<>,.?~\\|]/, "Your password must have at least 1 symbol"),
});

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = id || "";

  const onSubmit = (data: IDataProps) => {
    mutate({ token, password: data.password });
    // navigate("/auth/login");
  };
  console.log("token", token);
  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof IDataProps) => {
    return touched[key] && errors[key];
  };

  const { mutate, isLoading } = useMutation(createNewPassword, {
    onError: (error) => {
      Toast.error(`${error}`);
    },
    onSuccess: () => {
      Toast.success("Password reset successful!");
      navigate("/auth/login");
    },
  });
  return (
    <div>
      <div className="w-[564px] flex flex-col items-center rounded-xl shadow-lg p-10">
        <div className="ml-[-18px] sm:ml-[-1px] scale-75 cursor-pointer flex space-x-2 items-center">
          <img src={RecordLogo} alt="" />
        </div>
        <div className="text-center mt-5">
          <p className="font-[700] text-4xl">Create New Password</p>
          <p className="text-lg font-[400] px-12 text-grey-400">
            Choose a new password distinct from your previous one and easy to remember.
          </p>
        </div>
        <div className="w-full mt-8">
          <form action="" onSubmit={handleSubmit} className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <InputPassword
                label="New Password"
                placeholder="Enter New Password"
                error={getError("password")}
                onChange={handleChange}
                isRequired={true}
                name="password" // Corrected the name attribute
                value={values.password}
              />
            </div>
            <div className="w-full pt-2">
              {isLoading ? (
                <LoadingBtn isLoading={true} text="loading..." className="w-full" />
              ) : (
                <PrimaryBtn text="Submit" type="submit" className="w-full" />
              )}
            </div>
          </form>
          <div
            className="font-600 text-[#475467] flex justify-center items-center mt-5 cursor-pointer space-x-2"
            onClick={() => navigate("/auth/login")}
          >
            <Back />
            <span>Back to log in</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
