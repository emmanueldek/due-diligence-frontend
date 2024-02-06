import React from "react";
import { InputText, LoadingBtn, PrimaryBtn } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputPassword } from "@/components/input";
import { ILoginProps } from "@/interface/authTypes";
import RecordLogo from "@/assets/images/RecordLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginAdmin } from "@/services/authServices";
import { Toast } from "@/config/toast";

// interface IDataProps {
//   email: string;
//   password: string;
// }

const initialValues: ILoginProps = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Enter a valid work email address").required("Please fill in this field"),
  password: Yup.string().required("Please enter a password"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
  //   "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number, and One Special Case Character",
  // ),
  check: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(loginAdmin, {
    onError: () => {
      console.log(error);
      Toast.error(`something went wrong`);
    },
    onSuccess: () => {
      Toast.success("Login Successful!");
      navigate("/");
    },
  });

  const onSubmit = async (data: ILoginProps) => {
    mutate(data);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof ILoginProps) => {
    return touched[key] && errors[key];
  };

  return (
    <div>
      <div className="w-[564px] flex flex-col items-center rounded-xl shadow-lg p-10">
        <div className="ml-[-18px] sm:ml-[-1px] scale-75 cursor-pointer flex space-x-2 items-center">
          <img src={RecordLogo} alt="" />
        </div>
        <div className="text-center mt-5">
          <p className="font-[700] text-4xl">Log in</p>
          <p className="text-lg font-[400] text-grey-300">Enter your details to continue</p>
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
            <Link to="/auth/forgot-password" className="font-500 flex justify-end py-1">
              Forgot password?
            </Link>
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

export default Login;
