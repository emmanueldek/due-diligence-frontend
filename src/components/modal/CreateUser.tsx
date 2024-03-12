import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import close from "../../assets/icons/close.svg";
import { InputText, PrimaryBtn, TransparentBtn } from "@/components";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/services/organisationService";
import { Toast } from "@/config/toast";
import { useCreateUser } from "@/store/useCreateUser";

interface IInitialData {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

const validationSchema = Yup.object({
  firstName: Yup.string().required("Please fill in this field"),
  lastName: Yup.string().required("Please fill in this field"),
  email: Yup.string().required("Please fill in this field"),
  password: Yup.string(),
});

const CreateUser = () => {
  const { showModal, setShowModal } = useCreateUser();
  const [isChecked, setIsChecked] = React.useState<boolean>(false);

  const { mutate } = useMutation(createUser, {
    onSuccess: (data) => {
      console.log(data);
      Toast.success("User created successfully");
      setShowModal(false);
    },
    onError: (error) => {
      Toast.error(`${error}`);
      console.log(error);
    },
  });
  const initialValues: IInitialData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const onSubmit = async (data: IInitialData) => {
    let profile;
    if (isChecked) {
      profile = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      };
    } else {
      profile = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };
    }
    console.log(profile);

    mutate(profile);
  };

  const { handleChange, values, handleSubmit, errors, touched } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
    validateOnBlur: true,
    enableReinitialize: true,
  });

  const getError = (key: keyof IInitialData) => {
    return touched[key] && errors[key];
  };

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  return (
    <>
      <AnimatePresence>
        {showModal && (
          <form
            className="bg-[#262626a3] fixed top-0 left-0 right-0 bottom-0 z-50 backdrop-blur-[3.1px] shadow-[0_4px_30px_#00000019] flex justify-end"
            onSubmit={handleSubmit}
          >
            <motion.div
              initial={{ opacity: 1, x: 420 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 1, x: 420 }}
              transition={{ duration: 0.3 }}
              className="bg-white w-screen  md:w-[400px] md:min-w-[400px] overflow-x-hidden max-h-screen overflow-y-scroll"
            >
              <div className="bg-accent p-[1rem] flex justify-between items-center h-[60px]">
                <h3 className="font-medium text-[1rem]">Create New Partner</h3>
                <span
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  <img src={close} width={27} height={27} alt="close_button" className="cursor-pointer" />
                </span>
              </div>
              <div
                className="p-[1rem] min-h-[calc(100vh-150px)] max-h-[calc(100vh-150px)] overflow-scroll"
                style={{ scrollbarWidth: "none" }}
              >
                <div className="mt-5">
                  <InputText
                    id="firstName"
                    isRequired={true}
                    label="First Name"
                    placeholder="Enter First Name"
                    value={values.firstName}
                    error={getError("firstName")}
                    type="text"
                    onChange={handleChange}
                    name="firstName"
                  />
                </div>
                <div className="mt-5">
                  <InputText
                    id="lastName"
                    isRequired={true}
                    label="Last Name"
                    placeholder="Enter Last Name"
                    value={values.lastName}
                    error={getError("lastName")}
                    type="text"
                    onChange={handleChange}
                    name="lastName"
                  />
                </div>
                <div className="mt-5">
                  <InputText
                    id="email"
                    isRequired={true}
                    label="Email"
                    placeholder="Enter Email"
                    value={values.email}
                    error={getError("email")}
                    type="email"
                    onChange={handleChange}
                    name="email"
                  />
                </div>
                <div className="flex items-center gap-5">
                  <input
                    id="generatePassword"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 accent-grey-900 rounded bg-transparent"
                    onChange={handleCheckBoxChange}
                    checked={isChecked}
                  />
                  <p>Create Password</p>
                </div>

                {isChecked && (
                  <div className="mt-5">
                    <InputText
                      id="password"
                      isRequired={true}
                      label="Password"
                      placeholder="Enter Password"
                      value={values.password}
                      error={getError("password")}
                      type="password"
                      onChange={handleChange}
                      name="password"
                    />
                  </div>
                )}
              </div>
              <div className="p-[1rem] flex justify-between items-center h-[90px]">
                {/* <TransparentBtn
                  text="Close"
                  onClick={() => {
                    setShowModal(false);
                  }}
                /> */}
                <p
                  className=" py-2 px-3 rounded-md text-[14px] text-center
                  font-medium transition-all duration-500 text-grey-900
                  bg-transparent hover:bg-grey-100 outline outline-2 outline-offset-[-1px]
                  outline-grey-400 hover:outline-none group flex justify-center items-center"
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  Close
                </p>
                <PrimaryBtn text="Create Partner" type="submit" />
              </div>
            </motion.div>
          </form>
        )}
      </AnimatePresence>
    </>
  );
};

export default CreateUser;
