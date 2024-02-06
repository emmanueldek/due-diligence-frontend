import React from "react";
import { InputText, LoadingBtn, PrimaryBtn } from "@/components";
import { useFormik } from "formik";
import { IWorkspaceProps } from "@/interface/authTypes";
import * as Yup from "yup";
import { InputPassword } from "@/components/input";
import RecordLogo from "@/assets/images/RecordLogo.png";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { joinWorkspace } from "@/services/authServices";
import { Toast } from "@/config/toast";
import { useNavigate } from "react-router-dom";
import useEmail from "@/store/useEmail";

const initialValues: IWorkspaceProps = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().min(3, "Add at least three letters").required("Please enter your first Name"),
  lastName: Yup.string().min(3, "Add at least three letters").required("Please enter your last Name"),
  email: Yup.string().email("Enter a valid work email address").required("Please fill in this field"),
  password: Yup.string()
    .required("Please enter a password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Case Character",
    ),
  check: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const Workspace: React.FC = () => {
  const { email } = useEmail();
  const navigate = useNavigate();
  const { mutate, isLoading, error } = useMutation(joinWorkspace, {
    onError: () => {
      console.log(error);
    },
    onSuccess: () => {
      Toast.success("Login Successful!");
      navigate("/");
    },
  });

  const onSubmit = (data: IWorkspaceProps) => {
    mutate(data);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      ...initialValues,
      email: email, // Set the default value for email
    },
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof IWorkspaceProps) => {
    return touched[key] && errors[key];
  };

  return (
    <div>
      <div className="w-[564px] flex flex-col items-center rounded-xl shadow-lg p-10">
        <div className="ml-[-18px] sm:ml-[-1px] scale-75 cursor-pointer flex space-x-2 items-center">
          <img src={RecordLogo} alt="" />
        </div>
        <div className="text-center mt-5">
          <p className="font-[700] text-4xl">Join Workspace</p>
          <p className="text-lg font-[400] text-grey-300">Enter your details below to become a member</p>
        </div>
        <div className="w-full mt-8">
          <form action="" onSubmit={handleSubmit} className="space-y-1">
            <div className="flex items-center justify-between space-x-4">
              <InputText
                label="First Name"
                placeholder="First Name"
                error={getError("firstName")}
                type="text"
                onChange={handleChange}
                isRequired={true}
                name="firstName" // Corrected the name attribute
                value={values.firstName}
              />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <InputText
                label="Last Name"
                placeholder="Last Name"
                error={getError("lastName")}
                type="text"
                onChange={handleChange}
                isRequired={true}
                name="lastName" // Corrected the name attribute
                value={values.lastName}
              />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <InputText
                label="Email"
                placeholder="e.g name@example.com"
                error={getError("email")}
                type="text"
                // onChange={handleChange}
                isRequired={true}
                name="email" // Corrected the name attribute
                value={email}
              />
            </div>
            <div className="flex items-center justify-between space-x-4">
              <InputPassword
                label="Create Password"
                placeholder="Password"
                error={getError("password")}
                onChange={handleChange}
                isRequired={true}
                name="password" // Corrected the name attribute
                value={values.password}
              />
            </div>
            <Link to="/auth/forgot-password" className="font-500 flex justify-end py-1">
              Forgot password?
            </Link>
            <div className="w-full pt-2">
              {isLoading ? (
                <LoadingBtn isLoading={true} text="loading..." className="w-full" />
              ) : (
                <PrimaryBtn text="Create Account" type="submit" className="w-full" />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
