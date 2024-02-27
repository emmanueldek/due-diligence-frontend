// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useMutation } from "@tanstack/react-query";
// import Toast from "@/config/Toast";
// import RecordsLetterLogo from "@/components/svgs/RecordsLetterLogo";
// import { Link } from "react-router-dom";
// import { InputText, Card, LoadingBtn } from "@/components";
// import { useFormik } from "formik";
// import { InputPassword } from "@/components/input";
// import {
//   createPasswordSchema,
//   TCREATEPASSWORD,
// } from "@/utils/validationSchemas";
// import { loginUser } from "@/services/auth";
// import { PATHNAMES } from "@/utils/routes";

// const initialValues: TCREATEPASSWORD = {
//   password: "",
//   confirmPassword: "",
// };

// const CreatePassword: React.FC = () => {
//   const navigate = useNavigate();

//   const { mutate, isLoading } = useMutation(loginUser, {
//     onError: (error: string) => {
//       Toast.error(error);
//     },
//     onSuccess: (data) => {
//       Toast.success("Login successful!");
//       if (!data.workspaceToken) {
//         setTimeout(
//           () => navigate(`/space/${PATHNAMES.SPACE_PATHS.CREATE}`),
//           1000,
//         );
//       } else {
//         setTimeout(() => navigate("/"), 1000);
//       }
//     },
//   });

//   const onSubmit = (data: any) => {
//     console.log(data);
//     // mutate(data);
//   };

//   const { handleChange, values, handleSubmit, errors, touched } = useFormik({
//     initialValues,
//     validationSchema: createPasswordSchema,
//     onSubmit,
//     validateOnBlur: true,
//     enableReinitialize: true,
//   });

//   const getError = (key: keyof TCREATEPASSWORD) => {
//     return touched[key] && errors[key];
//   };

//   return (
//     <Card className="w-full bg-white rounded-md p-6">
//       <div className="flex justify-center items-center mb-4">
//         <RecordsLetterLogo />
//       </div>
//       <div className="text-center">
//         <h1 className="font-[700] text-2xl lg:text-4xl leading-[38px]">
//           Create Password{" "}
//         </h1>
//         <p className="mt-1 font-medium text-grey-300">
//           Create a new password to continue
//         </p>
//       </div>
//       <div className="w-full mt-8">
//         <form action="" onSubmit={handleSubmit} className="">
//           <div className="flex items-center justify-between">
//             <InputPassword
//               label="Password"
//               placeholder="Password"
//               error={getError("password")}
//               onChange={handleChange}
//               isRequired={true}
//               name="password"
//               value={values.password}
//             />
//           </div>
//           {touched.password && errors.password ? (
//             <div>{errors.password}</div>
//           ) : null}
//           <div className="flex items-center justify-between">
//             <InputText
//               label="Confirm Passowrd"
//               placeholder="Confirm Passowrd"
//               error={getError("confirmPassword")}
//               type="password"
//               onChange={handleChange}
//               isRequired={true}
//               name="confirmPassword"
//               value={values.confirmPassword}
//             />
//           </div>
//           {touched.confirmPassword && errors.confirmPassword ? (
//             <div>{errors.confirmPassword}</div>
//           ) : null}

//           <LoadingBtn
//             isLoading={isLoading}
//             text="Create Password"
//             type="submit"
//             className="w-full h-10"
//           />
//         </form>
//       </div>
//     </Card>
//   );
// };

// export default CreatePassword;

import React from "react";
import { InputText, LoadingBtn, PrimaryBtn } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputPassword } from "@/components/input";
import { createPasswordSchema, ICreatePassword } from "@/interface/authTypes";
import RecordLogo from "@/assets/images/partners_logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createPartnerPassword } from "@/services/authServices";
import { Toast } from "@/config/toast";

// interface IDataProps {
//   email: string;
//   password: string;
// }

const initialValues: ICreatePassword = {
  password: "",
  confirmPassword: "",
};

const CreatePassword: React.FC = () => {
  const navigate = useNavigate();

  const { mutate, isLoading, error } = useMutation(createPartnerPassword, {
    onError: () => {
      console.log(error);
      Toast.error(`Something went wrong, please try again.`);
    },
    onSuccess: (data) => {
      Toast.success("Password created successfully!");
      setTimeout(() => {
        window.location.href = "https://diligence-records.vercel.app/auth/login";
      }, 1000);
    },
  });

  const onSubmit = async (data: any) => {
    // console.log(data);
    mutate(data);
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
