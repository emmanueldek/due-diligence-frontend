import React from "react";
import { InputText, LoadingBtn, PrimaryBtn } from "@/components";
import { useFormik } from "formik";
import { InputPassword } from "@/components/input";
import { createPasswordSchema, ICreatePassword } from "@/interface/authTypes";
import RecordLogo from "@/assets/images/partners_logo.svg";
import { useMutation } from "@tanstack/react-query";
import { createPartnerPassword } from "@/services/authServices";
import { Toast } from "@/config/toast";
import { useParams } from "react-router-dom";

const initialValues: ICreatePassword = {
  password: "",
  confirmPassword: "",
};

const CreatePassword: React.FC = () => {
  const params = useParams();
  const partnerId = params.partnerId;

  const { mutate, isLoading, error } = useMutation(createPartnerPassword, {
    onError: () => {
      console.log(error);
      Toast.error(`Something went wrong, please try again.`);
    },
    onSuccess: () => {
      Toast.success("Password created successfully!");
      setTimeout(() => {
        window.location.href = "https://diligence-records.vercel.app/auth/login";
      }, 1000);
    },
  });

  const onSubmit = async (data: any) => {
    // console.log(data);
    mutate({ id: partnerId, data });
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema: createPasswordSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof ICreatePassword) => {
    return touched[key] && errors[key];
  };

  return (
    <div>
      <div className="w-[564px] flex flex-col items-center rounded-xl shadow-lg p-10">
        <div className="ml-[-18px] sm:ml-[-1px] scale-75 cursor-pointer flex space-x-2 items-center">
          <img src={RecordLogo} alt="" />
        </div>
        <div className="text-center mt-5">
          <p className="font-[700] text-4xl">Create Password</p>
          <p className="text-lg font-[400] text-grey-300">Create your password to continue</p>
        </div>
        <div className="w-full mt-8">
          <form action="" onSubmit={handleSubmit} className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <InputPassword
                label="Password"
                placeholder="Password"
                error={getError("password")}
                onChange={handleChange}
                isRequired={true}
                name="password" // Corrected the name attribute
                value={values.password}
              />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <InputText
                label="Confirm Password"
                placeholder="Confirm Password"
                error={getError("confirmPassword")}
                type="password"
                onChange={handleChange}
                isRequired={true}
                name="confirmPassword" // Corrected the name attribute
                value={values.confirmPassword}
              />
            </div>
            {/* <Link to="/auth/forgot-password" className="font-500 flex justify-end py-1">
              Forgot password?
            </Link> */}
            <div className="w-full pt-2">
              {isLoading ? (
                <LoadingBtn isLoading={true} text="loading..." className="w-full" />
              ) : (
                <PrimaryBtn text="Log in" type="submit" className="w-full" />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePassword;
