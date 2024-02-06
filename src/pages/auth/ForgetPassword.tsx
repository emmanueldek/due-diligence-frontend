import React from "react";
import RecordLogo from "@/assets/images/RecordLogo.png";
import { useNavigate } from "react-router-dom";
import { InputText, LoadingBtn, PrimaryBtn } from "@/components";
import { Back } from "@/components/svgs/Back";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/authServices";
import { Toast } from "@/config/toast";

interface IDataProps {
  email: string;
}

const initialValues: IDataProps = {
  email: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid work email address").required("Please fill in this field"),
});

const ForgetPassword: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = (data: IDataProps) => {
    mutate(data);
    // navigate(`/auth/verify-reset?email=${values.email}`);
  };

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

  const { mutate, isLoading, error } = useMutation(forgotPassword, {
    onError: () => {
      console.log(error);
    },
    onSuccess: (data) => {
      Toast.success(data?.data?.message);
      // navigate(`/auth/verify-reset?email=${values.email}`);
      // console.log("forgot password data", data);
    },
  });
  return (
    <div>
      <div className="w-[564px] flex flex-col items-center rounded-xl shadow-lg p-10">
        <div className="ml-[-18px] sm:ml-[-1px] scale-75 cursor-pointer flex space-x-2 items-center">
          <img src={RecordLogo} alt="" />
        </div>
        <div className="text-center mt-5">
          <p className="font-[700] text-4xl">Forgot Password</p>
          <p className="text-lg font-[400] px-12 text-grey-400">
            Please provide the registered email address. We'll send you a password reset link.
          </p>
        </div>
        <div className="w-full mt-8">
          <form action="" onSubmit={handleSubmit} className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <InputText
                label="Email"
                placeholder="e.g name@example.com"
                error={getError("email")}
                type="text"
                onChange={handleChange}
                isRequired={true}
                name="email" // Corrected the name attribute
                value={values.email}
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

export default ForgetPassword;
