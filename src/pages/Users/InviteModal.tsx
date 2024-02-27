import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "@/components/modal";
import { InputText, SelectInput } from "@/components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GrSubtractCircle } from "react-icons/gr";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { inviteMember } from "@/services/workspaceService";
import { Toast } from "@/config/toast";

interface IInviteProps {
  title: string;
  subtitle: string;
  onClose: () => void;
}

const InviteModal: React.FC<IInviteProps> = ({ title, onClose, subtitle }) => {
  const options = [
    { value: "admin", label: "Admin" },
    { value: "member", label: "Member" },
  ];

  const queryClient = useQueryClient();

  const { mutate } = useMutation(inviteMember, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["workspace"] });
      onClose();
      Toast.success(data?.message);
    },
    onError: (error) => {
      Toast.error(`${error}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      newMemberList: [{ id: 1, email: "", role: "member" }],
    },
    validationSchema: Yup.object({
      newMemberList: Yup.array().of(
        Yup.object({
          email: Yup.string().email("Invalid email format").required("Email is required"),
          role: Yup.string().required("Role is required"),
        }),
      ),
    }),
    onSubmit: async (values) => {
      const restructuredData = {
        invitees: values.newMemberList
          .filter((item) => item.email !== "" && item.role !== "")
          .map((item) => ({
            email: item.email,
            role: item.role,
          })),
      };

      await mutate(restructuredData);
    },
  });

  const addEmailInput = () => {
    formik.setFieldValue("newMemberList", [
      ...formik.values.newMemberList,
      { id: formik.values.newMemberList.length + 1, email: "", role: "member" },
    ]);
  };

  const removeEmailInput = (id: number) => {
    formik.setFieldValue(
      "newMemberList",
      formik.values.newMemberList.filter((input) => input.id !== id),
    );
  };

  return (
    <Modal title={title} onClose={onClose} subtitle={subtitle} className="w-[602px]">
      <form onSubmit={formik.handleSubmit}>
        <div className="py-10">
          {formik.values.newMemberList.map((item) => (
            <div key={item.id} className="grid grid-cols-3 space-x-2">
              <div className="col-span-2">
                <InputText
                  label={item.id === 1 ? "Email address" : ""}
                  placeholder="name@example.com"
                  name={`newMemberList.${item.id - 1}.email`}
                  error={
                    (formik.touched.newMemberList?.[item.id - 1] as { email?: string })?.email &&
                    (formik.errors.newMemberList?.[item.id - 1] as { email?: string })?.email
                  }
                  value={item.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex space-x-2 ">
                <SelectInput
                  className=""
                  label={item.id === 1 ? "Role" : ""}
                  name={`newMemberList.${item.id - 1}.role`}
                  value={item.role}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  options={options}
                  defaultValue="admin"
                  id={`role-${item.id}`}
                />
                {formik.values.newMemberList.length > 1 && (
                  <button onClick={() => removeEmailInput(item.id)}>
                    <GrSubtractCircle />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="font-[700] flex items-center space-x-1 cursor-pointer" onClick={addEmailInput}>
            <span>
              <AiOutlinePlusCircle />
            </span>
            <p>Add another email</p>
          </div>
        </div>
        <hr className="border-grey-100" />
        <div className="pt-5 space-x-2 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 active:bg-grey-100 active:border-none border border-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 active:bg-grey-600 active:border-none border text-white bg-grey-900 border-1"
          >
            Send Invite
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default InviteModal;
